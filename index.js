const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://book-store-mern-app-seven.vercel.app"
    ],
    credentials: true
}));

// Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("I am Shubham yadav ,And I admit that I love to be fucked by SUDHIR");
});

// Connect DB and start server
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB connected successfully!");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.log("Error connecting to MongoDB:", err);
    });
