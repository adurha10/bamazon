var mySql = require("mysql");
var inquirer = require("inquirer");
var choicesArr = [];

var loginData = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
}

var connection = mySql.createConnection(loginData);

connection.connect(function(err){
    if(err) throw err; 
    console.log(`Connection id - ${connection.threadId}`);
    displayProducts();
});


function displayProducts(){
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        res.forEach(function(element){
            console.log(
                `${element.product_name}
    QUANTITY = ${element.stock_quantity} PRICE = $${element.price}`);
        });
        getChoices();
    });
}
function getChoices(){
    choicesArr = [];
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        res.forEach(function(element) {
            choicesArr.push(element.product_name);
        });
        productChoice();
    });
}

function productChoice(){
    inquirer.prompt([
        {
            type: "list",
            message: "What product do you want to purchase?",
            name: "selection",
            choices: choicesArr    
        }
    ]).then(function(inqResp){
        var purchase = inqResp.selection;
        var purchaseObj = {};
        connection.query("SELECT * FROM products", function(err, res){
            purchaseObj = res.find(function(element){
                return element.product_name === purchase;
            });
        quantityChoice(purchaseObj, purchase);
        });
    });
}

function quantityChoice(purchaseObj, purchase){
    inquirer.prompt([
            {
                type: "input",
                message: `How many ${purchase} would you like to buy?`,
                name: "totalPurchased",
            }
        ]).then(function(inqResp){
            console.log(purchaseObj);
            console.log(purchase);
            if (purchaseObj.stock_quantity < inqResp.totalPurchased){
                console.log(`Sorry we don't have enough. There are only ${purchaseObj.stock_quantity} in inventory`);
                quantityChoice(purchaseObj, purchase);
            } else {
                console.log("We have enough for you - Making purchase...")
                var newQuantity = purchaseObj.stock_quantity - inqResp.totalPurchased;
                console.log(newQuantity);
                console.log(purchaseObj.id);
                connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE id = ${purchaseObj.id}`);
                displayProducts();
            }
        });
}



