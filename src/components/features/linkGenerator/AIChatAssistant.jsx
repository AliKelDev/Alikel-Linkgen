import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Send, Maximize2, Minimize2, Loader2, Settings, Check } from 'lucide-react';

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

// Professional level settings
const PROFESSIONALISM_LEVELS = {
    HIGH: 'HIGH_PROFESSIONALISM',
    BALANCED: 'BALANCED_APPROACH',
    CREATIVE: 'CREATIVE_MODE'
};

const PROFESSIONALISM_LABELS = {
    [PROFESSIONALISM_LEVELS.HIGH]: 'Professional Mode',
    [PROFESSIONALISM_LEVELS.BALANCED]: 'Balanced Mode',
    [PROFESSIONALISM_LEVELS.CREATIVE]: 'Creative Mode'
};

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
    const [showSettings, setShowSettings] = useState(false);
    const [professionalismLevel, setProfessionalismLevel] = useState(PROFESSIONALISM_LEVELS.BALANCED);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const loadingTimerRef = useRef(null);
    
    // Auto focus the input when chat opens
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Cleanup loading timer if component unmounts
    useEffect(() => {
        return () => {
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
        };
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
                    domain: domain || 'unknown',
                    professionalismLevel: professionalismLevel
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
            console.error("Chat error:", error);
            updateMessages([...updatedMessages, {
                id: Date.now() + 1,
                type: 'ai',
                content: "⚠️ Hmm, I'm having trouble connecting to my servers. Please try again later!",
                isError: true
            }]);
        } finally {
            // Ensure loading state is properly reset
            setIsLoading(false);
            // Clear any existing timer
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleTextareaChange = (e) => {
        setCurrentMessage(e.target.value);
        
        // Auto-resize the textarea based on content
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
    };

    const getProfileModeColor = () => {
        switch(professionalismLevel) {
            case PROFESSIONALISM_LEVELS.HIGH:
                return 'bg-blue-700';
            case PROFESSIONALISM_LEVELS.BALANCED:
                return 'bg-blue-500';
            case PROFESSIONALISM_LEVELS.CREATIVE:
                return 'bg-indigo-500';
            default:
                return 'bg-blue-500';
        }
    };

    // Chat suggestions based on common business inquiries
    const renderSuggestions = () => {
        if (!showSuggestions || messages.length > 1) return null;
        
        const suggestions = [
            "Can you analyze this company's market position?",
            "What outreach strategy would you recommend?",
            "Is this domain name effective for my business?",
            "What technologies might this company be using?",
            "How can I improve my LinkedIn prospecting?"
        ];
        
        return (
            <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentMessage(suggestion);
                                setShowSuggestions(false);
                                // Auto-focus and resize input
                                if (inputRef.current) {
                                    inputRef.current.focus();
                                    inputRef.current.style.height = 'auto';
                                    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 128)}px`;
                                }
                            }}
                            className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        );
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
            <div className={`flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-colors ${
                professionalismLevel === PROFESSIONALISM_LEVELS.HIGH ? 'from-blue-700 to-blue-800' :
                professionalismLevel === PROFESSIONALISM_LEVELS.CREATIVE ? 'from-indigo-500 to-purple-600' :
                'from-blue-600 to-blue-700'
            }`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl">
                        🦊
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Kei</h3>
                        <p className="text-xs text-blue-100">
                            {company ? `Analyzing ${company}` : 'LinkForge AI Assistant'}
                            {professionalismLevel !== PROFESSIONALISM_LEVELS.BALANCED && 
                                ` · ${PROFESSIONALISM_LABELS[professionalismLevel]}`
                            }
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors relative"
                        aria-label="Settings"
                    >
                        <Settings className="w-5 h-5" />
                        {professionalismLevel !== PROFESSIONALISM_LEVELS.BALANCED && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400"></span>
                        )}
                    </button>
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
            
            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-blue-200 bg-white overflow-hidden"
                    >
                        <div className="p-4">
                            <h4 className="font-medium text-blue-900 mb-3">Assistant Mode</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.values(PROFESSIONALISM_LEVELS).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setProfessionalismLevel(level)}
                                        className={`p-3 rounded-lg flex flex-col items-center gap-2 text-sm transition-all ${
                                            professionalismLevel === level
                                                ? `${level === PROFESSIONALISM_LEVELS.HIGH 
                                                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-700' 
                                                    : level === PROFESSIONALISM_LEVELS.CREATIVE
                                                        ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500'
                                                        : 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                                                }`
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                            level === PROFESSIONALISM_LEVELS.HIGH 
                                                ? 'bg-blue-700 text-white' 
                                                : level === PROFESSIONALISM_LEVELS.CREATIVE
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-blue-500 text-white'
                                        }`}>
                                            {professionalismLevel === level ? (
                                                <Check className="w-4 h-4" />
                                            ) : level === PROFESSIONALISM_LEVELS.HIGH ? (
                                                "P"
                                            ) : level === PROFESSIONALISM_LEVELS.BALANCED ? (
                                                "B"
                                            ) : (
                                                "C"
                                            )}
                                        </div>
                                        <span className="text-center">
                                            {PROFESSIONALISM_LABELS[level]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-gray-500">
                                {professionalismLevel === PROFESSIONALISM_LEVELS.HIGH 
                                    ? "Professional mode focuses on business analysis with minimal playfulness." 
                                    : professionalismLevel === PROFESSIONALISM_LEVELS.CREATIVE
                                        ? "Creative mode encourages innovative thinking with maximum playfulness."
                                        : "Balanced mode provides helpful insights with moderate enthusiasm."
                                }
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
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
                                        {message.content.split(/(\*\*.*?\*\*|_.*?_)/g).map((part, index) =>
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
                </AnimatePresence>
                
                {/* Loading Animation - Fixed with separate AnimatePresence */}
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div
                            key="loading-animation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
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
                </AnimatePresence>
                
                {/* Suggestions */}
                {renderSuggestions()}
                
                <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-blue-200 bg-white">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={currentMessage}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        placeholder={`Ask Kei about ${company || 'anything'}...`}
                        className="flex-1 resize-none p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[56px] max-h-32"
                        rows={1}
                    />
                    
                    <motion.button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isLoading}
                        className={`p-3 rounded-xl ${
                            currentMessage.trim() && !isLoading
                                ? `${getProfileModeColor()} hover:bg-opacity-90`
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
            </div>
        </motion.div>
    );
};

export default AIChatAssistant;