"use client"
import axios from 'axios';
import { Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LeftNav from '../Components/LeftNav';

interface Message {
  text: string;
  sender: 'user' | 'bot' | 'error';
}

function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [threadId, setThreadId] = useState<string | null>(null);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const baseUrl: string = "/api";
//   const baseUrl: string = "http://127.0.0.1:5000/api";
  // const baseUrl = "https://treavel-guide-ai.vercel.app/api";

  useEffect(() => {
    if (localStorage.getItem("a_thread_id")) {
      setThreadId(localStorage.getItem("a_thread_id"));
    } else {
      startChatThread();
    }
  }, []);

  const startChatThread = async () => {
    try {
      const response = await axios.post(`${baseUrl}/start_chat`);
      setThreadId(response.data.thread_id);
      localStorage.setItem("a_thread_id", response.data.thread_id);
    } catch (error) {
      console.error('Error starting chat thread:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsThinking(true);

    const newMessage: Message = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await axios.post(`${baseUrl}/send_message`, {
        thread_id: threadId,
        message: input
      });
       
      setIsThinking(false);
      simulateTyping(response.data.response);

    } catch (error) {
      const errorMessage: Message = { text: 'Error: ' + error, sender: 'error' };
      setMessages([...messages, newMessage, errorMessage]);
      setIsThinking(false);
    }
  };

  const simulateTyping = (text: string) => {
    let index = 0;
    setTypingMessage('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { text, sender: 'bot' }]);
        setTypingMessage('');
      }
    }, 1 / 3);
  };
 
  return (
    <div className="w-full h-[100vh] flex flex-row font-body2 text-text-black">
      <LeftNav />
      <div className='right w-[80%] h-[100vh] bg-coconut-white flex flex-col justify-between'>

        {/* Navbar */}
        <div className="nav w-full shadow-sm px-12 py-4 flex justify-between items-center bg-white">
          <h1 className="text-xl font-header2 text-gray-800">ChatBot</h1>
          <div className="text-gray-500">Online</div>
        </div>

        {/* Chat Content Section */}
        <div className="content px-12 py-4 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start space-x-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender !== 'user' && (
                  <div className="w-10 h-10 bg-spice-red rounded-full flex items-center justify-center text-white">
                    B
                  </div>
                )}
                {msg.sender === 'user' && isThinking && (
                  <div className="w-10 h-10 bg-spice-red rounded-full flex items-center justify-center text-white">
                    U
                  </div>

                )}
                <div className={`rounded-lg p-4 max-w-[70%] ${msg.sender === 'user' ? 'bg-spice-red text-white' : 'bg-white border border-spice-red text-gray-800'}`}>
                  <ReactMarkdown children={msg.text} remarkPlugins={[remarkGfm]} />
                </div>
              </div>
            ))}

            {/* Typing Effect Message */}
            {typingMessage && (
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-spice-red rounded-full flex items-center justify-center text-white">
                  B
                </div>
                <div className="rounded-lg p-4 max-w-[70%] bg-white border border-spice-red text-gray-800">
                  <ReactMarkdown children={typingMessage} remarkPlugins={[remarkGfm]} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input Section */}
        <div className="input px-12 py-4 bottom-0">
          <div className="w-full px-4">
            <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-md px-8 py-4">
              <textarea id="chatInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Send a message..."
                className="flex-1 bg-transparent focus:outline-none text-lg text-gray-700 placeholder-gray-400 resize-none h-12 overflow-hidden"></textarea>
              <button id="sendButton" onClick={sendMessage} className="ml-4 bg-spice-red text-white p-3 rounded-[50%] text-sm font-medium">
                <Send color="#ffffff" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Playground;
