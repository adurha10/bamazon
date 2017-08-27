DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Dog Food", "Pets", 15.99, 187);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Leash", "Pets", 7.99, 397);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Windshield Wiper", "Automotive", 12.50, 876);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Oil Filter", "Automotive", 9.99, 98);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Cat Food", "pets", 15.99, 243);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Scratching Post", "pets", 8.99, 543);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Flea Medicine", "pets", 45.99, 13);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Floor Mats", "Automotive", 85.99, 43);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Fuel Filter", "Automotive", 35.99, 3);
INSERT INTO products(product_name, department, price, stock_quantity)
VALUES ("Dog Brush", "pets", 18.99, 93);
-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)