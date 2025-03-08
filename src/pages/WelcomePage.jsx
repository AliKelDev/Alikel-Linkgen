import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, BookOpenText, Briefcase, Rocket, Code2, Filter } from 'lucide-react';

const WelcomePage = () => {
  const professionalLinks = [
    {
      icon: Briefcase,
      label: "Web Agency",
      url: "https://pixelle3-alikearn.com/",
    },
    {
      icon: Linkedin,
      label: "Company Profile",
      url: "https://www.linkedin.com/company/pixelle-3",
    },
    {
      icon: Github,
      label: "Code Portfolio",
      url: "https://github.com/AliKelDev",
    },
    {
      icon: BookOpenText,
      label: "Tech Blog",
      url: "https://aliceleiserblog.netlify.app/",
    }
  ];

  const features = [
    {
      icon: Rocket,
      title: "Bulk URL Generator",
      description: "Generate hundreds of LinkedIn search URLs instantly with smart domain validation"
    },
    {
      icon: Code2,
      title: "Modern Stack",
      description: "Built with React & Node.js for fast and reliable URL generation"
    },
    {
      icon: Filter,
      title: "Company Filters",
      description: "Fine-tune searches with sector-specific filters and TLD priorities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-blue-100/25 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Alikel Linkforge
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 mb-8 max-w-2xl mx-auto">
              LinkedIn link generator for technical recruitment and sales outreach
            </p>
            
            <div className="flex justify-center">
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Rocket className="w-5 h-5" />
                Launch Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative bg-white/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-blue-100 hover:border-blue-200 transition-all duration-300"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-blue-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Author Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Built by <a href="https://github.com/AliKelDev" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline">AliKelDev</a>
            </h2>
            <p className="text-lg text-blue-600 mb-8">
              Business professional / Founder at <a href="https://pixelle3-alikearn.com/" className="text-blue-700 hover:text-blue-800 underline">Pixelle3</a> | 
              Crafting High-Performance Solutions
            </p>
          </div>
        </div>

        {/* Professional Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {professionalLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/80 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-blue-100 hover:border-blue-200 group"
            >
              <div className="flex flex-col items-center">
                <link.icon className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-blue-900">
                  {link.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .bg-grid-blue-100 {
          background-image: linear-gradient(to right, rgba(219, 234, 254, 0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(219, 234, 254, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;