import React from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, PlusCircle, Calendar, MessageSquare } from 'lucide-react';

const ChatHistoryDropdown = ({ 
    chatHistory, 
    onSelectChat, 
    onDeleteChat, 
    onNewChat,
    currentCompany
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

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 bottom-full mb-2 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-xl"
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
                Chat history is stored locally on your device
            </div>
        </motion.div>
    );
};

export default ChatHistoryDropdown;