create TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOTNULL,
    price INT,
    stock INT
);
