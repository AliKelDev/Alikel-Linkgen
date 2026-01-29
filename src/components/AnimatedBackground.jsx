import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import RoleSelector from './common/RoleSelector';
import { Bot, X, Menu, Bell, Search, MessageSquare, Maximize2, Minimize2, Send, ChevronRight, ChevronDown, LogIn, LogOut } from 'lucide-react';
import AIChatAssistant from './features/linkGenerator/AIChatAssistant';
import ChatHistoryDropdown from './features/linkGenerator/ChatHistoryDropdown';
import { chatDB } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

// Create a context for the chat assistant
export const ChatContext = createContext(null);

export const useChatAssistant = () => {
    return useContext(ChatContext);
};

const AnimatedBackground = () => {
    const { user, signIn, signOut, isAuthenticated, loading: authLoading } = useAuth();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showHelp, setShowHelp] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [notifications, setNotifications] = useState(() => {
        const storedNotifications = localStorage.getItem('notifications');
        return storedNotifications ? JSON.parse(storedNotifications) : [];
    });

    // Kei Chat Assistant States
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isChatFullscreen, setIsChatFullscreen] = useState(false);
    const [chatContext, setChatContext] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentCompany, setCurrentCompany] = useState(null);
    const [currentDomain, setCurrentDomain] = useState(null);
    const [showChatSuggestions, setShowChatSuggestions] = useState(true);
    const [showChatHistory, setShowChatHistory] = useState(false);
    const [chatCompanyList, setChatCompanyList] = useState(() => {
        const storedList = localStorage.getItem('chatCompanyList');
        return storedList ? JSON.parse(storedList) : [];
    });
    const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

    const location = useLocation();
    const sidebarRef = useRef(null);
    const searchRef = useRef(null);
    const notificationsRef = useRef(null);
    const chatRef = useRef(null);
    const showHelpRef = useRef(showHelp);

    // Load conversations from Firebase on mount and when user auth state changes
    useEffect(() => {
        const loadFromFirebase = async () => {
            try {
                // Only load from Firebase if authenticated
                if (isAuthenticated) {
                    const firebaseCompanyList = await chatDB.getConversationList();
                    if (firebaseCompanyList && firebaseCompanyList.length > 0) {
                        setChatCompanyList(firebaseCompanyList);
                        localStorage.setItem('chatCompanyList', JSON.stringify(firebaseCompanyList));
                    }

                    // Load last chat company's messages
                    const lastChatCompany = localStorage.getItem('lastChatCompany');
                    if (lastChatCompany) {
                        setCurrentCompany(lastChatCompany);
                        const firebaseMessages = await chatDB.getMessages(lastChatCompany);
                        if (firebaseMessages && firebaseMessages.length > 0) {
                            setMessages(firebaseMessages);
                            localStorage.setItem(`chatHistory_${lastChatCompany}`, JSON.stringify(firebaseMessages));
                        } else {
                            // Fallback to localStorage
                            const storedMessages = localStorage.getItem(`chatHistory_${lastChatCompany}`);
                            if (storedMessages) {
                                setMessages(JSON.parse(storedMessages));
                            }
                        }
                    }
                }
                // Anonymous users: no persistent history, just start fresh
            } catch (error) {
                console.warn('Firebase load failed:', error);
            } finally {
                setIsFirebaseLoaded(true);
            }
        };

        // Only load when auth is done loading
        if (!authLoading) {
            loadFromFirebase();
        }
    }, [user, authLoading, isAuthenticated]); // Reload when user signs in/out

    // Persist notifications (limit to last 50 to avoid quota issues)
    useEffect(() => {
        try {
            const recentNotifications = notifications.slice(0, 50);
            localStorage.setItem('notifications', JSON.stringify(recentNotifications));
        } catch (e) {
            console.warn('Failed to save notifications to localStorage:', e);
            // If quota exceeded, clear old notifications
            try {
                const recentNotifications = notifications.slice(0, 20);
                localStorage.setItem('notifications', JSON.stringify(recentNotifications));
            } catch (err) {
                console.error('Could not save even truncated notifications:', err);
            }
        }
    }, [notifications]);

    // Persist chat company list to Firebase (only if authenticated)
    useEffect(() => {
        // Only sync to Firebase if authenticated and after initial load
        if (isAuthenticated && isFirebaseLoaded) {
            localStorage.setItem('chatCompanyList', JSON.stringify(chatCompanyList));
            chatDB.saveConversationList(chatCompanyList).catch(err =>
                console.warn('Failed to save conversation list to Firebase:', err)
            );
        }
    }, [chatCompanyList, isFirebaseLoaded, isAuthenticated]);

    // Track mobile state
    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            if (isMobileView) {
                setIsSidebarCollapsed(true);
                setIsChatFullscreen(isChatOpen); // On mobile, chat is always fullscreen when open
            }
        };

        window.addEventListener('resize', checkMobile);
        checkMobile();
        return () => window.removeEventListener('resize', checkMobile);
    }, [isChatOpen]);

    // Handle clicks outside sidebar and dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile) {
                if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                    setIsSidebarCollapsed(true);
                }
                if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                    setShowNotifications(false);
                }
            }

            // Don't close chat when clicking outside if it's fullscreen
            if (!isChatFullscreen && chatRef.current && !chatRef.current.contains(event.target)) {
                // Keep chat open but minimize it
                const chatBubbleElement = document.getElementById('chat-bubble');
                if (chatBubbleElement && !chatBubbleElement.contains(event.target)) {
                    setIsChatOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobile, isChatFullscreen]);

    // Mouse position effect for background animation
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isMobile) {
                setMousePosition({
                    x: (e.clientX / window.innerWidth) * 2 - 1,
                    y: (e.clientY / window.innerHeight) * 2 - 1,
                });
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 300 && !showHelpRef.current) {
                setShowHelp(true);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleNotificationClick = (id) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    // Chat Assistant Functions
    const openChat = async (company = null, domain = null, context = null) => {
        // Use 'General' as default chat key when no company specified
        const chatKey = company || 'General';

        // Set current company (null for general chat)
        setCurrentCompany(company);
        setCurrentDomain(domain || null);
        if (company) {
            localStorage.setItem('lastChatCompany', company);
        }

        // Always try to load history for authenticated users
        if (chatKey) {

            // Update company list for history (only for authenticated users)
            if (isAuthenticated) {
                const currentTimestamp = new Date().toISOString();
                const existingCompanyIndex = chatCompanyList.findIndex(item => item.company === chatKey);

                if (existingCompanyIndex >= 0) {
                    // Update existing entry
                    const updatedList = [...chatCompanyList];
                    updatedList[existingCompanyIndex] = {
                        ...updatedList[existingCompanyIndex],
                        lastChat: currentTimestamp,
                        domain: domain || updatedList[existingCompanyIndex].domain
                    };
                    setChatCompanyList(updatedList);
                } else {
                    // Add new entry
                    setChatCompanyList([
                        {
                            company: chatKey,
                            domain: domain || null,
                            lastChat: currentTimestamp
                        },
                        ...chatCompanyList
                    ]);
                }
            }

            // Load previous chat history - only from Firebase if authenticated
            let messagesLoaded = false;
            if (isAuthenticated) {
                try {
                    const firebaseMessages = await chatDB.getMessages(chatKey);
                    if (firebaseMessages && firebaseMessages.length > 0) {
                        setMessages(firebaseMessages);
                        localStorage.setItem(`chatHistory_${chatKey}`, JSON.stringify(firebaseMessages));
                        messagesLoaded = true;
                    }
                } catch (error) {
                    console.warn('Failed to load from Firebase:', error);
                }
            }

            if (!messagesLoaded) {
                // Initialize with welcome message
                setMessages([{
                    id: 'welcome',
                    type: 'ai',
                    content: `**Hi! I'm Kei** 🦊 - LinkForge's AI Research Assistant\n\n` +
                        `I can help you with:\n` +
                        `• **Domain Validation** (priority TLDs, alternatives)\n` +
                        `• **Outreach Planning** (key roles, messaging strategy)\n` +
                        `• **Tech Analysis** (secret management patterns, infra insights)\n\n` +
                        `Ask me anything about ${company || "your target companies"}!`
                }]);
            }
        }

        if (context) {
            setChatContext(context);
        }

        setIsChatOpen(true);
        setShowHelp(false); // Hide the help tooltip when chat is opened
        setShowChatHistory(false); // Hide chat history dropdown when opening a chat
    };

    const closeChat = () => {
        setIsChatOpen(false);
        setIsChatFullscreen(false);
    };

    const toggleChatFullscreen = () => {
        setIsChatFullscreen(!isChatFullscreen);
    };

    const deleteConversation = (company) => {
        // Remove from Firebase (only if authenticated)
        if (isAuthenticated) {
            localStorage.removeItem(`chatHistory_${company}`);
            chatDB.deleteConversation(company).catch(err =>
                console.warn('Failed to delete conversation from Firebase:', err)
            );
        }

        // Update the company list
        const updatedList = chatCompanyList.filter(item => item.company !== company);
        setChatCompanyList(updatedList);

        // If deleting the current conversation, reset it
        if (currentCompany === company) {
            // Reset to welcome message
            const newMessage = [{
                id: Date.now(),
                type: 'ai',
                content: `**Hi! I'm Kei** 🦊 - LinkForge's AI Research Assistant\n\n` +
                    `I can help you with:\n` +
                    `• **Domain Validation** (priority TLDs, alternatives)\n` +
                    `• **Outreach Planning** (key roles, messaging strategy)\n` +
                    `• **Tech Analysis** (secret management patterns, infra insights)\n\n` +
                    `Ask me anything about your target companies!`
            }];
            setMessages(newMessage);
            updateChatMessages(newMessage);
        }

        // If we're deleting the last chat company, clear it
        if (localStorage.getItem('lastChatCompany') === company) {
            localStorage.removeItem('lastChatCompany');
        }

        // Close the chat history dropdown
        setShowChatHistory(false);
    };

    const startNewConversation = (company = null, domain = null) => {
        // Clear current conversation
        if (company) {
            // Create new conversation with specified company
            setCurrentCompany(company);
            setCurrentDomain(domain || null);
            localStorage.setItem('lastChatCompany', company);

            // Add to company list
            const currentTimestamp = new Date().toISOString();
            setChatCompanyList([
                {
                    company,
                    domain: domain || null,
                    lastChat: currentTimestamp
                },
                ...chatCompanyList.filter(item => item.company !== company)
            ]);
        } else {
            // Clear company focus
            setCurrentCompany(null);
            setCurrentDomain(null);
            localStorage.removeItem('lastChatCompany');
        }

        // Reset to welcome message
        const newMessage = [{
            id: Date.now(),
            type: 'ai',
            content: `**Hi! I'm Kei** 🦊 - LinkForge's AI Research Assistant\n\n` +
                `I can help you with:\n` +
                `• **Domain Validation** (priority TLDs, alternatives)\n` +
                `• **Outreach Planning** (key roles, messaging strategy)\n` +
                `• **Tech Analysis** (secret management patterns, infra insights)\n\n` +
                `Ask me anything about ${company || "your target companies"}!`
        }];
        setMessages(newMessage);

        // Save as a new conversation if company provided and authenticated
        if (company && isAuthenticated) {
            localStorage.setItem(`chatHistory_${company}`, JSON.stringify(newMessage));
            chatDB.saveMessages(company, newMessage).catch(err =>
                console.warn('Failed to save new conversation to Firebase:', err)
            );
        }

        setShowChatHistory(false);
        setShowChatSuggestions(true);
    };

    const updateChatMessages = (newMessages) => {
        setMessages(newMessages);
        // Only persist to Firebase if authenticated
        if (isAuthenticated) {
            const chatKey = currentCompany || 'General';
            localStorage.setItem(`chatHistory_${chatKey}`, JSON.stringify(newMessages));
            chatDB.saveMessages(chatKey, newMessages).catch(err =>
                console.warn('Failed to save messages to Firebase:', err)
            );

            // Update company list if this is a new chat
            if (!currentCompany && !chatCompanyList.some(item => item.company === 'General')) {
                setChatCompanyList([
                    { company: 'General', domain: null, lastChat: new Date().toISOString() },
                    ...chatCompanyList
                ]);
            }
        }
    };

    const toggleChatHistory = () => {
        setShowChatHistory(!showChatHistory);
    };

    const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

    // Provide chat context to the entire app
    const chatContextValue = {
        isOpen: isChatOpen,
        isFullscreen: isChatFullscreen,
        messages,
        currentCompany,
        currentDomain,
        context: chatContext,
        chatHistory: chatCompanyList,
        showHistory: showChatHistory,
        isAuthenticated,
        signIn,
        openChat,
        closeChat,
        toggleFullscreen: toggleChatFullscreen,
        updateMessages: updateChatMessages,
        deleteConversation,
        startNewConversation,
        toggleChatHistory
    };

    return (
        <ChatContext.Provider value={chatContextValue}>
            <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900/95 to-blue-950">
                {/* Mobile Backdrop */}
                <AnimatePresence>
                    {isMobile && !isSidebarCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setIsSidebarCollapsed(true)}
                        />
                    )}
                </AnimatePresence>

                <div className="dashboard-container flex min-h-screen">
                    {/* Sidebar */}
                    <motion.aside
                        ref={sidebarRef}
                        className={`
                            dashboard-sidebar fixed inset-y-0 z-50 
                            bg-gradient-to-b from-gray-900 to-gray-800 
                            border-r border-gray-700 transition-all duration-300
                            ${isMobile
                                ? `mobile-sidebar ${isSidebarCollapsed ? 'mobile-collapsed' : 'mobile-expanded'}`
                                : `${isSidebarCollapsed ? 'w-16' : 'w-64'}`
                            }
                        `}
                        initial={false}
                    >
                        <div className="sidebar-header p-4 border-b border-gray-800 flex items-center justify-between">
                            <img
                                src="/logo.svg"
                                alt="Logo"
                                className={`h-8 w-auto ${isSidebarCollapsed && !isMobile ? 'hidden' : 'block'}`}
                            />
                            <button
                                onClick={toggleSidebar}
                                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg"
                                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                            >
                                {isMobile ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <span className="text-xl">{isSidebarCollapsed ? '»' : '«'}</span>
                                )}
                            </button>
                        </div>

                        <nav className={`sidebar-nav p-4 space-y-2 ${isSidebarCollapsed && !isMobile ? 'opacity-0' : 'opacity-100'}`}>
                            <RoleSelector variant="vertical" isCollapsed={isSidebarCollapsed} />
                        </nav>
                    </motion.aside>

                    {/* Main Content */}
                    <main className={`flex-1 transition-all duration-300 
                        ${isMobile ? '' : (isSidebarCollapsed ? 'ml-16' : 'ml-64')}`}
                    >
                        {/* Header */}
                        <header className="dashboard-header h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-6 bg-white sticky top-0 z-30">
                            {/* Mobile Menu Button */}
                            {isMobile && (
                                <button
                                    onClick={() => setIsSidebarCollapsed(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                    aria-label="Open menu"
                                >
                                    <Menu className="w-6 h-6 text-gray-600" />
                                </button>
                            )}

                            {/* Search Bar */}
                            <div className="flex-1 max-w-xl mx-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        ref={searchRef}
                                        placeholder="Search companies..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Header Actions */}
                            <div className="flex items-center gap-2 md:gap-4">
                                {/* Notifications */}
                                <div className="relative" ref={notificationsRef}>
                                    <button
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="p-2 hover:bg-gray-100 rounded-lg relative"
                                        aria-label="Notifications"
                                    >
                                        <Bell className="w-6 h-6 text-gray-600" />
                                        {unreadNotificationCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                                {unreadNotificationCount}
                                            </span>
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {showNotifications && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 border border-gray-100 overflow-hidden"
                                            >
                                                {notifications.length === 0 ? (
                                                    <div className="p-4 text-gray-500 text-center">
                                                        No notifications
                                                    </div>
                                                ) : (
                                                    <div className="max-h-[400px] overflow-y-auto">
                                                        {notifications.map(notification => (
                                                            <motion.div
                                                                key={notification.id}
                                                                className={`p-4 border-b last:border-b-0 hover:bg-gray-50 flex items-start gap-3 cursor-pointer
                                                                    ${notification.read ? 'opacity-60' : ''}`}
                                                                onClick={() => handleNotificationClick(notification.id)}
                                                            >
                                                                <div className={`w-2 h-2 rounded-full mt-2 
                                                                    ${notification.read ? 'bg-transparent' : 'bg-blue-500'}`}
                                                                />
                                                                <p className="text-gray-700 text-sm">{notification.message}</p>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* User Avatar / Sign In */}
                                <div className="relative">
                                    {isAuthenticated ? (
                                        <>
                                            <button
                                                onClick={() => setShowUserMenu(!showUserMenu)}
                                                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                {user?.photoURL ? (
                                                    <img
                                                        src={user.photoURL}
                                                        alt={user.displayName || 'User'}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                                    </div>
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {showUserMenu && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl z-50 border border-gray-100 overflow-hidden"
                                                    >
                                                        <div className="p-4 border-b border-gray-100">
                                                            <p className="font-medium text-gray-900 truncate">{user?.displayName || 'User'}</p>
                                                            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                                        </div>
                                                        <button
                                                            onClick={async () => {
                                                                await signOut();
                                                                setShowUserMenu(false);
                                                            }}
                                                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                        >
                                                            <LogOut className="w-4 h-4" />
                                                            Sign out
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <button
                                            onClick={signIn}
                                            disabled={authLoading}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                                        >
                                            <LogIn className="w-4 h-4" />
                                            Sign in
                                        </button>
                                    )}
                                </div>
                            </div>
                        </header>

                        {/* Page Content */}
                        <div className="content-wrapper p-4 md:p-6 max-w-7xl mx-auto w-full">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<WelcomePage />} />
                                <Route path="/dashboard" element={
                                    <HomePage
                                        searchQuery={searchQuery}
                                        setNotifications={setNotifications}
                                        notifications={notifications}
                                    />
                                } />
                            </Routes>
                        </div>
                    </main>
                </div>

                {/* Background Animation */}
                {!isMobile && (
                    <div
                        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] opacity-30"
                        style={{
                            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                            transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                            zIndex: -1
                        }}
                    />
                )}

                {/* Floating Chat Bubble (always visible when chat is not open) */}
                <AnimatePresence>
                    {!isChatOpen && (
                        <motion.button
                            id="chat-bubble"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -10, 0],
                                transition: {
                                    y: {
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        duration: 2,
                                        ease: "easeInOut"
                                    }
                                }
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openChat()}
                            className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all"
                        >
                            <span className="text-xl">🦊</span>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Kei Chat Assistant */}
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div
                            ref={chatRef}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className={`fixed ${isChatFullscreen ? 'inset-0 z-50' : 'bottom-6 right-6 z-50 w-96 max-w-[90vw] h-[500px] max-h-[80vh]'}`}
                        >
                            <AIChatAssistant
                                isFullscreen={isChatFullscreen}
                                toggleFullscreen={toggleChatFullscreen}
                                onClose={closeChat}
                                company={currentCompany}
                                domain={currentDomain}
                                messages={messages}
                                updateMessages={updateChatMessages}
                                showSuggestions={showChatSuggestions}
                                setShowSuggestions={setShowChatSuggestions}
                            />

                            {/* Chat History Dropdown */}
                            <AnimatePresence>
                                {showChatHistory && (
                                    <ChatHistoryDropdown
                                        chatHistory={chatCompanyList}
                                        onSelectChat={(company, domain) => openChat(company, domain)}
                                        onDeleteChat={deleteConversation}
                                        onNewChat={startNewConversation}
                                        currentCompany={currentCompany}
                                        isFullscreen={isChatFullscreen}
                                        isAuthenticated={isAuthenticated}
                                        onSignIn={signIn}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Help Button (only visible when chat is not open) */}
                {showHelp && !isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl 
            flex items-center gap-3 z-50 max-w-[90vw] md:max-w-md cursor-pointer
            ${isMobile ? 'safe-bottom' : ''}`}
                        onClick={() => openChat()}
                    >
                        <span className="text-xl flex-shrink-0">🦊</span>
                        <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">Hi! I'm Kei - LinkForge AI</p>
                            <p className="text-sm text-gray-600 truncate">Need help with prospect research?</p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowHelp(false);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded-full flex-shrink-0"
                            aria-label="Close help"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </div>
        </ChatContext.Provider>
    );
};

export default AnimatedBackground;