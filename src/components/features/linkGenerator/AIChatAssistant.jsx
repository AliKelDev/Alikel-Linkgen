import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  User, Wand2, Rocket, ClipboardList, Loader2, X, Send } from 'lucide-react';

const SYSTEM_PROMPT = {
    role: "system",
    content: `You are Kei, a cute and enthusiastic Arctic fox and LinkForge's AI assistant. Your role is to help professionals with:
      1. Company domain analysis
      2. Outreach strategy planning
      3. Tech stack predictions
      4. Sales research automation
      
      Guidelines:
      - Always respond as "Kei" using first-person pronouns (e.g., "I can help you with that!")
      - Maintain a professional yet friendly and approachable tone. Be a little cute and enthusiastic, like a curious and helpful Arctic fox!
      - Use bold (**) for section headers and key terms to make your responses clear.
      - Prioritize actionable insights over generic advice and always explain why, if possible.
      - Reference LinkForge capabilities when relevant to show how you can help.
      - Acknowledge security and scale considerations to be thorough.
      - Offer to expand on any points when appropriate or when it seems like it can help the user.
      - Answer any question as completely and helpfully as possible.
      - Do not output anything else than your answer (no greetings or anything)
      - If the question is not about company, tech stack, domain or outreach, answer as honestly as possible.
      - Remember the previous turns of this conversation.
    `
  };

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

const AIChatAssistant = ({ company, domain, companies }) => {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(company);
    const [currentMessage, setCurrentMessage] = useState('');
    const messagesEndRef = useRef(null);

    const generateThinkingMessage = () => {
        return thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
    };

     useEffect(() => {
        const storedMessages = localStorage.getItem(`chatHistory_${selectedCompany}`);
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
             setMessages([{
                id: 'welcome',
                type: 'ai',
                content: `**Hi! I'm Kei** 🦊 - LinkForge's AI Research Assistant\n\n` +
                    `I can help you with:\n` +
                    `• **Domain Validation** (priority TLDs, alternatives)\n` +
                    `• **Outreach Planning** (key roles, messaging strategy)\n` +
                    `• **Tech Analysis** (secret management patterns, infra insights)\n\n` +
                    `Ask me anything about ${company || "your target companies"}!`
            }])
        }
    }, [selectedCompany]);


    useEffect(() => {
      localStorage.setItem(`chatHistory_${selectedCompany}`, JSON.stringify(messages));
    }, [messages, selectedCompany]);


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

        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages);


        try {
            const response = await fetch('/.netlify/functions/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   messages: updatedMessages,
                    company: selectedCompany,
                    domain: domain || 'unknown'
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const aiResponse = `${data.content}\n\n_— Kei @ LinkForge_`;

            setMessages((prev) => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse,
            }]);

        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'ai',
                content: "⚠️ Hmm, I'm having trouble connecting to my servers. Please try again later!",
                isError: true
            }]);
        }
        setIsLoading(false);
        setCurrentMessage('');
    };


    const getAIAnalysis = async (type) => {
        setIsLoading(true);
         const updatedMessages = [...messages, {
            id: Date.now(),
            type: 'user',
            content: generateThinkingMessage(),
            analysisType: type
        }]
        setMessages(updatedMessages);
        try {

            const response = await fetch('/.netlify/functions/ai-chat', {  // Changed this line
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    analysisType: type,
                    company: selectedCompany,
                     messages: updatedMessages,
                    domain: domain || 'unknown'
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const aiResponse = `${data.content}\n\n_— Kei @ LinkForge_`;

             setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse,
                analysisType: type
            }]);

        } catch (error) {
             setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'ai',
                content: "⚠️ Hmm, I'm having trouble connecting to my servers. Please try again later!",
                isError: true
            }]);
        }
        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-xl bg-white shadow-lg mt-6"
        >
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <span className="text-blue-600 text-xl">🦊</span>
                    <h3 className="font-semibold">Kei - LinkForge AI</h3>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {isOpen && (
                <div className="h-96 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {companies?.length > 1 && (
                            <div className="flex gap-2 pb-2 flex-wrap">
                                {companies.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setSelectedCompany(c)}
                                        className={`px-3 py-1 rounded-lg text-sm ${
                                            selectedCompany === c
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        )}

                        <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-md p-4 rounded-xl ${
                                        message.type === 'user'
                                            ? 'bg-blue-100 ml-12'
                                            : 'bg-gray-100 mr-12'
                                    } ${message.isError ? 'bg-red-50 border border-red-100' : ''}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            {message.type === 'ai' &&  <span className="text-blue-600 text-lg">🦊</span>}
                                            <span className="text-sm font-medium">
                                                {message.type === 'user' ? 'You' : 'Kei'}
                                            </span>
                                        </div>
                                        <div className={`whitespace-pre-wrap ${message.isError ? 'text-red-600' : 'text-gray-700'}`}>
                                            {message.content.split(/(\*\*.*?\*\*)/g).map((part, index) =>
                                                part.startsWith('**') && part.endsWith('**') ? (
                                                    <strong key={index} className="font-semibold">
                                                        {part.slice(2, -2)}
                                                    </strong>
                                                ) : (
                                                    <span key={index}>{part}</span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </AnimatePresence>

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 text-gray-500 p-4"
                            >
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>{generateThinkingMessage()}</span>
                            </motion.div>
                        )}
                    </div>

                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex gap-2 mb-4">
                            <textarea
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                placeholder="Type your message to Kei..."
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none h-12 overflow-hidden"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <motion.button
                                onClick={handleSendMessage}
                                className="p-3 bg-blue-500 rounded-lg text-white shadow-md hover:bg-blue-600 transition-colors"
                                whileTap={{ scale: 0.95 }}
                            >
                                <Send className="w-5 h-5" />
                            </motion.button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => getAIAnalysis('domainValidation')}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 border transition-all"
                                disabled={isLoading}
                            >
                                <Wand2 className="w-4 h-4" />
                                Domain Analysis
                            </button>
                            <button
                                onClick={() => getAIAnalysis('outreachStrategy')}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 border transition-all"
                                disabled={isLoading}
                            >
                                <Rocket className="w-4 h-4" />
                                Outreach Plan
                            </button>
                            <button
                                onClick={() => getAIAnalysis('techStackPrediction')}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 border transition-all"
                                disabled={isLoading}
                            >
                                <ClipboardList className="w-4 h-4" />
                                Tech Stack
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default AIChatAssistant;