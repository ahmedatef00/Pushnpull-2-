import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import axios from 'axios';
const id = Math.ceil(Math.random() * 100000);
var socket = io.connect('http://localhost:4999');


function Ws(props) {
  const [messages, setMessages] = useState([]);
  const [usernames, setUsername] = useState([]);

  const [input, setInput] = useState('');
  const [inputname, setInputname] = useState('');


  useEffect(() => {
    socket.on('sendtoall',
    (newMsg,newUser)=>{
      setMessages(messages => messages.concat(newMsg))
      setUsername(usernames => usernames.concat(newUser));
  
  })
    
  
    //only one when the component is opend   //end of effect   // , 100 * 1000)
  }, []) //only one when the component is opend   //end of effect 

  const myChangeHandler = (e) => {
    const { target: { value } } = e;
    setInput(value);

  }
  const nameChangeHandler = (e) => {
    const { target: { value } } = e;
    setInputname(value);

  }
  const handleSubmit = (e) => {
    
    e.preventDefault(); //prevent refresh
    socket.emit('message',input,inputname);
    setInput('');
    setInputname('');

  }


  return (
    <div>
        {
          usernames.map((username) => <h1 key={username.username}> user : {username} </h1>)

      }
      {
        messages.map(message => <h1 key={message.content}> msg : {message}</h1>)

      }
  
      {
        <form id="form" onSubmit={handleSubmit}>
          <h1>our chat</h1>
          {/* <p>Enter your name:{usernames.content} </p> */}
          <input
            type='text'
            name="content"
            id="content"
            placeholder="message"
            onChange={myChangeHandler}
            value={input}
          />
          <input
            type='text'
            name="contentname"
            id="content"
            placeholder="username"
            onChange={nameChangeHandler}
            value={inputname}
          />
          <button type="submit" >send</button>
        </form>

      }

    </div>


  )
}

export default Ws;