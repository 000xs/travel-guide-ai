import React, { useEffect, useState } from 'react';
import { ArrowLeftRight, BadgeDollarSign, Send, Hourglass, Sun, Globe, MapPin, Utensils } from 'lucide-react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import LeftNav from '@/Components/LeftNav';
import ChatMessages from '@/Components/ChatMessage';
import FeatureCard from '@/Components/FeatureCard';

const Compass = () => {
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

    const QuickActionButton = ({ icon: Icon, text, onClick }) => (
        <button
            onClick={onClick}
            className="flex items-center space-x-1 bg-red-500 text-coconut-white px-3 py-2 rounded-md text-sm hover:bg-red-600 transition-colors"
        >
            <Icon size={16} color="#fff" />
            <span>{text}</span>
        </button>
    );

    const CurrencyWidget = () => (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4 max-w-sm">
            <div>
                <label className="block text-sm font-semibold mb-1">Amount</label>
                <input
                    type="number"
                    placeholder="Amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">From</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="LKR">LKR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
                <div className="flex items-center self-end pb-1">
                    <ArrowLeftRight className="text-gray-500" />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">To</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="LKR">LKR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
            </div>
            <button className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                Convert
            </button>
        </div>
    );

    const currency = () => {
        const newMessage = {
            text: "Change currency to LKR",
            sender: 'bot',
            widget: <CurrencyWidget />
        };
        setMessages([...messages, newMessage]);
    };

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

                    <aside className="hidden lg:block w-[40%] border-l bg-white px-6 py-3 overflow-y-auto">
                        <h2 className="text-lg font-body2 font-semibold">How SerandipAI Enhances Your Travel Experience</h2>
                        <div className="prose prose-sm">
                            <FeatureCard

                                icon={Globe}
                                title="Real-time Currency Conversion"
                                description="Convert between currencies instantly with up-to-date exchange rates for smart spending decisions."
                            />
                            <FeatureCard
                                icon={Hourglass}
                                title="Local Time Tracking"
                                description="Stay coordinated with accurate local time information for your destination and scheduling."
                            />
                            <FeatureCard

                                icon={MapPin}
                                title="Location-based Weather"
                                description="Get current weather conditions and forecasts to plan your activities effectively."
                            />
                            <FeatureCard

                                icon={Utensils}
                                title="Local Recommendations"
                                description="Discover authentic local cuisine, attractions, and experiences tailored to your interests."
                            />
                        </div>
                        <div>
                            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                                <div className="flex-shrink-0">
                                    
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Create Plan</h3>
                                    <p className="text-sm text-gray-500">create a trip plan</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Compass;