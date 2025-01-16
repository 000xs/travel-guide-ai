import React, { useEffect, useState } from 'react';
import { ArrowLeftRight, BadgeDollarSign, Send, Hourglass, Sun, Globe, MapPin, Utensils } from 'lucide-react';
import { useSession } from "next-auth/react";
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import LeftNav from '@/Components/LeftNav';
import ChatMessages from '@/Components/ChatMessage';
import { useRouter } from 'next/router';
import TripForm from '@/Components/ui/forms/TripForm';
import { travel_plan_prompt } from '@/pages/api/data/prompt';
import { itineraryTextToJson, parseItineraryToJSON } from '@/utils/parseItinerary';
import { chatAPI, planAPI } from '@/utils/api-client';
import TripItineraryMap from '@/Components/ui/TripItineraryMap';
import ChatTopNav from '@/Components/ui/ChatTopNav';

const Chat = () => {
    const router = useRouter();
    const chatId = router.query.thread;

    const { data: session, status } = useSession();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [threadId, setThreadId] = useState(null);
    const [typingMessage, setTypingMessage] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isLoding, setIsLoding] = useState(false);
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        console.log(session);
        const savedThreadId = localStorage.getItem("a_thread_id");
        if (savedThreadId) {
            setThreadId(savedThreadId);
        }
        if (chatId && chatId !== "new") {
            setThreadId(chatId);
            getPlan(chatId).then((data) => {
                setPlan(data[0] || data);
                setIsLoding(false); // Reset loading state after data is fetched
            });
        } else {
            setIsLoding(false); // Ensure loading state is reset if no chatId
        }
    }, [chatId, session]);

    async function getPlan(id) {
        try {
            setIsLoding(true);
            const res = await planAPI.getPlanById(id);
            console.log("Plan data:", res.data);
            if (res.status === 200) {
                return res.data;
            } else {
                console.error("Failed to fetch plan:", res.data);
                router.push("/app/chat");
            }
        } catch (error) {
            console.error("Error fetching plan:", error);
            return error;
        } finally {
            setIsLoding(false); // Reset loading state
        }
    }

    const [formData, setFormData] = useState({});
    const formOnSubmit = async (data) => {
        setFormData(data);
        setIsThinking(true);

        const newMessage = { text: travel_plan_prompt(data), sender: 'user' };
        setMessages([...messages, newMessage]);
        setInput('');

        try {
            const response = await chatAPI.sendMessage(travel_plan_prompt(data), threadId);
            setIsThinking(false);

            const budgetOptions = [
                "$ - Affordable options",
                "$$ - Reasonable, sensibly priced",
                "$$$ - Upscale experience",
                "$$$$ - Luxury experience",
            ];

            const budgetDescription = budgetOptions[data.budgetValue - 1];
            const travelVibes = data.selectedVibes.join(", ");

            const planData = {
                prompt: response.data.response,
                startDate: new Date(data.dateRange.startDate),
                endDate: new Date(data.dateRange.endDate),
                budget: budgetDescription,
                travelers: { adults: data.travelers.adults, children: data.travelers.children, infants: data.travelers.infants, pets: data.travelers.pets },
                selectedViber: data.selectedVibes,
            };

            const responsePlan = await planAPI.createPlan(planData);
            setIsLoding(true);

            if (responsePlan.data.thread) {
                setIsThinking(false);
                simulateTyping(response.data.response);
                router.replace(`/app/chat/${responsePlan.data.thread.id}`);
                localStorage.setItem("a_thread_id", responsePlan.data.thread.id);
            } else {
                console.error("Failed to create plan:", responsePlan.data);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                text: 'Error: ' + error.message,
                sender: 'error'
            }]);
            setIsThinking(false);
        } finally {
            setIsLoding(false); // Reset loading state
        }
    };

    const Aside = ({ chat }) => (
        <aside className="hidden lg:block w-[40%] border-l bg-white px-6 py-3 overflow-y-auto">
            {chat === 'new' ? (
                <TripForm onFormSubmit={formOnSubmit} />
            ) : (
                <div>
                    {plan && (
                        <TripItineraryMap data={plan} />
                    )}
                </div>
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
        const limitedText = text.slice(0, 20); // Limit to the first 20 characters
        setTypingMessage(''); // Clear any previous typing message

        const interval = setInterval(() => {
            if (index < limitedText.length) {
                setTypingMessage(prev => prev + limitedText[index]); // Simulate typing
                index++;
            } else {
                clearInterval(interval); // Stop typing effect after 20 characters
                setTimeout(() => {
                    setTypingMessage(''); // Clear typing message
                    setMessages(prev => [...prev, { text, sender: 'bot' }]); // Add full message to chat
                }, 1); // Optional delay before showing the full message
            }
        }, 1);
    };

    if (status === "loading"  ) {
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
                {plan && (<ChatTopNav chats={plan.tripName} />)}
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
                        <div className="p-4 bg-white">
                            {isThinking && (
                                <div className='w-full px-1 py-2 font-body2 font-semibold'>
                                    bot is thinking...
                                </div>
                            )}
                            <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-md px-8 py-4">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && !isThinking && sendMessage()}
                                    placeholder="Send a message..."
                                    className="flex-1 bg-transparent focus:outline-none text-lg text-gray-700 placeholder-gray-400 resize-none h-12 overflow-hidden"
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