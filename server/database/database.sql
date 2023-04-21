CREATE DATABASE Fever;
CREATE TABLE fevermed(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    reviews TEXT NOT NULL
);
CREATE TABLE diabetes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dose VARCHAR(255) NOT NULL,
    combination TEXT NOT NULL
);
CREATE TABLE customers(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL
)
CREATE TABLE medicine(
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL , 
    mediname VARCHAR(255) NOT NULL
)