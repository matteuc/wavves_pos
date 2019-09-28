DROP DATABASE IF EXISTS wavves_db;
CREATE DATABASE wavves_db;
USE wavves_db;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
    id INT NOT NULL auto_increment PRIMARY KEY,
    product_name VARCHAR(100) NULL,
    price DEC(10, 2) NULL
);

DROP TABLE IF EXISTS sales;
CREATE TABLE sales(
    id INT NOT NULL auto_increment PRIMARY KEY,
    sale_date VARCHAR(100) NULL, 
    sale_total DEC(50, 2)
);

DROP TABLE IF EXISTS products_sold;
CREATE TABLE products_sold(
    id INT NOT NULL auto_increment PRIMARY KEY,
    sale_id INT NOT NULL, 
    product_name VARCHAR(100) NULL,
    quantity INT NOT NULL,
    price DEC(10, 2) NULL
);


