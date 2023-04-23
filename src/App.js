


import './App.css';
import { useState, useEffect } from 'react';
import { signInWithGoogle, db, handleSignOut } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import {Button, TextField, Fab} from "@mui/material";






function App() {
 


  const [items , setItems] = useState([]);

  const [newItem, setNewItem] = useState();
  const [newAuthor, setNewAuthor] = useState();
  const [newYear, setNewYear] = useState();
  


  const addItem = async () => {
    await addDoc(collection(db, "books"), {item: newItem , author: newAuthor, year: newYear});
    window.location.reload(true);
  }


  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "books", id));
    window.location.reload(true);
  }


 
  useEffect(() => {
    const listCollectionRef = collection(db, "books");

    const getItems =  async () => {
      const data = await getDocs(listCollectionRef);
      setItems(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
     
    }
    getItems();
  },[])





  return (
    <main>
      <button onClick={signInWithGoogle}> Sign in with Google</button>
      <button onClick={handleSignOut}> Sign Out</button>

      <h2>Logged in as: {localStorage.getItem("name")}</h2>
      <h2>Email: {localStorage.getItem("email")}</h2>

    
   

   
  
      
      

    <h1>Abe's Books</h1>
    <TextField helperText = "Book name" className="tf" onChange = {(event) => setNewItem(event.target.value)} /> 
    <TextField  helperText = "Author" className="tf" onChange = {(event) => setNewAuthor(event.target.value)} />
    <TextField helperText = "Year Written" className="tf" onChange = {(event) => setNewYear(event.target.value)} />
    <Button  className = ".MuiButton-outlined" variant="outlined" onClick={addItem}>Add to List</Button>

      <div className='list'>
    <ul>
    {items.map((item) => (
      <li><Fab className="resize" size="small" aria-label="remove" onClick = {() => {deleteItem(item.id)}}>✖</Fab> Book Name: {item.item} &nbsp; &nbsp; &nbsp; &nbsp; Writer:  {item.author} &nbsp; &nbsp; &nbsp; &nbsp;Year Written: {item.year} </li>
      
    ))}
    
    </ul>

    </div>
    
    
    </main>
  );
}









export default App;