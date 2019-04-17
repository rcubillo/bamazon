CREATE DATABASE bamazon;

USE BAMAZON;

CREATE TABLE products (
 item_id INTEGER(12) AUTO_INCREMENT NOT NULL,
 product_name varchar(30),
 department_name varchar(30),
 price integer (10),
 stock_quantity integer (10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Notebook", "Office products", 3, 5);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Pencil", "Office products", 1, 12);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Eraser", "Office products", 2, 10);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Tires", "Automotive Parts", 150, 20);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Air Fresheners", "Automotive Parts", 5,18);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Keychains", "Automotive Parts", 2,23);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Seat Covers", "Automotive Parts", 40,25);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Shirts", "Clothing", 10,8);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Socks", "Clothing", 5,18);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("Pants", "Clothing", 22,14);

SELECT * FROM products



