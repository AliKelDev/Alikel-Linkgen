import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import RoleSelector from './common/RoleSelector';
import { Bot, X, Menu, Bell, Search } from 'lucide-react';

const AnimatedBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showHelp, setShowHelp] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState(() => {
        const storedNotifications = localStorage.getItem('notifications');
        return storedNotifications ? JSON.parse(storedNotifications) : [];
    });
    const location = useLocation();
    const sidebarRef = useRef(null);
    const searchRef = useRef(null);
    const notificationsRef = useRef(null);
    const showHelpRef = useRef(showHelp);

    // Persist notifications
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Track mobile state
    useEffect(() => {
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            if (isMobileView) {
                setIsSidebarCollapsed(true);
            }
        };

        window.addEventListener('resize', checkMobile);
        checkMobile();
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobile]);

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

    const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

    return (
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

                            {/* User Avatar */}
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-blue-600 transition-colors">
                                JD
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

            {/* Help Button */}
            {showHelp && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl 
                        flex items-center gap-3 z-50 max-w-[90vw] md:max-w-md
                        ${isMobile ? 'safe-bottom' : ''}`}
                >
                    <Bot className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">Hi! I'm Kei - LinkForge AI</p>
                        <p className="text-sm text-gray-600 truncate">Need help with prospect research?</p>
                    </div>
                    <button
                        onClick={() => setShowHelp(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full flex-shrink-0"
                        aria-label="Close help"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default AnimatedBackground;