import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import {useEffect, useState} from 'react'

const App=() =>{
  const socket= io.connect('http://3.135.18.98:8000/')

  const [message,setMessage]=useState('')
  const [messagereceived,setMessagereceived]=useState('')

  const sendMessage=()=>{
    socket.emit("send_message",message)
  }

  useEffect(()=>{
      socket.on("receive_message",(data)=>{
        setMessagereceived(data)
      })
  },[socket])

  return (
    <div>
      <center>
      <h1 style={{marginBottom:'50px'}}>Using Socket IO</h1>
      <input style={{padding:'5px',marginRight:'50px'}}  placeholder={'Enter Message'} onChange={(e)=>setMessage(e.target.value)} type={'text'} />
      <button onClick={sendMessage}>Send Message</button>
      <h2 style={{marginTop:'50px',color:'green'}}>Message Received on server:<span style={{color:'red'}}>{messagereceived}</span></h2>
      </center>
    </div>
  );
}

export default App;
