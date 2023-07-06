import { useState, useEffect } from "react";
import styles from "./addBook.module.css";

function AddBook () {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const baseURL = "https://book-find.onrender.com";

    function formSubmit(e) {
        e.preventDefault();

        let obj = {
            title : title,
            author : author,
            genre : genre,
            description : description,
            price : price
        }

        fetch(`${baseURL}/books`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            alert(data.message);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return <>
        <h2 id={styles.title}>Add Book</h2>
        <div className={styles.main}>
            <form onSubmit={(e) => {
                formSubmit(e);
            }}>
                <input  type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="">Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Science">Science</option>
                    <option value="Comic">Comic</option>
                </select>
                <input type="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="submit" value="Add Book" />
            </form>
        </div>
    </>
}

export default AddBook;