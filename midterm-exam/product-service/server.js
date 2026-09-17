const express = require("express");

const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());

// Sample product data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 45000,
        category: "Computer"
    },
    {
        id: 2,
        name: "Keyboard",
        price: 1500,
        category: "Accessories"
    },
    {
        id: 3,
        name: "Mouse",
        price: 800,
        category: "Accessories"
    }
];

// ======================================
// GET ALL PRODUCTS
// ======================================
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

// ======================================
// GET PRODUCT BY ID
// ======================================
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
});

// ======================================
// ADD PRODUCT
// ======================================
app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// ======================================
// UPDATE PRODUCT
// ======================================
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;

    res.status(200).json({
        message: "Product updated successfully",
        product: product
    });
});

// ======================================
// DELETE PRODUCT
// ======================================
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(
        product => product.id === id
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});

// ======================================
// START SERVER
// ======================================
app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});