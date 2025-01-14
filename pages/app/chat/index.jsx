import React, { useEffect, useState } from 'react';
import { ArrowLeftRight, BadgeDollarSign, Send, Hourglass, Sun, Globe, MapPin, Utensils } from 'lucide-react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import LeftNav from '@/Components/LeftNav';
import ChatMessages from '@/Components/ChatMessage';
import FeatureCard from '@/Components/ui/cards/FeatureCard';
import { useRouter } from 'next/navigation';
import { chatAPI, planAPI } from '@/utils/api-client';

const Chat = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [threadId, setThreadId] = useState(null);
    const [typingMessage, setTypingMessage] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const baseUrl = "/api";
    const [isLoding, setIsLoding] = useState(false);
    const [plans, setPlan] = useState([]);

    useEffect(() => {
        const savedThreadId = localStorage.getItem("a_thread_id");
        if (savedThreadId) {
            setThreadId(savedThreadId);
        }
        getPlans().then((data) => {
            setPlan(data);
            setIsLoding(false);
        })
    }, []);

    async function getPlans() {
        try {
            setIsLoding(true);
            const res = await planAPI.getPlan();

            console.log("Plan data:", res.data);

            if (res.status === 200) {
                return res.data; // Return the fetched data (already an array)
            } else {
                console.error("Failed to fetch plan:", res.data);
                router.push("/app/chat"); // Redirect on failure
                return []; // Return an empty array to avoid setting invalid data
            }
        } catch (error) {
            console.error("Error fetching plan:", error);

            return []; // Return an empty array to avoid setting invalid data
        } finally {
            setIsLoding(false); // Ensure loading state is reset
        }
    }

    const sendMessage = async () => {
        if (!input.trim()) return;
        setIsThinking(true);

        const newMessage = { text: input, sender: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');

        try {

            const response = await chatAPI.sendMessage(input, threadId);
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
        }, 1);
    };

    if (status === "loading" || isLoding) {
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
                        <div className="relative inline-block text-left">
                            <details className="group">
                                <summary className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                                    SerandipAI Travel Assistant
                                    <svg
                                        className="w-5 h-5 ml-2 -mr-1 text-gray-400 group-open:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </summary>
                                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {plans.map((plan) => (
                                            <Link key={plan.id}
                                            className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            href={`/app/chat/${plan.thread.id}`}> {plan.tripName}</Link>

                                            // <div key={plan.id} className="flex items-center space-x-2 p-2">
                                            //     <ArrowLeftRight className="w-5 h-5" />
                                            //     <p className="text-sm font-semibold">Plan: {plan.tripName}</p>
                                            //     <p className="text-sm text-gray-500">Thread: {plan.thread.name}</p>
                                            // </div>
                                        ))}
                                    </div>
                                </div>
                            </details>
                        </div>

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
                                <div
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url('/card.webp')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    onClick={() => router.push('/app/chat/new')}

                                    className="  bg-cover hover:shadow-sm hover:scale-105 transition-transform duration-300 hover:shadow-gray-500 hover:cursor-pointer bg-center rounded-lg w-full px-8 py-8 font-body"
                                >
                                    <h3 className="font-semibold text-white text-2xl">Create Plan</h3>
                                    <p className="text-sm font-body2 text-gray-200">create a trip plan in Sri Lanka!</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Chat;