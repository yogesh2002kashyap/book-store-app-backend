const book = require("./book.model");


// post a book
const postABook =  async (req, res) => {
   try{
        const newBook = await book({...req.body});
        await newBook.save();
        res.status(200).send({message: "book posted successfully", book: newBook})
   }
   catch(error){
     console.error("error crating book", error);
      res.status(500).send({message: "Failed to create book"})
   }
}

//get All books
const getAllBooks =  async (req, res) => {
  try {
    const books = await book.find().sort({createdAt: -1});
    res.status(200).send(books);
  } catch (error) {
    console.error("error fetching book", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
}

// get single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBook = await book.findById(id);

    if (!singleBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send(singleBook);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
}

//update book by ID
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book and update it
    const updatedBook = await book.findByIdAndUpdate(
      id,
      { ...req.body },     // new data
      { new: true }        // return the updated document
    );

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send({ message: "Failed to update book" });
  }
}

// DELETE a book by ID
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
}

module.exports = {
    postABook, 
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteABook
}