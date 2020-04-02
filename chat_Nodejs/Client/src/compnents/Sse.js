import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Sse = () => {
  const [messages, setMessages] = useState([]);
  const [inputname, setName] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/subscribe');
    eventSource.onmessage = (e) => {
      console.log(e.data);
      const msg = JSON.parse(e.data);
      setMessages(messages => messages.concat(msg));
    }
  }, []);
  const myChangeHandler = (e) => {
    const { target: { value } } = e;
    setInput(value);
  }
  const nameChangeHandler = (e) => {
    const { target: { value } } = e;
    setName(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/messageSubscribers', { content: inputname + "  : " + input }).then(() => {
      setInput('');
      setName('');
    });
  }

  return (
    <div>
      {
        messages.map(mess => <h1 key={mess.content}>{mess.content} </h1>)
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


export default Sse;
