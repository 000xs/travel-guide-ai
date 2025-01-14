import React, { useEffect, useState } from 'react';
import { ArrowLeftRight, BadgeDollarSign, Send, Hourglass, Sun, Globe, MapPin, Utensils, Map } from 'lucide-react';
import { useSession } from "next-auth/react";

import Head from 'next/head';
import Link from 'next/link';
import LeftNav from '@/Components/LeftNav';

import { useRouter } from 'next/navigation';
import axios from 'axios';

const Chat = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [places, setPlaces] = useState()


    useEffect(() => {
        const savedThreadId = localStorage.getItem("a_thread_id");
        if (savedThreadId) {
            setThreadId(savedThreadId);
        }
        explore()
    }, []);

    const explore = async () => {
        try {
            const response = await axios.get("/api/place-demo")
            setPlaces(response.data)

        } catch (error) {
            console.log(error)
        }
    }






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
                        <div className="text-xl font-semibold text-gray-800 flex flex-row space-x-2 items-center justify-center "> <Map /><p>Explore Places</p></div>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {places.map((place) => (
                                <div key={place.id} className="border rounded-lg shadow-lg p-4">
                                    <img
                                        src={place.images[0]}
                                        alt={place.name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <h2 className="text-xl font-semibold mt-4">{place.name}</h2>
                                    <p className="text-gray-700 mt-2">{place.overview}</p>
                                    <div className="mt-4">
                                        <p><strong>Location:</strong> {place.location.address.city}, {place.location.address.road}</p>
                                        <p><strong>Rating:</strong> {place.reviewRating} ⭐</p>
                                        <p><strong>Contact:</strong> {place.contact.phone}</p>
                                    </div>
                                    <a
                                        href={place.googleBusiness}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 block text-blue-500 hover:underline"
                                    >
                                        View on Google
                                    </a>
                                </div>
                            ))}
                        </div>

                    </div>

                    <aside className="hidden lg:block w-[40%] border-l bg-white px-6 py-3 overflow-y-auto">
                        {/* <h2 className="text-lg font-body2 font-semibold">How SerandipAI Enhances Your Travel Experience</h2>
                        <div className="prose prose-sm">
                             
                        </div> */}
                        {/* //place data  */}
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Chat;