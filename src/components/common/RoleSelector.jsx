import React from 'react';
import { useRole, ROLES } from '../../contexts/RoleContext';
import { motion } from 'framer-motion';
import { Users, UserSearch, Briefcase } from 'lucide-react';

const RoleSelector = () => {
  const { currentRole, updateRole, availableRoles } = useRole();

  const roleIcons = {
    [ROLES.SALES]: Users,
    [ROLES.RECRUITER]: UserSearch,
    [ROLES.JOBSEEKER]: Briefcase,
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {availableRoles.map(({ id, title, description }) => {
            const Icon = roleIcons[id] || Users;
            const isActive = currentRole === id;
            
            return (
              <motion.button
                key={id}
                onClick={() => updateRole(id)}
                className={`relative flex flex-col items-center p-4 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-900 shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                  w-full sm:w-48`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon 
                  className={`w-8 h-8 mb-2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                />
                <span className="font-semibold text-sm mb-1">{title}</span>
                <span className="text-xs text-center text-gray-500">{description}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-b-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
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