import {React, useEffect, useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar,IconButton } from '@material-ui/core';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';


export default function Chat() {
    const [seed, setseed] = useState("");
    const [input, setInput] = useState("");
    const { roomID }  = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setmessages] = useState([]);

    const [ { user } , dispatch] = useStateValue();

    useEffect(() => {
        if ( roomID ) {
            db.collection("rooms")
            .doc(roomID)
            .onSnapshot((snapshot) => setroomName
            (snapshot.data()?.name));

            db.collection("rooms")
            .doc(roomID)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
            setmessages(snapshot.docs.map(doc =>
            doc.data()))
            );

            setseed(Math.floor(Math.random()*5000));
        }
    }, [roomID])

    const sendMessage = (e) =>{
        if (input.trim().length) {
        e.preventDefault();
        console.log("Your Message is :--", input);
        db.collection("rooms").doc(roomID).collection
        ("messages").add({
            message : input,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput(" ");
        }
    }

    const handleInput = (e) =>{
        console.log(e.target.value);
        setInput(e.target.value);
    }

    return (
        <div className='chat'>
            <div className="chat__header">
            <Avatar src={`https://avatars.diceBear.com/api/human/${seed}.svg`} />
                <div className="chat__info">
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>  
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>   
                </div>
            </div>

            <div className="chat__body">
                   {messages.map((message) => ( 
                       <p className={`chat__message ${message.name === user.displayName &&"chat__reciever"}`}>
                       <span className='chat__name'>
                           {message.name}
                       </span>
                       {message.message}
                   <span className='chat__time'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                   </p>
                   ))} 
            </div>

            <div className="chat__footer">
                    <IconButton>
                        <EmojiEmotionsIcon/>
                    </IconButton> 
                    <form action="">
                        <input type="text" value = {input} placeholder="Type your Message" onChange = {handleInput}/> 
                        <button type="submit" onClick = {sendMessage}>Submit</button>    
                    </form>   
                    <IconButton>
                        <MicIcon/>
                    </IconButton>         
            </div>
        </div>
    )
}
