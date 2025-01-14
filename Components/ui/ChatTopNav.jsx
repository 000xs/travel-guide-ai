import React from 'react'

function ChatTopNav({chats}) {
    return (
        <header className="bg-white px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold text-gray-800">{chats}</h1>

            </div>
        </header>
    )
}

export default ChatTopNav