import { useState, useEffect } from "react";
import styles from "./myBook.module.css";

function MyBook() {

    const [myBooks, setMyBooks] = useState([]);

    const baseURL = "https://book-find.onrender.com";

    FetchBook();

    function FetchBook(){
        useEffect(() => {
            fetch(`${baseURL}/books`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMyBooks(data);
            })
            .catch((err) => {
                console.log(err);
            })
        },[])
    }

    function deleteBook(id){
        fetch(`${baseURL}/books/${id}`,{
            method : "DELETE"
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
        <h2 id={styles.title}>My Books</h2>
        <div className={styles.main}>
            {myBooks.map((element) => {
                return <div>
                    <h3>{element.title}</h3>
                    <p>{element.description}</p>
                    <p>Author : {element.author}</p>
                    <p>Genre : {element.genre}</p>
                    <p>{element.price}</p>
                    <button onClick={() => {
                        deleteBook(element._id);
                    }}>DELETE</button>
                </div>
            })}
        </div>
    </>
}

export default MyBook;