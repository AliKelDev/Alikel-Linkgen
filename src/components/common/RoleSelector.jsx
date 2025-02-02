import React from 'react';
import { useRole, ROLES } from '../../contexts/RoleContext';
import { motion } from 'framer-motion';
import { Users, UserSearch, Briefcase, ChevronRight } from 'lucide-react';

const RoleSelector = ({ variant = 'horizontal', isCollapsed }) => {
    const { currentRole, updateRole, availableRoles } = useRole();

    const roleIcons = {
        [ROLES.SALES]: Users,
        [ROLES.RECRUITER]: UserSearch,
        [ROLES.JOBSEEKER]: Briefcase,
    };

    // Mobile-friendly vertical layout
    if (variant === 'vertical') {
        return (
            <nav className="space-y-1 w-full touch-none">
                {availableRoles.map(({ id, title, description }) => {
                    const Icon = roleIcons[id] || Users;
                    const isActive = currentRole === id;
                    
                    return (
                        <motion.button
                            key={id}
                            onClick={() => updateRole(id)}
                            className={`
                                relative w-full p-4 rounded-lg flex items-center gap-3
                                transition-colors touch-manipulation min-h-[60px]
                                ${isActive 
                                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                                    : 'text-gray-600 hover:bg-gray-100'}
                                group
                            `}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 inset-y-0 w-1 bg-blue-500 rounded-r-lg"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                />
                            )}
                            
                            <Icon 
                                className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} 
                            />
                            
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="block text-sm truncate">
                                            {title}
                                        </span>
                                        <ChevronRight className={`
                                            w-4 h-4 transform transition-transform
                                            ${isActive ? 'rotate-90 text-blue-600' : 'text-gray-400'}
                                        `} />
                                    </div>
                                    <span className="block text-xs text-gray-500 font-normal truncate">
                                        {description}
                                    </span>
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </nav>
        );
    }

    // Horizontal layout for larger screens
    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-sm p-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {availableRoles.map(({ id, title, description }) => {
                        const Icon = roleIcons[id] || Users;
                        const isActive = currentRole === id;
                        
                        return (
                            <motion.button
                                key={id}
                                onClick={() => updateRole(id)}
                                className={`
                                    relative flex flex-col items-center p-4 rounded-xl 
                                    transition-all touch-manipulation
                                    ${isActive 
                                        ? 'bg-blue-50 border-2 border-blue-500 shadow-lg' 
                                        : 'bg-white border-2 border-transparent hover:border-blue-100'}
                                    min-h-[120px] shadow-sm hover:shadow-md
                                `}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon 
                                    className={`w-10 h-10 mb-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                                />
                                <span className="font-semibold text-sm mb-1 text-center">
                                    {title}
                                </span>
                                <span className="text-xs text-center text-gray-500 px-2 line-clamp-2">
                                    {description}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute inset-0 border-2 border-blue-500 rounded-xl"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 30
                                        }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RoleSelector;