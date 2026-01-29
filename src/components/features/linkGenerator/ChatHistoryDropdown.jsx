import React from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, PlusCircle, Calendar, MessageSquare, LogIn } from 'lucide-react';

const ChatHistoryDropdown = ({
    chatHistory,
    onSelectChat,
    onDeleteChat,
    onNewChat,
    currentCompany,
    isFullscreen = false,
    isAuthenticated = false,
    onSignIn
}) => {
    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        
        const date = new Date(timestamp);
        
        // If today, show time
        const isToday = new Date().toDateString() === date.toDateString();
        
        if (isToday) {
            return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        // If within the last week, show day of week
        const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        if (daysAgo < 7) {
            return `${date.toLocaleDateString([], { weekday: 'long' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        // Otherwise show date
        return date.toLocaleDateString([], { 
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // If not authenticated, show sign-in prompt
    if (!isAuthenticated) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`
                    bg-white rounded-xl shadow-xl overflow-hidden
                    ${isFullscreen
                        ? 'absolute top-16 right-4 z-50 w-80'
                        : 'absolute right-0 bottom-full mb-2 w-80'}
                `}
            >
                <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Chat History</h3>
                </div>

                <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Sign in to save conversations</h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Your chat history will be saved and synced across all your devices.
                    </p>
                    <button
                        onClick={onSignIn}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-4 h-4" />
                        Sign in with Google
                    </button>
                </div>

                <div className="p-3 bg-gray-50 text-xs text-center text-gray-500">
                    You can still chat without signing in
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
                bg-white rounded-xl shadow-xl overflow-y-auto
                ${isFullscreen
                    ? 'absolute top-16 right-4 z-50 w-80 max-h-[calc(100vh-8rem)]'
                    : 'absolute right-0 bottom-full mb-2 w-80 max-h-96'}
            `}
        >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Chat History</h3>
                </div>
                <button
                    onClick={() => onNewChat()}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 flex items-center gap-1 text-sm font-medium"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Chat</span>
                </button>
            </div>

            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {chatHistory.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <MessageSquare className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <p>No previous conversations found</p>
                    </div>
                ) : (
                    chatHistory.map((item) => (
                        <div
                            key={`${item.company}-${item.lastChat}`}
                            className={`p-4 hover:bg-gray-50 cursor-pointer flex items-start justify-between gap-2 transition-colors
                                ${currentCompany === item.company ? 'bg-blue-50' : ''}
                            `}
                        >
                            <div
                                className="flex-1 min-w-0"
                                onClick={() => onSelectChat(item.company, item.domain)}
                            >
                                <p className="font-medium text-blue-900 truncate">{item.company}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span className="truncate">{formatDate(item.lastChat)}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => onDeleteChat(item.company)}
                                className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"
                                title="Delete conversation"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="p-3 bg-gray-50 text-xs text-center text-gray-500">
                Chat history synced to your account
            </div>
        </motion.div>
    );
};

export default ChatHistoryDropdown;