import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Wand2, Rocket, ClipboardList, Loader2, X, Send, Maximize2, Minimize2, MessageSquare } from 'lucide-react';

const thinkingMessages = [
    "Let me ponder that...",
    "Thinking out loud...",
    "Crunching the numbers...",
    "Diving into the data...",
    "Consulting my algorithms...",
    "Let me check with my team...",
    "Peeking at the knowledge base...",
    "Just a moment...",
    "Whispering to the servers...",
    "Searching my brain..."
];

const chatSuggestions = [
    {
        id: 'domain-validation',
        icon: Wand2,
        title: 'Domain Validation',
        prompt: 'Can you validate the best domain for this company?'
    },
    {
        id: 'outreach-strategy',
        icon: Rocket,
        title: 'Outreach Strategy',
        prompt: 'What would be a good outreach strategy for this company?'
    },
    {
        id: 'tech-stack',
        icon: ClipboardList,
        title: 'Tech Stack Analysis',
        prompt: 'Can you analyze what tech stack this company likely uses?'
    }
];

const AIChatAssistant = ({ 
    isFullscreen, 
    toggleFullscreen, 
    onClose, 
    company, 
    domain, 
    messages, 
    updateMessages,
    showSuggestions,
    setShowSuggestions
}) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    
    // Auto focus the input when chat opens
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const generateThinkingMessage = () => {
        return thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        if (!currentMessage.trim()) return;

        setIsLoading(true);
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: currentMessage,
        };

        const updatedMessages = [...messages, userMessage];
        updateMessages(updatedMessages);
        setCurrentMessage('');

        try {
            const response = await fetch('/.netlify/functions/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   messages: updatedMessages,
                    company: company || 'unknown',
                    domain: domain || 'unknown'
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const aiResponse = `${data.content}\n\n_— Kei @ LinkForge_`;

            updateMessages([...updatedMessages, {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse,
            }]);

        } catch (error) {
            updateMessages([...updatedMessages, {
                id: Date.now() + 1,
                type: 'ai',
                content: "⚠️ Hmm, I'm having trouble connecting to my servers. Please try again later!",
                isError: true
            }]);
        }
        
        setIsLoading(false);
        // Hide suggestions after user interaction
        setShowSuggestions(false);
    };

    const getAIAnalysis = async (type) => {
        setIsLoading(true);
        setShowSuggestions(false);
        
        const updatedMessages = [...messages, {
            id: Date.now(),
            type: 'user',
            content: chatSuggestions.find(s => s.id === type)?.prompt || generateThinkingMessage(),
            analysisType: type
        }];
        
        updateMessages(updatedMessages);
        
        try {
            const response = await fetch('/.netlify/functions/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    analysisType: type,
                    company: company || 'unknown',
                    messages: updatedMessages,
                    domain: domain || 'unknown'
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const aiResponse = `${data.content}\n\n_— Kei @ LinkForge_`;

            updateMessages([...updatedMessages, {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse,
                analysisType: type
            }]);

        } catch (error) {
            updateMessages([...updatedMessages, {
                id: Date.now() + 1,
                type: 'ai',
                content: "⚠️ Hmm, I'm having trouble connecting to my servers. Please try again later!",
                isError: true
            }]);
        }
        
        setIsLoading(false);
    };

    const handleSuggestionClick = (suggestionId) => {
        getAIAnalysis(suggestionId);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <motion.div 
            layout
            className={`flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-2xl overflow-hidden border border-blue-200 ${
                isFullscreen ? 'w-full h-full' : 'w-full h-full'
            }`}
            initial={false}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl">
                        🦊
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Kei</h3>
                        <p className="text-xs text-blue-100">
                            {company ? `Analyzing ${company}` : 'LinkForge AI Assistant'}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                        aria-label={isFullscreen ? "Minimize" : "Maximize"}
                    >
                        {isFullscreen ? (
                            <Minimize2 className="w-5 h-5" />
                        ) : (
                            <Maximize2 className="w-5 h-5" />
                        )}
                    </button>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                        aria-label="Close chat"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                                flex items-start gap-3 max-w-[85%] 
                                ${message.type === 'user' ? 'flex-row-reverse' : ''}
                            `}>
                                {message.type === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-lg mt-1">
                                        🦊
                                    </div>
                                )}
                                
                                {message.type === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center mt-1">
                                        <User className="w-4 h-4 text-gray-600" />
                                    </div>
                                )}
                                
                                <div className={`
                                    py-3 px-4 rounded-2xl break-words ${message.isError ? 'bg-red-100 text-red-700' : 
                                    message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow-sm border border-gray-100'}
                                `}>
                                    <div className="whitespace-pre-wrap">
                                        {message.content.split(/(\*\*.*?\*\*)/g).map((part, index) =>
                                            part.startsWith('**') && part.endsWith('**') ? (
                                                <strong key={index} className={`font-semibold ${message.type === 'user' ? 'text-blue-100' : 'text-blue-700'}`}>
                                                    {part.slice(2, -2)}
                                                </strong>
                                            ) : part.startsWith('_') && part.endsWith('_') ? (
                                                <em key={index} className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                                    {part.slice(1, -1)}
                                                </em>
                                            ) : (
                                                <span key={index}>{part}</span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-lg mt-1">
                                🦊
                            </div>
                            <div className="py-3 px-4 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-[85%]">
                                <div className="flex items-center gap-2">
                                    <div className="flex space-x-1">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.25 }}
                                            className="w-2 h-2 bg-blue-600 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                                            className="w-2 h-2 bg-blue-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.75 }}
                                            className="w-2 h-2 bg-blue-300 rounded-full"
                                        />
                                    </div>
                                    <span className="text-gray-500 text-sm">{generateThinkingMessage()}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </AnimatePresence>
                
                {/* Quick Suggestions */}
                {showSuggestions && messages.length < 3 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                    >
                        <p className="text-gray-500 text-xs mb-2">Ask Kei about {company || 'any company'}:</p>
                        <div className="flex flex-wrap gap-2">
                            {chatSuggestions.map((suggestion) => (
                                <motion.button
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion.id)}
                                    className="px-3 py-2 bg-white rounded-lg text-blue-700 text-sm flex items-center gap-2 shadow-sm hover:shadow-md border border-blue-100 hover:border-blue-300 transition-all"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <suggestion.icon className="w-4 h-4" />
                                    {suggestion.title}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-blue-200 bg-white">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Ask Kei about ${company || 'any company'}...`}
                        className="flex-1 resize-none p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[56px] max-h-32"
                        rows={1}
                    />
                    
                    <motion.button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isLoading}
                        className={`p-3 rounded-xl ${
                            currentMessage.trim() && !isLoading
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-300 cursor-not-allowed'
                        } text-white flex-shrink-0 shadow-sm`}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center mt-3 gap-2">
                    {!isLoading && (
                        <>
                            <button
                                onClick={() => getAIAnalysis('domainValidation')}
                                className="text-xs text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1"
                            >
                                <Wand2 className="w-3 h-3" />
                                Domain Check
                            </button>
                            <button
                                onClick={() => getAIAnalysis('outreachStrategy')}
                                className="text-xs text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1"
                            >
                                <Rocket className="w-3 h-3" />
                                Outreach Plan
                            </button>
                            <button
                                onClick={() => getAIAnalysis('techStackPrediction')}
                                className="text-xs text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1"
                            >
                                <ClipboardList className="w-3 h-3" />
                                Tech Stack
                            </button>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AIChatAssistant;