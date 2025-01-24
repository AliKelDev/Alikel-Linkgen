import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, BookOpenText, Briefcase, Rocket, Code2, Sparkles } from 'lucide-react';

const WelcomePage = () => {
  const professionalLinks = [
    {
      icon: Briefcase,
      label: "Web Agency",
      url: "https://webpixelle3.netlify.app/",
      color: "text-purple-400"
    },
    {
      icon: Linkedin,
      label: "Company Profile",
      url: "https://www.linkedin.com/company/pixelle-3",
      color: "text-blue-400"
    },
    {
      icon: Github,
      label: "Code Portfolio",
      url: "https://github.com/AliKelDev",
      color: "text-gray-400"
    },
    {
      icon: BookOpenText,
      label: "Tech Blog",
      url: "https://aliceleiserblog.netlify.app/",
      color: "text-green-400"
    }
  ];

  const features = [
    {
      icon: Rocket,
      title: "Enterprise Solutions",
      description: "Generate bulk search URLs with AI-powered domain validation"
    },
    {
      icon: Code2,
      title: "Full-Stack Crafted",
      description: "Built by AliKelDev using cutting-edge React & Node.js stack"
    },
    {
      icon: Sparkles,
      title: "Smart Automation",
      description: "Integrated organizational insights and team size analysis"
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl"
      >
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            LinkForge Pro
          </h1>
          <p className="mt-4 text-xl text-blue-200 font-medium">
            By <span className="text-white">Ali Leiser</span> · CEO at{' '}
            <span className="text-purple-300">Pixelle</span>
          </p>
        </motion.div>

        {/* Professional Links Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {professionalLinks.map((link, index) => (
            <motion.a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all group ${link.color}`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <link.icon className="w-8 h-8 mb-2 mx-auto transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-900/50 to-purple-900/30 p-6 rounded-2xl backdrop-blur-lg border border-white/10"
            >
              <feature.icon className="w-12 h-12 mb-4 mx-auto text-blue-400" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/generator"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-lg font-bold text-white hover:shadow-2xl transition-all group"
          >
            <Rocket className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Launch Enterprise Dashboard
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated Background Element */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default WelcomePage;