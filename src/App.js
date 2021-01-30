import './App.css';
import { React, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const sidebar = () => (<Sidebar/>)
const chat = () =>  (<Chat/>)


function App() {
  const [ { user } , dispatch] = useStateValue();


  return (
    // BEM naming convention
    <div className="app">
    {!user ?(
          <Login />
       ):(
      <div className = "app__body">
      <Router>  
        <>
        <Sidebar />       
        <Route path="/rooms/:roomID" component={chat}/>
        </>
      </Router>  
      </div>
      )}
    </div>
  );
}

export default App;
