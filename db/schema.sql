DROP DATABASE IF EXISTS wavves_db;
CREATE DATABASE wavves_db;
USE wavves_db;

CREATE TABLE products(
    id INT NOT NULL auto_increment PRIMARY KEY,
    product_name VARCHAR(100) NULL,
    price DEC(10, 2) NULL
);

CREATE TABLE sales(
    id INT NOT NULL auto_increment PRIMARY KEY,
    sale_date DATE NULL, 
    sale_total DEC(100, 2)
);

CREATE TABLE products_sold(
    id INT NOT NULL auto_increment PRIMARY KEY,
    sale_id INT NOT NULL, 
    product_name VARCHAR(100) NULL
);


