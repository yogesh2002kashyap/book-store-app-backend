const express = require('express');
const book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// post = when submit something from frontend to db
// get = when something get from db
// put/patch = when edit or update something 
// delete = when delete something

// post a book
router.post("/create-book",verifyAdminToken, postABook)

//get All books
router.get("/", getAllBooks);

// get single book
router.get("/:id", getSingleBook);


// UPDATE a book by ID
router.put("/edit/:id" , verifyAdminToken , updateBook);

// DELETE a book by ID
router.delete("/:id", verifyAdminToken , deleteABook);





module.exports = router;