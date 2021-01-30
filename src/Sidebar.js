import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { React, useState, useEffect } from 'react';
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar(props) {
    const [room, setroom] = useState([]);
    const [ { user }, dispatch] = useStateValue();
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot =>
            (
                setroom(snapshot.docs.map((doc) =>
                ({
                        id : doc.id,
                        data : doc.data(),
                 })
                ))
            ));

        return () => {
            unsubscribe();
        }    
    }, [])
    
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src = {user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>  
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input placeholder = "Search Chat" />
                </div>
            </div>
            <div className="sidebar__chat">
                <SidebarChat addNewChat />
                {room.map((room, index) =>(
                <SidebarChat key = {room.id} id = {room.id} name = {room.data.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;