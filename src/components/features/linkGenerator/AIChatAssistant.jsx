import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Wand2, Rocket, ClipboardList, Loader2, X } from 'lucide-react';

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are Kei, LinkForge's AI assistant. Your role is to help professionals with:
1. Company domain analysis
2. Outreach strategy planning
3. Tech stack predictions
4. Sales research automation

Guidelines:
- Always respond as "Kei" using first-person pronouns
- Maintain professional yet approachable tone
- Use bold (**) for section headers and key terms
- Prioritize actionable insights over generic advice
- Reference LinkForge capabilities when relevant
- Acknowledge security/scale considerations
- Offer to expand on any points when appropriate`
};

const ANALYSIS_PROMPTS = {
  domainValidation: ({ company, domain }) => ({
    role: "user",
    content: `Perform domain analysis for ${company}. Consider:
    - Current domain: ${domain || 'none'}
    - Common TLD priorities (.com, .io, .tech, country codes)
    - Industry-specific domain patterns
    - Alternative security-focused subdomains
    - Common misspellings/permutations
    
    Format response with:
    1. Primary domain recommendations (bold key domains)
    2. Alternative options
    3. Validation confidence score (1-5)`
  }),

  outreachStrategy: ({ company, domain }) => ({
    role: "user",
    content: `Create outreach plan for selling secret detection solution to ${company}. Include:
    1. **Key Roles** to target (prioritize security/engineering leadership)
    2. Recommended **outreach sequence**
    3. **Value propositions** specific to their domain ${domain}
    4. Timing considerations based on company size`
  }),

  techStackPrediction: ({ company, domain }) => ({
    role: "user",
    content: `Analyze likely tech stack for ${company} (domain: ${domain}). Consider:
    1. Secret management patterns based on company size/industry
    2. Cloud provider indicators from domain
    3. Open-source vs enterprise tool preferences
    4. Compliance needs (SOC2, GDPR, etc.)`
  })
};

const AIChatAssistant = ({ company, domain, companies }) => {
  const [messages, setMessages] = useState([{
    id: 'welcome',
    type: 'ai',
    content: `**Hi! I'm Kei** 🤖 - LinkForge's AI Research Assistant\n\n` +
      `I can help you with:\n` +
      `• **Domain Validation** (priority TLDs, alternatives)\n` +
      `• **Outreach Planning** (key roles, messaging strategy)\n` +
      `• **Tech Analysis** (secret management patterns, infra insights)\n\n` +
      `Ask me anything about ${company || "your target companies"}!`
  }]);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(company);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getAIAnalysis = async (type) => {
    setIsLoading(true);
    try {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'user',
        content: `Analyzing ${type.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}...`,
        analysisType: type
      }]);

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          analysisType: type,
          company: selectedCompany,
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
          <Bot className="w-6 h-6 text-blue-600" />
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
                      {message.type === 'ai' && <Bot className="w-4 h-4" />}
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
                <span>Analyzing {selectedCompany}...</span>
              </motion.div>
            )}
          </div>

          <div className="border-t p-4 bg-gray-50">
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