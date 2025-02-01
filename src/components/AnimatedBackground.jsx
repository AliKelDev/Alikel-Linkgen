import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import RoleSelector from '../components/common/RoleSelector';
import { Bot, X } from 'lucide-react';

const AnimatedBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showHelp, setShowHelp] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const showHelpRef = useRef(showHelp);
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState(() => {
      const storedNotifications = localStorage.getItem('notifications');
      return storedNotifications ? JSON.parse(storedNotifications) : [];
    });
    // State for notification display
    const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
      localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);


    // Function to mark a notification as read
    const markNotificationAsRead = (id) => {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    };

  // Function to count unread notifications
  const unreadNotificationCount = notifications.filter(notification => !notification.read).length;


    useEffect(() => {
        showHelpRef.current = showHelp;
    }, [showHelp]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
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
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900/95 to-blue-950">
            {/* Dashboard Layout Container */}
            <div className="dashboard-container flex min-h-screen">
                {/* Collapsible Sidebar */}
                <motion.aside
                    className={`dashboard-sidebar ${isSidebarCollapsed ? 'w-20' : 'w-60'
                        } fixed inset-y-0 z-30 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 transition-all duration-300`}
                >
                    <div className="sidebar-header p-4 border-b border-gray-800 flex items-center justify-between">
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className={`h-8 w-auto ${isSidebarCollapsed ? 'hidden' : 'block'}`}
                        />
                        <button
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            className="text-gray-400 hover:text-white"
                        >
                            {isSidebarCollapsed ? '»' : '«'}
                        </button>
                    </div>
                    <nav className="sidebar-nav p-4 space-y-2">
                        <RoleSelector variant="vertical" isCollapsed={isSidebarCollapsed} />
                    </nav>
                </motion.aside>

                {/* Main Content Area */}
                <main className={`dashboard-main flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-60'
                    } transition-all duration-300`}>
                    {/* Dashboard Header */}
                    <header className="dashboard-header h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
                        <div className="flex-1 max-w-xl">
                            <input
                                type="text"
                                placeholder="Search companies..."
                                className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="header-actions flex items-center gap-4">
                            <div className="relative">
                              <button className="text-gray-600 hover:text-blue-600 relative"
                                     onClick={() => setShowNotifications(!showNotifications)}>
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                  </svg>
                                  {unreadNotificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
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
                                      <div className="p-4 text-gray-500 text-center">No new notifications.</div>
                                    ) : (
                                        notifications.map(notification => (
                                          <motion.div
                                            key={notification.id}
                                            className={`p-4 border-b last:border-b-0 hover:bg-gray-50 flex items-start gap-3
                                             ${notification.read ? 'opacity-50' : 'font-medium'}`}
                                              onClick={() => markNotificationAsRead(notification.id)}
                                            >
                                            <div className={`w-2 h-2 rounded-full ${notification.read ? 'bg-transparent' : 'bg-blue-500' }`}/>
                                            <p className="text-gray-700 truncate">{notification.message}</p>
                                          </motion.div>
                                        ))
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                          </div>
                            <div className="user-avatar w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:bg-blue-600">
                                JD
                            </div>
                        </div>
                    </header>

                    {/* Content Wrapper */}
                    <div className="content-wrapper p-6 max-w-7xl mx-auto w-full">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<WelcomePage />} />
                             <Route path="/dashboard" element={<HomePage 
                                  searchQuery={searchQuery}  setNotifications={setNotifications}  notifications={notifications}  />} />
                        </Routes>
                    </div>
                </main>
            </div>

            {/* Background Animation */}
            <div
                className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] opacity-30"
                style={{
                    transform: `translate(
            ${mousePosition.x * 15}px,
            ${mousePosition.y * 15}px
            )`,
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    zIndex: -1
                }}
            />

            {/* AI Help Floating Card */}
            {showHelp && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl flex items-center gap-3 z-50"
                >
                    <Bot className="w-6 h-6 text-blue-600" />
                    <div>
                        <p className="font-medium">Hi! I'm Kei - LinkForge AI</p>
                        <p className="text-sm">Need help with prospect research?</p>
                    </div>
                    <button
                        onClick={() => setShowHelp(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default AnimatedBackground;