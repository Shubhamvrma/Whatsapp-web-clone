import {React, useEffect, useState} from 'react'
import { Avatar } from '@material-ui/core';
import './SidebarChat.css'
import db from './firebase';
import { Link } from 'react-router-dom';

export default function SidebarChat({ id, name, addNewChat}) {
    const [seed, setseed] = useState("")
    const [messages, setMessages] = useState("")

    useEffect(() => {
        if (id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc)=>
                doc.data()))
            );
        }
    }, [id])

    useEffect(() => {
        return () => {

        }
    }, [])

    useEffect(() => {
        setseed(Math.floor(Math.random()*5000));
    }, [])

    const createChat = () =>{
        var roomName = prompt("Enter Your Room Name.");
        if(roomName){
            //Database Stuff......
            db.collection("rooms").add({
                name : roomName,
            });
        console.log(roomName);
        }
    }

    const handleAddNew = () => {

    }

    return !addNewChat ? (
        <Link to = {`/rooms/${id}`}>
        <div className = "sidebarChat">
            <Avatar src={`https://avatars.diceBear.com/api/human/${seed}.svg`} />
            <div className = "Sidebarchat__info">
                <h4>{name}</h4>
    <           p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div className = "sidebarChat" onClick = {createChat}>
        <div className = "Sidebarchat__info" onClick = {handleAddNew}>
            <h4>Add New Chat</h4>
        </div>
         </div>   
    );
}
