import React from 'react';
import { useRole, ROLES } from '../../contexts/RoleContext';
import { motion } from 'framer-motion';
import { Users, UserSearch, Briefcase } from 'lucide-react';

const RoleSelector = ({ variant = 'horizontal', isCollapsed = false }) => {
  const { currentRole, updateRole, availableRoles } = useRole();

  const roleIcons = {
    [ROLES.SALES]: Users,
    [ROLES.RECRUITER]: UserSearch,
    [ROLES.JOBSEEKER]: Briefcase,
  };

  // Vertical variant styling
  if (variant === 'vertical') {
    return (
      <div className="space-y-2 w-full">
        {availableRoles.map(({ id, title, description }) => {
          const Icon = roleIcons[id] || Users;
          const isActive = currentRole === id;
          
          return (
            <motion.button
              key={id}
              onClick={() => updateRole(id)}
              className={`relative w-full p-3 rounded-lg flex items-center gap-3 transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  : 'text-gray-600 hover:bg-gray-100'}
                group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 inset-y-0 w-1 bg-blue-500 rounded-r-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              {!isCollapsed && (
                <div className="text-left">
                  <span className="block text-sm">{title}</span>
                  <span className="block text-xs text-gray-500 font-normal">{description}</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-xl shadow-sm p-2">
        <div className="flex flex-wrap gap-4 justify-center">
          {availableRoles.map(({ id, title, description }) => {
            const Icon = roleIcons[id] || Users;
            const isActive = currentRole === id;
            
            return (
              <motion.button
                key={id}
                onClick={() => updateRole(id)}
                className={`relative flex flex-col items-center p-6 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-lg' 
                    : 'bg-white border-2 border-transparent hover:border-blue-100'}
                  w-full sm:w-56 shadow-sm hover:shadow-md`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon 
                  className={`w-10 h-10 mb-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
                />
                <span className="font-semibold text-sm mb-1">{title}</span>
                <span className="text-xs text-center text-gray-500 px-2">{description}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 border-2 border-blue-500 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
