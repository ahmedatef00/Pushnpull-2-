import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sse () {
    
    const [messages, setMessages] = useState([]);
    const [usernames, setUsername] = useState([]);
  
    const [input, setInput] = useState('');
    const [inputname, setInputname] = useState('');
   
    useEffect(() => {
      
           const eventSource =new EventSource ('http://localhost:5005/subscribe');
           eventSource.onmessage=
             (e)=>{
             console.log(e.data);
             const messages = JSON.parse(e.data);
            //  const user = JSON.parse(e.data);

            setMessages(messages => messages.concat(messages));
            // setMessages(usernames => usernames.concat(user));


 console.log(messages.content);
 
          };
           
           
            
            
    }, []);
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
    
        // axios.post('http://localhost:5005/messages',{content:input,username:inputname})//in your body post the content from value
    
        axios.post('http://localhost:5005/messageSubscribers', { content: input, username: inputname });
        // .then(()=>{setInput('')
      // setInputname('');
      };
        //in your body post the content from value
    
    


    return (
        <div>
        
        
            
            <form id="form" onSubmit={handleSubmit}>
              <h1>our chat</h1>
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
      
    
     {
      messages.map(message => {
        return (
            <div>
              <h1>Messages</h1>
              <h6>{message.Name}</h6>
              <h6>{message.messageValue}</h6>
            </div>
        )
      })
    }
 </div>
)
}
export default Sse;