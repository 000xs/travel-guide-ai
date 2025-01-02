import React, { useEffect, useState } from 'react';
import { ArrowLeftRight, BadgeDollarSign, Send, Hourglass, Sun, Globe, MapPin, Utensils } from 'lucide-react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import LeftNav from '@/Components/LeftNav';
import ChatMessages from '@/Components/ChatMessage';
import FeatureCard from '@/Components/FeatureCard';
import { useRouter } from 'next/router';
import DateRangePicker from '@/Components/DateRangePicker';

import TravelerSelector from '@/Components/TravelerSelector';

import BudgetSlider from '@/Components/BudgetSlider';
import VibeSelector from '@/Components/VibeSelector';



const Chat = () => {
    const router = useRouter();
    const chatId = router.query.thread;

    const { data: session, status } = useSession();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [threadId, setThreadId] = useState(null);
    const [typingMessage, setTypingMessage] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const baseUrl = "/api";

    useEffect(() => {
        const savedThreadId = localStorage.getItem("a_thread_id");
        if (savedThreadId) {
            setThreadId(savedThreadId);
        }
    }, []);

    const [dateRange, setDateRange] = useState('Select Date Range');

    const handleDateRangeChange = (range) => {
        setDateRange(range); // Update the date range in the parent state
        // alert(range);
    };

    const handleTravelerInfoSubmit = (info) => {
        console.log('Traveler Info Submitted:', info);
    };

    const [budgetValue, setBudgetValue] = useState(1);
    const handleBudgetChange = (value) => {
        setBudgetValue(value);
        console.log("Selected Budget Level:", value);
    };

    const [selectedVibes, setSelectedVibes] = useState([]);
    const handleVibeSelection = (vibes) => {
        setSelectedVibes(vibes);

        console.log("Selected vibes: ", vibes);
    };

    const Aside = ({ chat }) => (
        <aside className="hidden lg:block w-[40%] border-l bg-white px-6 py-3 overflow-y-auto">
            {chat === 'new' ? (
                <div>
                    <h2 className="text-xl py-4 font-body2 font-semibold">Create a Trip</h2>
                    <div >
                        <div className="flex flex-col space-y-2">
                            <div className='flex flex-col space-y-1'>
                                <label className=' text-md font-body font-normal'>Destination</label>
                                <input type="text" className='p-3 border border-gray-300 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='Enter Destination' />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label className=' text-md font-body font-normal'>Travel Dates</label>
                                <DateRangePicker onDateRangeChange={handleDateRangeChange} />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label className=' text-md font-body font-normal'>Number of Travelers</label>
                                {/* <DateRangePicker onDateRangeChange={handleDateRangeChange} /> */}
                                <TravelerSelector onTravelerInfoSubmit={handleTravelerInfoSubmit} />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label className=' text-md font-body font-normal'>Estimated Cost</label>
                                <BudgetSlider onBudgetChange={handleBudgetChange} />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label className=' text-md font-body font-normal'>Your Vibe</label>
                                <VibeSelector onVibeSelection={handleVibeSelection} />
                            </div>
                            <button
                                className='w-full text-white bg-spice-red p-3 font-body font-normal border border-gray-300 rounded-md  cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500s'
                            >Create a Plan</button>
                        </div>
                    </div>

                </div>
            ) : (
                <div>create</div>
            )}


        </aside>
    );


    const sendMessage = async () => {
        if (!input.trim()) return;
        setIsThinking(true);

        const newMessage = { text: input, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');

        try {
            const response = await axios.post(
                `${baseUrl}/chat`,
                { thread_id: threadId, message: input },
                { headers: { Authorization: `Bearer ${session}` } }
            );
            setIsThinking(false);
            simulateTyping(response.data.response);
        } catch (error) {
            setMessages(prev => [...prev, {
                text: 'Error: ' + error.message,
                sender: 'error'
            }]);
            setIsThinking(false);
        }
    };

    const simulateTyping = (text) => {
        let index = 0;
        setTypingMessage('');

        const interval = setInterval(() => {
            if (index < text.length) {
                setTypingMessage(prev => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
                setMessages(prev => [...prev, { text, sender: 'bot' }]);
                setTypingMessage('');
            }
        }, 30);
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Head><title>Home</title></Head>
                <Link
                    href="/auth/signin"
                    className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                    Sign in
                </Link>
            </div>
        );
    }

    return (
        <div className="h-screen flex bg-gray-50">
            <LeftNav />



            <div className="flex-1 flex flex-col">
                <header className="bg-white px-6 py-4 shadow-sm">
                    <div className="flex justify-between items-center max-w-7xl mx-auto">
                        <h1 className="text-xl font-semibold text-gray-800">SerandipAI Travel Assistant</h1>
                        {/* {session.user?.image && (
                            <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-gray-200"
                            />
                        )} */}
                    </div>
                </header>

                <main className="flex-1 flex overflow-hidden bg-white">
                    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <ChatMessages
                                messages={messages}
                                isThinking={isThinking}
                                typingMessage={typingMessage}
                                userImage={session.user?.image}
                            />
                        </div>

                        <div className="p-4   bg-white">
                            <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-md px-8 py-4">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && !isThinking && sendMessage()}
                                    placeholder="Send a message..."
                                    className="flex-1 bg-transparent focus:outline-none text-lg text-gray-700 placeholder-gray-400 resize-none h-12 overflow-hidden  "
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isThinking}
                                    className={`p-3 rounded-full ${isThinking ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
                                        } text-white transition-colors`}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <Aside chat={chatId} />
                </main>
            </div>
        </div>
    );
};

export default Chat;