import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessages = ({ messages, isThinking, typingMessage, userImage }) => {

    return (
        <div className="space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-start space-x-4 msg-item ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    {/* Avatar */}
                    {msg.sender !== 'user' && (
                        <div className="w-10 h-10 bg-spice-red rounded-full flex items-center justify-center text-white">
                            B
                        </div>
                    )}
                    {msg.sender === 'user' && isThinking && userImage && (
                        <img src={userImage} className="w-10 h-10 bg-spice-red rounded-full flex items-center justify-center text-white">

                        </img>
                    )}
                    {msg.sender === 'user' && isThinking && !userImage && (
                        <div className="w-10 h-10 bg-spice-red rounded-full flex items-center justify-center text-white">
                            U
                        </div>
                    )}

                    {/* Message Content */}
                    <div className={`rounded-lg p-4 max-w-[70%] ${msg.sender === 'user' ? 'bg-spice-red text-white' : 'bg-white border border-spice-red text-gray-800'}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} >
                            {msg.text}
                        </ReactMarkdown>


                        {msg.widget && (
                            <div className="mt-4">

                                <div className="custom-widget bg-gray-100 p-4 rounded-lg">


                                    {msg.widget}
                                </div>
                            </div>
                        )}
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
                        <ReactMarkdown remarkPlugins={[remarkGfm]}  >
                            {typingMessage}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatMessages;
