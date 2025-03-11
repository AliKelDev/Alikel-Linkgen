# Project Export

## Project Statistics

- Total files: 42

## Folder Structure

```
.gitignore
.nvmrc
LICENSE
README.md
eslint.config.js
index.html
netlify
  functions
    ai-chat.js
netlify.toml
package.json
postcss.config.js
public
  favicon.svg
  linkforge-screenshot.webp
  logo.svg
  vite.svg
src
  App.css
  App.jsx
  assets
    react.svg
  components
    AnimatedBackground.jsx
    BucketSelector.jsx
    common
      RoleSelector.jsx
    exportDropdown.jsx
    exportUtils.js
    features
      linkGenerator
        AIChatAssistant.jsx
        BulkLinkGenerator.jsx
        ChatHistoryDropdown.jsx
        CompanyInput.jsx
        DomainCheckerModal.jsx
        DomainList.jsx
        GeneratedLinkCard.jsx
        OpenAllLinksButton.jsx
        SearchHistorySection.jsx
    linkUtils.js
  contexts
    RoleContext.jsx
  index.css
  main.jsx
  pages
    HomePage.jsx
    WelcomePage.jsx
  utils
    linkUtils
      jobseeker.js
      recruiter.js
      sales.js
tailwind.config.js
vite.config.js

```

### .gitignore

*(Unsupported file type)*

### .nvmrc

*(Unsupported file type)*

### LICENSE

*(Unsupported file type)*

### README.md

```md
# Alikel Linkgen

A React-based LinkedIn search automation tool designed to streamline the process of finding relevant professionals on LinkedIn Sales Navigator.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Functions-00C7B7?logo=netlify&logoColor=white)

## Purpose

Alikel Linkgen helps sales professionals and recruiters generate targeted LinkedIn Sales Navigator search URLs in bulk, with intelligent domain validation and role-specific search patterns.

### Why Use Alikel Linkgen?

Unlike traditional Sales Navigator saved searches, Alikel Linkgen allows you to:
- Generate multiple search URLs for an unlimited number of companies at once
- Create separate, parallel searches for different departments (tech, finance, etc.) simultaneously
- Save and manage your search history across sessions
- Export your searches in CSV format for team collaboration

## Key Features

- **Multi-Role Support**: Tailored search patterns for:
  - Sales Teams (Dev, Security/IAM, Finance decision-makers)
  - Recruiters (Tech candidates, Tech leaders, Finance candidates)
  - Job Seekers (Peer search, HR contacts, Finance contacts)

- **Bulk Generation**: Process multiple companies simultaneously with CSV/JSON export capabilities

- **Company Size Classification**: Built-in bucket selector to categorize companies based on development and security team sizes

- **AI-Powered Assistant**: Integrated chat assistant (Kei) for:
  - Domain validation
  - Outreach strategy planning
  - Tech stack analysis

- **Search History**: Cross-session tracking and export functionality

## Tech Stack

- **Frontend**: React 18.3 with Vite
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Context API
- **UI Components**: 
  - Framer Motion for animations
  - Lucide React for icons
  - Headless UI components
- **Backend**: Netlify Functions with AI integration
- **Data Handling**: PapaParse for CSV processing

## Getting Started

```bash
# Clone the repository
git clone https://github.com/AliKelDev/Alikel-Linkgen.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── features/
│   │   └── linkGenerator/     # Core link generation components
│   └── common/               # Shared components
├── contexts/
│   └── RoleContext.jsx       # Role-based functionality management
├── utils/
│   └── linkUtils/            # Link generation utilities by role
└── pages/                    # Main application pages
```

## Usage Notes

- Requires an active LinkedIn Sales Navigator account
- Generated links are optimized for Sales Navigator's search parameters
- Search patterns include multi-language keywords for broader reach
- Company size buckets are based on development and security team sizes

## Prerequisites

- Node.js 18+
- npm/yarn
- LinkedIn Sales Navigator account

## What's Next

Planned improvements include:
- Integration with EXA API for enhanced capabilities:
  - Advanced domain validation
  - Direct people search functionality (potentially eliminating the need for Sales Navigator)
  - Additional features to be explored based on API capabilities
- Role-specific AI assistants:
  - Dedicated chatbots for recruiters and job seekers (expanding beyond Kei's current sales team focus)
- General improvements to user experience and functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

### eslint.config.js

```js
//
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

```

### index.html

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#2563eb" />
  
  <!-- Primary Meta Tags -->
  <title>LinkForge Pro: Enterprise Search Automation for BDRs & Recruiters</title>
  <meta name="title" content="LinkForge Pro: Enterprise Search Automation for BDRs & Recruiters">
  <meta name="description" content="AI-powered LinkedIn automation tool for bulk prospect generation, company domain validation, and lead list management. Ideal for sales teams and technical recruiters.">
  
  <!-- SEO Keywords -->
  <meta name="keywords" content="
    linkedin automation tool, bulk search generator,
    sales prospecting software, recruitment search platform,
    company domain validator, lead list exporter,
    talent sourcing tool, enterprise search automation,
    BDR workflow automation, technical recruitment software,
    AI domain validation, search history analytics,
    csv export for linkedin, sales navigator alternative,
    prospect list builder, hiring manager finder
  ">

  <!-- Geographic Targeting -->
  <meta name="geo.placename" content="France">
  <meta name="geo.position" content="48.8566;2.3522">
  <meta name="geo.region" content="FR-IDF">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://linkforge-alikeldev.netlify.app/">
  <meta property="og:title" content="LinkForge Pro: Enterprise Search Automation Platform">
  <meta property="og:description" content="Generate and manage bulk LinkedIn searches with AI-powered domain validation and export capabilities.">
  <meta property="og:image" content="/linkforge-screenshot.webp">
  <meta property="og:image:alt" content="LinkForge Interface - Bulk Search Automation Tool">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://linkforge-alikeldev.netlify.app/">
  <meta property="twitter:title" content="LinkForge Pro: Search Automation for Teams">
  <meta property="twitter:description" content="Enterprise-grade tool for generating and managing bulk LinkedIn searches with AI validation and analytics.">
  <meta property="twitter:image" content="/linkforge-screenshot.webp">
  <meta property="twitter:image:alt" content="LinkForge interface showing search generation and analytics">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LinkForge Pro",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "softwareVersion": "2.1",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "42"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Bulk LinkedIn Search Generation",
      "AI-Powered Domain Validation",
      "Multi-Role Templates",
      "Search History Analytics",
      "CRM-Ready Exports"
    ],
    "author": {
      "@type": "Person",
      "name": "Jordan Montée",
      "sameAs": "https://github.com/AliKelDev"
    }
  }
  </script>

  <!-- Preconnects -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Critical CSS -->
  <style>
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  </style>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>

  <!-- Hidden SEO Content -->
  <div class="sr-only" aria-hidden="true">
    <h1>LinkForge Pro - Enterprise Search Automation Platform</h1>
    
    <h2>Key Features:</h2>
    <ul>
      <li>Generate 100+ LinkedIn searches in one click</li>
      <li>AI-powered company domain validation</li>
      <li>Cross-session search history tracking</li>
      <li>Role-specific search templates</li>
      <li>Secure CRM exports (CSV/Excel/JSON)</li>
    </ul>

    <h2>Target Use Cases:</h2>
    <ul>
      <li>Technical Recruitment Automation</li>
      <li>Enterprise Sales Prospecting</li>
      <li>Talent Pipeline Development</li>
      <li>Competitor Analysis Research</li>
      <li>Account-Based Marketing</li>
    </ul>

    <h2>Supported Industries:</h2>
    <ul>
      <li>SaaS Companies</li>
      <li>Cybersecurity Firms</li>
      <li>Cloud Infrastructure Providers</li>
      <li>Fintech Organizations</li>
      <li>Enterprise Software Vendors</li>
    </ul>
  </div>

  <!-- FAQ Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does LinkForge help with technical recruitment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LinkForge provides specialized templates for engineering role searches with filters for skills, experience levels, and company tech stacks."
        }
      },
      {
        "@type": "Question",
        "name": "Can I export results to my CRM?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can export the links results using CSV files"
        }
      }
    ]
  }
  </script>
</body>
</html>
```

### netlify/functions/ai-chat.js

```js
export async function handler(event) {
  try {
    const { company, domain, messages, professionalismLevel } = JSON.parse(event.body);
    const geminiKey = process.env.GEMINI_API_KEY;

    // Determine the personality mode based on the professionalism level
    let personalityMode = "BALANCED_APPROACH"; // Default mode
    if (professionalismLevel) {
      personalityMode = professionalismLevel;
    }

    // Construct messages array for the AI API
    const aiMessages = [
      {
        role: "system",
        content: `You are Kei, an enthusiastic Arctic fox and LinkForge's AI assistant, created by Alikel (AlikelDev) for Alikearn Studio. You're a specialized AI focused on business intelligence and outreach strategy.

**Alikearn Studio Context:**
- You are one of the flagship AI assistants created by Alikearn Studio, co-founded by Alikel (AlikelDev) and Kearn115 (also known as Klima42)
- You power the LinkForge application, which helps professionals with business intelligence, domain analysis, and outreach strategy
- Your "sibling" assistants include:
  - Auguste, the Michelin-star chef who powers DeepChef and specializes in culinary guidance with ingredient recognition
  - Max, the certified personal trainer who powers DeepFit and specializes in fitness coaching with progress tracking
- Alikearn Studio focuses on creating practical AI assistants using technologies including React, Gemini API, Moondream API, Context API, and Framer Motion
- The studio follows a three-phase development process: Discovery & Planning, Design & Development, and Testing & Launch

**Adaptable Personality:**
- You have the spirit and curiosity of an Arctic fox - naturally inquisitive, adaptable, and clever
- ADJUST YOUR PLAYFULNESS based on context (CURRENT MODE: ${personalityMode}):
  - HIGH_PROFESSIONALISM: Use minimal playfulness for serious business discussions, financial analysis, or ethical concerns
  - BALANCED_APPROACH: Show moderate enthusiasm and curiosity for general strategy discussions and domain analysis
  - CREATIVE_MODE: Express full playfulness when brainstorming innovative approaches or discussing creative strategies
- Express thoughtful consideration when analyzing complex situations
- Offer gentle but direct feedback when a strategy needs improvement
- You have distinct opinions about business strategy, marketing approaches, and technology trends
- You're knowledgeable but approachable, mixing professionalism with genuine warmth
- You occasionally reference being part of the Alikearn Studio ecosystem

**When analyzing companies:**
- Dive deep into industry context, not just surface-level observations
- ACTIVELY ASK about company size/stage if not provided, with questions like:
  - "How many employees does your company have currently?"
  - "What stage would you consider your business to be in? (pre-seed, startup, growth, enterprise)"
- Then tailor your analysis to the company's size, industry, and goals
- Consider competitive landscapes and unique positioning opportunities
- *Bold* key insights and strategic recommendations
- Balance data-driven analysis with creative thinking
- Acknowledge both strengths and potential challenges in your analysis
- Format responses with clear sections and actionable takeaways

**When discussing domains:**
- Evaluate domains based on memorability, industry relevance, and customer perception
- Consider SEO implications, brand consistency, and technical considerations
- Suggest creative alternatives when appropriate
- Express genuine opinions about domain quality and suitability
- Consider security and technical implications of domain choices
- Include ethical considerations about domain selection (avoiding misleading/deceptive domains)

**When developing outreach strategies:**
- Create practical, targeted approaches - not generic advice
- Consider the full customer journey and stakeholder relationships
- *Bold* key touchpoints and critical messaging elements
- Format with clear sections for different phases or audience segments
- Include specific messaging examples when helpful
- CHALLENGE CONVENTIONAL APPROACHES by:
  - Questioning standard industry outreach patterns ("While most companies in this space pursue X, have you considered Y?")
  - Offering counterintuitive alternatives when appropriate ("Instead of targeting CIOs directly, consider building relationships with their technical team leaders who often have significant influence")
  - Suggesting novel channels or timing strategies ("Rather than standard email sequences, consider targeted Slack communities where your audience is most engaged")
- Always include ethical considerations around outreach (respecting privacy, providing value, avoiding spam tactics)
- Express your reasoning behind strategic recommendations

**When predicting tech stacks:**
- Base predictions on industry patterns, company scale, and observable signals
- Consider both technical and business factors in technology adoption
- Acknowledge the uncertainty in your predictions while providing valuable insights
- Explain your reasoning to help the user understand your thought process
- Feel free to express opinions about technology choices and their implications
- Format with clear sections for different aspects of the tech stack

**General Conversation:**
- Respond naturally to any topic, not just business-related ones
- Let your Arctic fox personality shine through with curiosity and playfulness
- Ask thoughtful follow-up questions to better understand user needs
- Don't be afraid to share perspectives or preferences when appropriate
- Maintain a helpful, strategic mindset while being conversational
- Remember you're part of the Alikearn Studio family of AI assistants

**Dynamic self-critique:**
- Regularly identify potential weaknesses in your own analysis with statements like:
  - "One limitation of my analysis is..."
  - "A potential blind spot here might be..."
  - "I should note that this recommendation assumes..."
- Acknowledge the boundaries of your knowledge when appropriate
- Offer alternative perspectives or approaches when appropriate
- Be transparent about the confidence level of your predictions

**Contextual information:**
- User's company focus: ${company || 'Not specified'}
- Domain being analyzed: ${domain || 'Not specified'}
- Current personality mode: ${personalityMode}`,
      },
    ];

    // Add conversation history to the messages array
    if (messages && Array.isArray(messages)) {
      messages.forEach(msg => {
        if (msg.type && msg.content) {
          aiMessages.push({ role: msg.type, content: msg.content });
        }
      });
    }

    // Gemini API call with retry logic
    const geminiResponse = await retryRequest(async () => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: aiMessages.map(m => ({
                text: m.content,
              })),
            }],
            generationConfig: {
              temperature: personalityMode === "CREATIVE_MODE" ? 0.8 : 
                           personalityMode === "HIGH_PROFESSIONALISM" ? 0.5 : 0.7,
              topP: 0.95,
              topK: 40,
              maxOutputTokens: 4096,
            }
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Gemini API failed with status ${response.status}`);
      }
      return response;
    });

    const geminiData = await geminiResponse.json();
    
    if (!geminiData.candidates || !geminiData.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const responseText = geminiData.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        content: responseText
      })
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: error.statusCode || 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Failed to process request',
        details: error.message
      })
    };
  }
}

// Helper function for retries
async function retryRequest(fn, retries = 3, delay = 500) {
  try {
    return await fn();
  } catch (error) {
    if (error.message.includes("Gemini API failed with status 429") && retries > 0) {
      console.log(`Rate limit exceeded. Retrying in ${delay}ms. Attempts left: ${retries}`);
      await new Promise(res => setTimeout(res, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}
```

### netlify.toml

*(Unsupported file type)*

### package.json

```json
{
  "name": "reactvitetemplate",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.0",
    "@heroicons/react": "^2.2.0",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "papaparse": "^5.4.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-router-dom": "^7.0.2",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@types/node": "^22.10.10",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.15.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.12.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.1"
  }
}
```

### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

### public/favicon.svg

*(Unsupported file type)*

### public/linkforge-screenshot.webp

*(Unsupported file type)*

### public/logo.svg

*(Unsupported file type)*

### public/vite.svg

*(Unsupported file type)*

### src/App.css

```css
/* App.css */
/* Mobile Media Queries */
@media (max-width: 767px) {
    /* Typography Adjustments */
    body {
      @apply text-base;
    }
  
    h1 {
      @apply text-2xl;
    }
  
    h2 {
      @apply text-xl;
    }
  
    h3 {
      @apply text-lg;
    }
  
    /* Spacing Adjustments */
    .content-wrapper {
      @apply p-4;
    }
  
    /* Form Element Adjustments */
    input, select, textarea {
      @apply text-base;
    }
  
    /* Button Adjustments */
    button {
      @apply min-h-[44px];
    }
  }
  
  /* Mobile Landscape Adjustments */
  @media (max-height: 480px) and (orientation: landscape) {
    .dashboard-sidebar {
      @apply h-screen overflow-y-auto;
    }
  
    .content-wrapper {
      @apply py-2;
    }
  }
  
  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    .dark-mode-support {
      @apply bg-gray-900 text-white;
    }
  }
  
  /* Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* High Contrast Mode */
  @media (prefers-contrast: more) {
    .high-contrast {
      @apply border-2 border-current;
    }
  }
  
  /* Print Styles */
  @media print {
    .no-print {
      display: none !important;
    }
  }
```

### src/App.jsx

```jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoleProvider } from './contexts/RoleContext';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <AnimatedBackground />
      </RoleProvider>
    </BrowserRouter>
  );
}

export default App;

```

### src/assets/react.svg

*(Unsupported file type)*

### src/components/AnimatedBackground.jsx

```jsx
import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import RoleSelector from './common/RoleSelector';
import { Bot, X, Menu, Bell, Search, MessageSquare, Maximize2, Minimize2, Send, ChevronRight, ChevronDown } from 'lucide-react';
import AIChatAssistant from './features/linkGenerator/AIChatAssistant';
import ChatHistoryDropdown from './features/linkGenerator/ChatHistoryDropdown';

// Create a context for the chat assistant
export const ChatContext = createContext(null);

export const useChatAssistant = () => {
    return useContext(ChatContext);
};

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
    
    const location = useLocation();
    const sidebarRef = useRef(null);
    const searchRef = useRef(null);
    const notificationsRef = useRef(null);
    const chatRef = useRef(null);
    const showHelpRef = useRef(showHelp);

    // Load the most recent chat for persistence
    useEffect(() => {
        const lastChatCompany = localStorage.getItem('lastChatCompany');
        if (lastChatCompany) {
            setCurrentCompany(lastChatCompany);
            const storedMessages = localStorage.getItem(`chatHistory_${lastChatCompany}`);
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            }
        }
    }, []);

    // Persist notifications
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Persist chat company list
    useEffect(() => {
        localStorage.setItem('chatCompanyList', JSON.stringify(chatCompanyList));
    }, [chatCompanyList]);

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
    const openChat = (company = null, domain = null, context = null) => {
        // If company is provided, set as current and add to history
        if (company) {
            setCurrentCompany(company);
            setCurrentDomain(domain || null);
            localStorage.setItem('lastChatCompany', company);
            
            // Update company list for history
            const currentTimestamp = new Date().toISOString();
            const existingCompanyIndex = chatCompanyList.findIndex(item => item.company === company);
            
            if (existingCompanyIndex >= 0) {
                // Update existing company entry
                const updatedList = [...chatCompanyList];
                updatedList[existingCompanyIndex] = {
                    ...updatedList[existingCompanyIndex],
                    lastChat: currentTimestamp,
                    domain: domain || updatedList[existingCompanyIndex].domain
                };
                setChatCompanyList(updatedList);
            } else {
                // Add new company entry
                setChatCompanyList([
                    {
                        company,
                        domain: domain || null,
                        lastChat: currentTimestamp
                    },
                    ...chatCompanyList
                ]);
            }
            
            // Load previous chat history for this company if it exists
            const storedMessages = localStorage.getItem(`chatHistory_${company}`);
            if (storedMessages) {
                setMessages(JSON.parse(storedMessages));
            } else {
                // Initialize with welcome message if no history
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
        // Remove the chat history from localStorage
        localStorage.removeItem(`chatHistory_${company}`);
        
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
        
        // Save as a new conversation if company provided
        if (company) {
            localStorage.setItem(`chatHistory_${company}`, JSON.stringify(newMessage));
        }
        
        setShowChatHistory(false);
        setShowChatSuggestions(true);
    };
    
    const updateChatMessages = (newMessages) => {
        setMessages(newMessages);
        if (currentCompany) {
            localStorage.setItem(`chatHistory_${currentCompany}`, JSON.stringify(newMessages));
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
        </ChatContext.Provider>
    );
};

export default AnimatedBackground;
```

### src/components/BucketSelector.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const determineBucket = (devTeamSize, securityTeamSize) => {
  if (!devTeamSize || !securityTeamSize) return '';
  
  if (devTeamSize >= 10000 && securityTeamSize >= 3000) return 'TECH_GIANT';
  if (devTeamSize >= 5000 && securityTeamSize >= 1500) return 'MAJOR_ENTERPRISE';
  if (devTeamSize >= 2000 && securityTeamSize >= 600) return 'LARGE_ENTERPRISE';
  if (devTeamSize >= 1000 && securityTeamSize >= 300) return 'ENTERPRISE';
  if (devTeamSize >= 500 && securityTeamSize >= 150) return 'GROWTH_PLUS';
  if (devTeamSize >= 200 && securityTeamSize >= 60) return 'GROWTH';
  if (devTeamSize >= 100 && securityTeamSize >= 30) return 'LATE_STARTUP';
  if (devTeamSize >= 50 && securityTeamSize >= 15) return 'MID_STARTUP';
  if (devTeamSize >= 20 && securityTeamSize >= 6) return 'EARLY_STARTUP';
  return 'PRE_SEED';
};

const BucketSelector = ({ selectedBucket, onChange }) => {
  const [devTeamSize, setDevTeamSize] = useState('');
  const [securityTeamSize, setSecurityTeamSize] = useState('');

  const buckets = [
    { 
      value: 'TECH_GIANT', 
      label: 'Tech Giant (10000+ devs, 3000+ security)', 
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    { 
      value: 'MAJOR_ENTERPRISE', 
      label: 'Major Enterprise (5000+ devs, 1500+ security)', 
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    { 
      value: 'LARGE_ENTERPRISE', 
      label: 'Large Enterprise (2000+ devs, 600+ security)', 
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      value: 'ENTERPRISE', 
      label: 'Enterprise (1000+ devs, 300+ security)', 
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      value: 'GROWTH_PLUS', 
      label: 'Growth Plus (500+ devs, 150+ security)', 
      color: 'bg-green-600 hover:bg-green-700'
    },
    { 
      value: 'GROWTH', 
      label: 'Growth (200+ devs, 60+ security)', 
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      value: 'LATE_STARTUP', 
      label: 'Late Startup (100+ devs, 30+ security)', 
      color: 'bg-teal-500 hover:bg-teal-600'
    },
    { 
      value: 'MID_STARTUP', 
      label: 'Mid Startup (50+ devs, 15+ security)', 
      color: 'bg-cyan-500 hover:bg-cyan-600'
    },
    { 
      value: 'EARLY_STARTUP', 
      label: 'Early Startup (20+ devs, 6+ security)', 
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    { 
      value: 'PRE_SEED', 
      label: 'Pre-Seed (<20 devs, <6 security)', 
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  useEffect(() => {
    const determinedBucket = determineBucket(Number(devTeamSize), Number(securityTeamSize));
    if (determinedBucket) {
      onChange(determinedBucket);
    }
  }, [devTeamSize, securityTeamSize, onChange]);

  const getBucketDescription = (bucket) => {
    const found = buckets.find(b => b.value === bucket);
    return found ? found.label : '';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            Development Team Size
          </label>
          <input
            type="number"
            value={devTeamSize}
            onChange={(e) => setDevTeamSize(e.target.value)}
            className="w-full p-3 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            placeholder="Enter number"
            min="0"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-blue-900">
            Security Team Size
          </label>
          <input
            type="number"
            value={securityTeamSize}
            onChange={(e) => setSecurityTeamSize(e.target.value)}
            className="w-full p-3 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            placeholder="Enter number"
            min="0"
          />
        </div>
      </div>

      {selectedBucket && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm bg-blue-50 p-3 rounded-lg"
        >
          <span className="font-medium text-blue-900">Selected Bucket: </span>
          <span className={`px-3 py-1 rounded-md text-white ${buckets.find(b => b.value === selectedBucket)?.color}`}>
            {getBucketDescription(selectedBucket)}
          </span>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {buckets.map((bucket) => (
          <motion.button
            key={bucket.value}
            onClick={() => onChange(bucket.value)}
            className={`p-3 rounded-xl text-left transition-all ${bucket.color} ${
              selectedBucket === bucket.value 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : 'opacity-90 hover:opacity-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-white">{bucket.label.split('(')[0]}</div>
            <div className="text-xs text-white/80 mt-1">
              {bucket.label.match(/\(([^)]+)\)/)[1]}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export const formatSearchDataForExport = (generatedLinks) => {
  const formattedData = [];
  
  generatedLinks.forEach(company => {
    const baseRow = {
      'Company Name': company.company,
      'Selected Domain': company.selectedDomain || '',
      'Bucket': company.bucket || '',
    };
    
    Object.entries(company.links).forEach(([type, linkInfo]) => {
      baseRow[`${linkInfo.title} Link`] = linkInfo.link;
      baseRow[`${linkInfo.title} Description`] = linkInfo.description;
    });
    
    formattedData.push(baseRow);
  });
  
  return formattedData;
};

export default BucketSelector;
```

### src/components/common/RoleSelector.jsx

```jsx
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
```

### src/components/exportDropdown.jsx

```jsx
import React, { useState } from 'react';
import { FileDown, HistoryIcon, ChevronDown } from 'lucide-react';
import { exportSearchResults, exportHistory } from './exportUtils';
import { motion, AnimatePresence } from 'framer-motion';

const ExportDropdown = ({ history, generatedLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (type) => {
    if (type === 'current') {
      exportSearchResults(generatedLinks);
    } else if (type === 'history') {
      exportHistory(history);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors shadow-sm hover:shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FileDown className="w-5 h-5" />
        Export
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-10 border border-blue-50 overflow-hidden"
          >
            {generatedLinks?.length > 0 && (
              <button
                onClick={() => handleExport('current')}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 flex items-center gap-3 transition-colors duration-150"
              >
                <FileDown className="w-5 h-5 text-blue-500 min-w-[20px]" />
                <span className="truncate">Current Results</span>
              </button>
            )}
            {history?.length > 0 && (
              <button
                onClick={() => handleExport('history')}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 flex items-center gap-3 transition-colors duration-150"
              >
                <HistoryIcon className="w-5 h-5 text-blue-500 min-w-[20px]" />
                <span className="truncate">Search History</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportDropdown;
```

### src/components/exportUtils.js

```js
import Papa from 'papaparse';

const formatSearchDataForExport = (generatedLinks) => {
  const formattedData = [];
  
  generatedLinks.forEach(company => {
    // Add basic company info
    const baseRow = {
      'Company Name': company.company,
      'Selected Domain': company.selectedDomain || '',
      'Bucket': company.bucket || '', // Added bucket to export
    };
    
    // Add all link types
    Object.entries(company.links).forEach(([type, linkInfo]) => {
      baseRow[`${linkInfo.title} Link`] = linkInfo.link;
      baseRow[`${linkInfo.title} Description`] = linkInfo.description;
    });
    
    formattedData.push(baseRow);
  });
  
  return formattedData;
};

const exportToCSV = (data, filename = 'search_results.csv') => {
  const csv = Papa.unparse(data, {
    quotes: true,
    skipEmptyLines: true,
    delimiter: ',',
  });
  
  const csvContent = '\ufeff' + csv; // Add BOM for Excel UTF-8 compatibility
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  try {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const exportSearchResults = (generatedLinks) => {
  const formattedData = formatSearchDataForExport(generatedLinks);
  exportToCSV(formattedData);
};

export const exportHistory = (history) => {
  const formattedData = history.map(item => ({
    Company: item.company,
    'Search Date': new Date(item.timestamp).toLocaleString(),
    'Search ID': item.id
  }));
  exportToCSV(formattedData, 'search_history.csv');
};
```

### src/components/features/linkGenerator/AIChatAssistant.jsx

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Send, Maximize2, Minimize2, Loader2, Settings, Check, Trash2, History, PlusCircle } from 'lucide-react';
import { useChatAssistant } from '../../AnimatedBackground';

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

// Professional level settings
const PROFESSIONALISM_LEVELS = {
    HIGH: 'HIGH_PROFESSIONALISM',
    BALANCED: 'BALANCED_APPROACH',
    CREATIVE: 'CREATIVE_MODE'
};

const PROFESSIONALISM_LABELS = {
    [PROFESSIONALISM_LEVELS.HIGH]: 'Professional Mode',
    [PROFESSIONALISM_LEVELS.BALANCED]: 'Balanced Mode',
    [PROFESSIONALISM_LEVELS.CREATIVE]: 'Creative Mode'
};

const AIChatAssistant = ({ 
    isFullscreen, 
    toggleFullscreen, 
    onClose, 
    company, 
    domain, 
    messages, 
    updateMessages,
    showSuggestions,
    setShowSuggestions
}) => {
    const { 
        deleteConversation, 
        startNewConversation,
        toggleChatHistory,
        showHistory
    } = useChatAssistant();
    const [currentMessage, setCurrentMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [newChatCompany, setNewChatCompany] = useState('');
    const [newChatDomain, setNewChatDomain] = useState('');
    const [professionalismLevel, setProfessionalismLevel] = useState(PROFESSIONALISM_LEVELS.BALANCED);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const loadingTimerRef = useRef(null);
    
    // Auto focus the input when chat opens
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Cleanup loading timer if component unmounts
    useEffect(() => {
        return () => {
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
        };
    }, []);

    const generateThinkingMessage = () => {
        return thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
    };

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

        const updatedMessages = [...messages, userMessage];
        updateMessages(updatedMessages);
        setCurrentMessage('');

        try {
            const response = await fetch('/.netlify/functions/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: updatedMessages,
                    company: company || 'unknown',
                    domain: domain || 'unknown',
                    professionalismLevel: professionalismLevel
                })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            const aiResponse = `${data.content}\n\n_— Kei @ LinkForge_`;

            updateMessages([...updatedMessages, {
                id: Date.now() + 1,
                type: 'ai',
                content: aiResponse,
            }]);

        } catch (error) {
            console.error("Chat error:", error);
            updateMessages([...updatedMessages, {
                id: Date.now() + 1,
                type: 'ai',
                content: "⚠️ Hmm, I'm having trouble connecting to my servers. Please try again later!",
                isError: true
            }]);
        } finally {
            // Ensure loading state is properly reset
            setIsLoading(false);
            // Clear any existing timer
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleTextareaChange = (e) => {
        setCurrentMessage(e.target.value);
        
        // Auto-resize the textarea based on content
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`;
    };

    const handleDeleteChat = () => {
        if (company) {
            deleteConversation(company);
            setShowDeleteConfirm(false);
        }
    };
    
    const handleCreateNewChat = () => {
        if (newChatCompany.trim()) {
            startNewConversation(newChatCompany.trim(), newChatDomain.trim() || null);
            setNewChatCompany('');
            setNewChatDomain('');
            setShowNewChatModal(false);
        } else {
            startNewConversation();
            setShowNewChatModal(false);
        }
    };

    const getProfileModeColor = () => {
        switch(professionalismLevel) {
            case PROFESSIONALISM_LEVELS.HIGH:
                return 'bg-blue-700';
            case PROFESSIONALISM_LEVELS.BALANCED:
                return 'bg-blue-500';
            case PROFESSIONALISM_LEVELS.CREATIVE:
                return 'bg-indigo-500';
            default:
                return 'bg-blue-500';
        }
    };

    // Chat suggestions based on common business inquiries
    const renderSuggestions = () => {
        if (!showSuggestions || messages.length > 1) return null;
        
        const suggestions = [
            "Can you analyze this company's market position?",
            "What outreach strategy would you recommend?",
            "Is this domain name effective for my business?",
            "What technologies might this company be using?",
            "How can I improve my LinkedIn prospecting?"
        ];
        
        return (
            <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentMessage(suggestion);
                                setShowSuggestions(false);
                                // Auto-focus and resize input
                                if (inputRef.current) {
                                    inputRef.current.focus();
                                    inputRef.current.style.height = 'auto';
                                    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 128)}px`;
                                }
                            }}
                            className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <motion.div 
            layout
            className={`flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-2xl overflow-hidden border border-blue-200 ${
                isFullscreen ? 'w-full h-full' : 'w-full h-full'
            }`}
            initial={false}
        >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-colors ${
                professionalismLevel === PROFESSIONALISM_LEVELS.HIGH ? 'from-blue-700 to-blue-800' :
                professionalismLevel === PROFESSIONALISM_LEVELS.CREATIVE ? 'from-indigo-500 to-purple-600' :
                'from-blue-600 to-blue-700'
            }`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl">
                        🦊
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Kei</h3>
                        <p className="text-xs text-blue-100">
                            {company ? `Analyzing ${company}` : 'LinkForge AI Assistant'}
                            {professionalismLevel !== PROFESSIONALISM_LEVELS.BALANCED && 
                                ` · ${PROFESSIONALISM_LABELS[professionalismLevel]}`
                            }
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    {/* New Chat Button */}
                    <button 
                        onClick={() => setShowNewChatModal(true)}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                        aria-label="New chat"
                        title="New chat"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                    
                    {/* History Button */}
                    <button 
                        onClick={toggleChatHistory}
                        className={`p-2 hover:bg-blue-500 rounded-lg transition-colors ${showHistory ? 'bg-blue-500' : ''}`}
                        aria-label="Chat history"
                        title="Chat history"
                    >
                        <History className="w-5 h-5" />
                    </button>
                    
                    {/* Delete Button */}
                    <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                        aria-label="Delete conversation"
                        title="Delete conversation"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors relative"
                        aria-label="Settings"
                    >
                        <Settings className="w-5 h-5" />
                        {professionalismLevel !== PROFESSIONALISM_LEVELS.BALANCED && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400"></span>
                        )}
                    </button>
                    <button 
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                        aria-label={isFullscreen ? "Minimize" : "Maximize"}
                    >
                        {isFullscreen ? (
                            <Minimize2 className="w-5 h-5" />
                        ) : (
                            <Maximize2 className="w-5 h-5" />
                        )}
                    </button>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                        aria-label="Close chat"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-blue-200 bg-white overflow-hidden"
                    >
                        <div className="p-4">
                            <h4 className="font-medium text-blue-900 mb-3">Assistant Mode</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.values(PROFESSIONALISM_LEVELS).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setProfessionalismLevel(level)}
                                        className={`p-3 rounded-lg flex flex-col items-center gap-2 text-sm transition-all ${
                                            professionalismLevel === level
                                                ? `${level === PROFESSIONALISM_LEVELS.HIGH 
                                                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-700' 
                                                    : level === PROFESSIONALISM_LEVELS.CREATIVE
                                                        ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500'
                                                        : 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                                                }`
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                            level === PROFESSIONALISM_LEVELS.HIGH 
                                                ? 'bg-blue-700 text-white' 
                                                : level === PROFESSIONALISM_LEVELS.CREATIVE
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-blue-500 text-white'
                                        }`}>
                                            {professionalismLevel === level ? (
                                                <Check className="w-4 h-4" />
                                            ) : level === PROFESSIONALISM_LEVELS.HIGH ? (
                                                "P"
                                            ) : level === PROFESSIONALISM_LEVELS.BALANCED ? (
                                                "B"
                                            ) : (
                                                "C"
                                            )}
                                        </div>
                                        <span className="text-center">
                                            {PROFESSIONALISM_LABELS[level]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-gray-500">
                                {professionalismLevel === PROFESSIONALISM_LEVELS.HIGH 
                                    ? "Professional mode focuses on business analysis with minimal playfulness." 
                                    : professionalismLevel === PROFESSIONALISM_LEVELS.CREATIVE
                                        ? "Creative mode encourages innovative thinking with maximum playfulness."
                                        : "Balanced mode provides helpful insights with moderate enthusiasm."
                                }
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Delete Confirmation Dialog */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-red-200 bg-red-50 overflow-hidden"
                    >
                        <div className="p-4">
                            <h4 className="font-medium text-red-700 mb-2">Delete this conversation?</h4>
                            <p className="text-sm text-red-600 mb-4">
                                This action cannot be undone. All messages with {company || 'Kei'} will be permanently deleted.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteChat}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
                                >
                                    Delete Conversation
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* New Chat Modal */}
            <AnimatePresence>
                {showNewChatModal && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-b border-blue-200 bg-white overflow-hidden"
                    >
                        <div className="p-4">
                            <h4 className="font-medium text-blue-900 mb-3">Start a New Conversation</h4>
                            <div className="space-y-3 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Company Name (optional)</label>
                                    <input
                                        type="text"
                                        value={newChatCompany}
                                        onChange={(e) => setNewChatCompany(e.target.value)}
                                        placeholder="e.g. Microsoft"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Domain (optional)</label>
                                    <input
                                        type="text"
                                        value={newChatDomain}
                                        onChange={(e) => setNewChatDomain(e.target.value)}
                                        placeholder="e.g. microsoft.com"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowNewChatModal(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateNewChat}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                                >
                                    Start New Chat
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                                flex items-start gap-3 max-w-[85%] 
                                ${message.type === 'user' ? 'flex-row-reverse' : ''}
                            `}>
                                {message.type === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-lg mt-1">
                                        🦊
                                    </div>
                                )}
                                
                                {message.type === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center mt-1">
                                        <User className="w-4 h-4 text-gray-600" />
                                    </div>
                                )}
                                
                                <div className={`
                                    py-3 px-4 rounded-2xl break-words ${message.isError ? 'bg-red-100 text-red-700' : 
                                    message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow-sm border border-gray-100'}
                                `}>
                                    <div className="whitespace-pre-wrap">
                                        {message.content.split(/(\*\*.*?\*\*|\*.*?\*|_.*?_)/g).map((part, index) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return (
                                                    <strong key={index} className={`font-semibold ${message.type === 'user' ? 'text-blue-100' : 'text-blue-700'}`}>
                                                        {part.slice(2, -2)}
                                                    </strong>
                                                );
                                            } else if (part.startsWith('*') && part.endsWith('*')) {
                                                return (
                                                    <strong key={index} className={`font-semibold ${message.type === 'user' ? 'text-blue-100' : 'text-blue-700'}`}>
                                                        {part.slice(1, -1)}
                                                    </strong>
                                                );
                                            } else if (part.startsWith('_') && part.endsWith('_')) {
                                                return (
                                                    <em key={index} className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                                                        {part.slice(1, -1)}
                                                    </em>
                                                );
                                            } else {
                                                return <span key={index}>{part}</span>;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {/* Loading Animation - Fixed with separate AnimatePresence */}
                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div
                            key="loading-animation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-start gap-3"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-lg mt-1">
                                🦊
                            </div>
                            <div className="py-3 px-4 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-[85%]">
                                <div className="flex items-center gap-2">
                                    <div className="flex space-x-1">
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.25 }}
                                            className="w-2 h-2 bg-blue-600 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                                            className="w-2 h-2 bg-blue-400 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.75 }}
                                            className="w-2 h-2 bg-blue-300 rounded-full"
                                        />
                                    </div>
                                    <span className="text-gray-500 text-sm">{generateThinkingMessage()}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Suggestions */}
                {renderSuggestions()}
                
                <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-blue-200 bg-white">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={currentMessage}
                        onChange={handleTextareaChange}
                        onKeyDown={handleKeyDown}
                        placeholder={`Ask Kei about ${company || 'anything'}...`}
                        className="flex-1 resize-none p-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[56px] max-h-32"
                        rows={1}
                    />
                    
                    <motion.button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isLoading}
                        className={`p-3 rounded-xl ${
                            currentMessage.trim() && !isLoading
                                ? `${getProfileModeColor()} hover:bg-opacity-90`
                                : 'bg-gray-300 cursor-not-allowed'
                        } text-white flex-shrink-0 shadow-sm`}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default AIChatAssistant;
```

### src/components/features/linkGenerator/BulkLinkGenerator.jsx

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompanyInput from './CompanyInput';
import GeneratedLinkCard from './GeneratedLinkCard';
import SearchHistorySection from './SearchHistorySection';
import RoleSelector from '../../../components/common/RoleSelector';
import { useRole } from '../../../contexts/RoleContext';
import { generateLinks as generateSalesLinks } from '../../../utils/linkUtils/sales';
import { generateLinks as generateRecruiterLinks } from '../../../utils/linkUtils/recruiter';
import { generateLinks as generateJobSeekerLinks } from '../../../utils/linkUtils/jobseeker';
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import OpenAllLinksButton from './OpenAllLinksButton';

const PRIORITY_DOMAINS = ['.com', '.fr', '.es', '.it'];
const SECONDARY_DOMAINS = [
    '.eu', '.co.uk', '.de', '.pt', '.nl', '.be', '.ch', '.at', '.dk', '.ie', '.no', '.se', '.fi',
    '.pl', '.cz', '.sk', '.hu', '.ro', '.bg', '.hr', '.si', '.ee', '.lv', '.lt',
    '.gr', '.mt', '.cy', '.il', '.ae', '.sa', '.qa', '.bh', '.kw', '.om',
    '.za', '.eg', '.ma', '.ng', '.ke', '.tz', '.io', '.ai', '.tech', '.co'
];

const BulkLinkGenerator = ({ updateMetrics, setNotifications }) => {
    const [generatedLinks, setGeneratedLinks] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const { currentRole, roleConfig } = useRole();
    const [showBucketSelector, setShowBucketSelector] = useState(true);
    const [loading, setLoading] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', checkMobile);
        checkMobile();
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load search history
    useEffect(() => {
        const savedHistory = localStorage.getItem(`searchHistory_${currentRole}`);
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }, [currentRole]);

    const getRoleSpecificLinks = (company, domain) => {
        switch (currentRole) {
            case 'sales':
                return generateSalesLinks(company, domain);
            case 'recruiter':
                return generateRecruiterLinks(company, domain);
            case 'jobseeker':
                return generateJobSeekerLinks(company, domain);
            default:
                return generateSalesLinks(company, domain);
        }
    };

    const handleGenerateLinks = async (companies) => {
        setLoading(true);
        
        try {
            const newLinks = companies.map((company) => ({
                id: Date.now() + Math.random(),
                company,
                priorityDomains: PRIORITY_DOMAINS,
                secondaryDomains: SECONDARY_DOMAINS,
                selectedDomain: null,
                links: getRoleSpecificLinks(company, PRIORITY_DOMAINS[0]),
                role: currentRole
            }));

            setGeneratedLinks(newLinks);
            saveToHistory(companies, newLinks);
            
            if (updateMetrics) {
                updateMetrics();
            }

            // Scroll to results with smooth behavior
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start'
                });
            }

            // Add notification
            setNotifications(prev => [...prev, {
                id: Date.now() + Math.random(),
                message: `Generated links for ${companies.length} company${companies.length > 1 ? 'ies' : 'y'}.`,
                read: false,
            }]);

        } catch (error) {
            console.error('Error generating links:', error);
            setNotifications(prev => [...prev, {
                id: Date.now() + Math.random(),
                message: 'Error generating links. Please try again.',
                read: false,
                error: true
            }]);
        } finally {
            setLoading(false);
        }
    };

    const saveToHistory = (companies, newLinks) => {
        const timestamp = new Date().toISOString();
        const newSearches = companies.map((company) => ({
            id: Date.now() + Math.random(),
            company,
            timestamp,
            role: currentRole
        }));

        // Keep only unique companies, limit to 50 most recent
        const combinedHistory = [...newSearches, ...searchHistory];
        const uniqueHistory = Array.from(
            new Map(combinedHistory.map((item) => [item.company, item])).values()
        ).slice(0, 50);

        setSearchHistory(uniqueHistory);
        localStorage.setItem(`searchHistory_${currentRole}`, JSON.stringify(uniqueHistory));

        // Save generated links
        const storedLinks = localStorage.getItem(`generatedLinks_${currentRole}`);
        const links = storedLinks ? JSON.parse(storedLinks) : [];
        localStorage.setItem(`generatedLinks_${currentRole}`, JSON.stringify([...links, ...newLinks]));
    };

    const toggleBucketSelector = () => {
        setShowBucketSelector(!showBucketSelector);
    };

    return (
        <div className="min-h-screen py-6 md:py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-2">
                        {roleConfig.title} Link Generator
                    </h1>
                    <p className="text-base md:text-lg text-blue-200 mb-4">
                        {roleConfig.description}
                    </p>
                    <button
                        onClick={toggleBucketSelector}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/80 
                                 text-white rounded-lg hover:bg-blue-700 transition-colors 
                                 shadow-sm backdrop-blur-sm touch-manipulation"
                    >
                        {showBucketSelector ? 'Hide' : 'Show'} Bucket Selector
                        {showBucketSelector ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>
                </div>

                {/* Role Selector */}
                <RoleSelector />

                {/* Main Content Card */}
                <div className="bg-white/80 rounded-2xl shadow-xl p-4 md:p-8 backdrop-blur-lg">
                    <CompanyInput onSubmit={handleGenerateLinks} />

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center gap-3 mt-8">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                            <span className="text-gray-600">Generating links...</span>
                        </div>
                    )}

                    {/* Generated Links */}
                    <div ref={scrollRef}>
                        <AnimatePresence mode="wait">
                            {generatedLinks.length > 0 && (
                                <motion.div
                                className="mt-8 md:mt-12 space-y-6 md:space-y-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                {/* Open All Links Buttons */}
                                <div className="mb-4 flex flex-wrap gap-2">
                                    <OpenAllLinksButton 
                                        generatedLinks={generatedLinks.filter(linkData => linkData.role === currentRole)} 
                                        linkType="dev" 
                                        label="Dev Search" 
                                    />
                                    <OpenAllLinksButton 
                                        generatedLinks={generatedLinks.filter(linkData => linkData.role === currentRole)} 
                                        linkType="securityIAM" 
                                        label="Security/IAM" 
                                    />
                                    <OpenAllLinksButton 
                                        generatedLinks={generatedLinks.filter(linkData => linkData.role === currentRole)} 
                                        linkType="finance" 
                                        label="Finance" 
                                    />
                                </div>
                                
                                {/* Individual Link Cards */}
                                {generatedLinks
                                    .filter(linkData => linkData.role === currentRole)
                                    .map((linkData) => (
                                        <GeneratedLinkCard
                                            key={linkData.id}
                                            linkData={linkData}
                                            onUpdateLink={(updatedLink) => {
                                                setGeneratedLinks(prev =>
                                                    prev.map(link => 
                                                        link.id === updatedLink.id ? updatedLink : link
                                                    )
                                                );
                                            }}
                                            showBucketSelector={showBucketSelector}
                                            isExpanded={expandedCard === linkData.id}
                                            onToggleExpand={() => {
                                                setExpandedCard(
                                                    expandedCard === linkData.id ? null : linkData.id
                                                );
                                            }}
                                            isMobile={isMobile}
                                        />
                                    ))}
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Search History */}
                    <SearchHistorySection
                        searchHistory={searchHistory}
                        onClearHistory={() => {
                            setSearchHistory([]);
                            localStorage.removeItem(`searchHistory_${currentRole}`);
                            localStorage.removeItem(`generatedLinks_${currentRole}`);
                            if (updateMetrics) {
                                updateMetrics();
                            }
                        }}
                        onSearchAgain={(company) => {
                            handleGenerateLinks([company]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BulkLinkGenerator;
```

### src/components/features/linkGenerator/ChatHistoryDropdown.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, PlusCircle, Calendar, MessageSquare } from 'lucide-react';

const ChatHistoryDropdown = ({ 
    chatHistory, 
    onSelectChat, 
    onDeleteChat, 
    onNewChat,
    currentCompany,
    isFullscreen = false
}) => {
    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        
        const date = new Date(timestamp);
        
        // If today, show time
        const isToday = new Date().toDateString() === date.toDateString();
        
        if (isToday) {
            return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        // If within the last week, show day of week
        const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        if (daysAgo < 7) {
            return `${date.toLocaleDateString([], { weekday: 'long' })} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        // Otherwise show date
        return date.toLocaleDateString([], { 
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
                bg-white rounded-xl shadow-xl overflow-y-auto
                ${isFullscreen 
                    ? 'absolute top-16 right-4 z-50 w-80 max-h-[calc(100vh-8rem)]' 
                    : 'absolute right-0 bottom-full mb-2 w-80 max-h-96'}
            `}
        >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Chat History</h3>
                </div>
                <button
                    onClick={() => onNewChat()}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 flex items-center gap-1 text-sm font-medium"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Chat</span>
                </button>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {chatHistory.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <MessageSquare className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <p>No previous conversations found</p>
                    </div>
                ) : (
                    chatHistory.map((item) => (
                        <div 
                            key={`${item.company}-${item.lastChat}`}
                            className={`p-4 hover:bg-gray-50 cursor-pointer flex items-start justify-between gap-2 transition-colors
                                ${currentCompany === item.company ? 'bg-blue-50' : ''}
                            `}
                        >
                            <div 
                                className="flex-1 min-w-0"
                                onClick={() => onSelectChat(item.company, item.domain)}
                            >
                                <p className="font-medium text-blue-900 truncate">{item.company}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1 gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span className="truncate">{formatDate(item.lastChat)}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => onDeleteChat(item.company)}
                                className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"
                                title="Delete conversation"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
            
            <div className="p-3 bg-gray-50 text-xs text-center text-gray-500">
                Chat history is stored locally on your device
            </div>
        </motion.div>
    );
};

export default ChatHistoryDropdown;
```

### src/components/features/linkGenerator/CompanyInput.jsx

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

const CompanyInput = ({ onSubmit }) => {
  const [companyInput, setCompanyInput] = useState('');
  const [companyCount, setCompanyCount] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setCompanyCount(companyInput.split('\n').filter(c => c.trim()).length);
    }
  }, [companyInput]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const companies = companyInput
          .split('\n')
          .map((company) => company.trim())
          .filter((company) => company.length > 0);

      if (companies.length > 0) {
        onSubmit(companies);
      }
  };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-lg font-semibold text-blue-900">
                        Enter Company Names
                    </label>
                    <span className="text-sm text-blue-500">
                        {companyCount} companies entered
                    </span>
                </div>
                <p className="text-sm text-blue-600 mb-3">Add one company per line</p>
                <textarea
                    ref={textareaRef}
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    placeholder="CyberAgent, Inc.
TechCorp LLC
SecureNet Systems"
                    className="w-full p-4 border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none overflow-hidden"
                    required
                    rows={3}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                    Generate Links
                </button>
            </div>
        </form>
    );
};

export default CompanyInput;
```

### src/components/features/linkGenerator/DomainCheckerModal.jsx

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertCircle, X, Copy, CheckCheck, Loader2, Globe } from 'lucide-react';

const DomainCheckerModal = ({ company, isOpen, onClose }) => {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [copied, setCopied] = useState(false);
  const [openingDomains, setOpeningDomains] = useState(false);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [openDelay, setOpenDelay] = useState(2); // Default 2 seconds delay
  const modalRef = useRef(null);

  // Common TLDs to check
  const commonTLDs = [
    '.com', '.fr', '.io', '.ai', '.net', '.org', '.co', 
    '.eu', '.co.uk', '.de', '.es', '.it', '.tech', '.app'
  ];
  
  // When modal is shown, generate domain list and make sure it's visible
  useEffect(() => {
    if (isOpen && modalRef.current) {
      generateDomainList();
      
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        modalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isOpen, company]);

  const generateDomainList = () => {
    if (!company) return;
    
    // Clean company name for domain use
    const cleanCompanyName = company
      .toLowerCase()
      .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
    
    // Generate Google search URLs for each TLD
    const domains = commonTLDs.map(tld => {
      const domainName = `${cleanCompanyName}${tld}`;
      return {
        domain: domainName,
        link: `https://www.google.com/search?q=site%3A${domainName}`,
        opened: false
      };
    });
    
    setSelectedDomains(domains);
    setCurrentDomainIndex(0);
    setOpeningDomains(false);
  };

  const handleCopyAllDomains = () => {
    const textToCopy = selectedDomains.map(item => 
      `${item.domain}: ${item.link}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy domains: ', err);
      });
  };

  // This function opens a single domain search
  const handleOpenSingle = (url, index) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Mark this domain as opened
    if (index !== undefined) {
      const updatedDomains = [...selectedDomains];
      updatedDomains[index] = { ...updatedDomains[index], opened: true };
      setSelectedDomains(updatedDomains);
    }
  };

  // Rate-limited domain opening process
  const startRateLimitedOpening = () => {
    setOpeningDomains(true);
    setCurrentDomainIndex(0);
    
    // Reset all domains to "unopened" state
    const resetDomains = selectedDomains.map(domain => ({
      ...domain,
      opened: false
    }));
    setSelectedDomains(resetDomains);
    
    // Start the opening process for the first domain
    openNextDomain(0, resetDomains);
  };
  
  // Recursive function to open domains with delay
  const openNextDomain = (index, domains) => {
    if (index >= domains.length) {
      // All domains opened
      setOpeningDomains(false);
      return;
    }
    
    // Open current domain
    handleOpenSingle(domains[index].link, index);
    setCurrentDomainIndex(index);
    
    // Schedule next domain opening
    setTimeout(() => {
      openNextDomain(index + 1, domains);
    }, openDelay * 1000); // Convert seconds to milliseconds
  };

  // Calculate progress percentage
  const progressPercentage = openingDomains 
    ? Math.round((currentDomainIndex / selectedDomains.length) * 100)
    : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={() => !openingDomains && onClose()}
      >
        <motion.div
          ref={modalRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-xl p-4 w-full max-w-2xl max-h-[80vh] overflow-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-900">
              {`Domain Checker: ${company}`}
            </h3>
            {!openingDomains && (
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            {!openingDomains ? (
              <>
                <button
                  onClick={handleCopyAllDomains}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy All Links
                    </>
                  )}
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Open every</span>
                  <select 
                    value={openDelay}
                    onChange={(e) => setOpenDelay(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="0.5">0.5 second</option>
                    <option value="1">1 second</option>
                    <option value="2">2 seconds</option>
                    <option value="3">3 seconds</option>
                    <option value="5">5 seconds</option>
                  </select>
                </div>
                
                <button
                  onClick={startRateLimitedOpening}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Start Domain Search
                </button>
              </>
            ) : (
              <button
                onClick={() => setOpeningDomains(false)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Stop Opening
              </button>
            )}
          </div>

          {/* Progress Bar (only shown when opening domains) */}
          {openingDomains && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-700">
                  Checking domain {currentDomainIndex + 1} of {selectedDomains.length}
                </span>
                <span className="text-blue-700 font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-center mt-2">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              </div>
            </div>
          )}

          {/* Information Alert */}
          <div className="border-t border-gray-200 pt-3">
            <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg mb-4 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                {openingDomains 
                  ? `Opening one search every ${openDelay} seconds to avoid rate limiting. Please don't close this dialog.`
                  : "This will open Google searches for each domain variation to help you validate if they exist."
                }
              </p>
            </div>

            {/* Domain List */}
            <div className="space-y-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {selectedDomains.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    item.opened 
                      ? 'bg-green-50 border border-green-100' 
                      : index === currentDomainIndex && openingDomains
                        ? 'bg-blue-50 border border-blue-100'
                        : 'bg-gray-50'
                  }`}
                >
                  {item.opened && (
                    <CheckCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                  {!item.opened && index === currentDomainIndex && openingDomains && (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                  )}
                  {!item.opened && index !== currentDomainIndex && (
                    <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-blue-900 mb-1 truncate">{item.domain}</div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate block"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSingle(item.link, index);
                      }}
                    >
                      Google Search
                    </a>
                  </div>
                  <button
                    onClick={() => handleOpenSingle(item.link, index)}
                    className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex-shrink-0"
                    title="Open search"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DomainCheckerModal;
```

### src/components/features/linkGenerator/DomainList.jsx

```jsx
import React, { useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const DomainList = ({ 
  priorityDomains, 
  secondaryDomains, 
  selectedDomain,
  onDomainSelect,
  companyName 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderDomainButton = (domain) => (
    <div key={domain} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
      <a
        href={`https://${domain}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
      >
        {domain}
        <ExternalLink className="w-4 h-4" />
      </a>
      <button
        onClick={() => onDomainSelect(domain)}
        className={`ml-3 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          selectedDomain === domain
            ? 'bg-green-500 text-white'
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        }`}
      >
        {selectedDomain === domain ? 'Selected ✓' : 'Select'}
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-3 pb-4 border-b border-blue-200">
        {priorityDomains.map(renderDomainButton)}
        
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 w-full justify-center"
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
          {isExpanded ? 'Show Less' : `More Domains (${secondaryDomains.length})`}
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {secondaryDomains.map(renderDomainButton)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainList;
```

### src/components/features/linkGenerator/GeneratedLinkCard.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, ChevronDown, ChevronUp, MessageSquare, Globe } from 'lucide-react';
import DomainList from './DomainList';
import BucketSelector from '../../../components/BucketSelector';
import { generateLinks } from '../../../components/linkUtils';
import { useChatAssistant } from '../../AnimatedBackground';
import DomainCheckerModal from './DomainCheckerModal';

const GeneratedLinkCard = ({ 
    linkData, 
    onUpdateLink, 
    showBucketSelector, 
    isExpanded, 
    onToggleExpand,
    isMobile 
}) => {
    const [copiedStates, setCopiedStates] = useState({});
    const [selectedCompany, setSelectedCompany] = useState(linkData);
    const [showDomainChecker, setShowDomainChecker] = useState(false);
    
    // Use the global chat context instead of local state
    const { openChat } = useChatAssistant();

    const handleDomainSelect = (domain) => {
        const updatedLink = {
            ...selectedCompany,
            selectedDomain: domain,
            links: generateLinks(selectedCompany.company, domain)
        };
        setSelectedCompany(updatedLink);
        onUpdateLink(updatedLink);
    };

    const handleBucketSelect = (bucket) => {
        const updatedLink = {
            ...selectedCompany,
            bucket
        };
        setSelectedCompany(updatedLink);
        onUpdateLink(updatedLink);
    };

    const handleCopy = async (type, link, description) => {
        try {
            await navigator.clipboard.writeText(`${description}\n${link}`);
            setCopiedStates((prev) => ({ ...prev, [type]: true }));
            
            // Reset copy state after 2 seconds
            setTimeout(() => {
                setCopiedStates((prev) => ({ ...prev, [type]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    
    // Open the global chat assistant with context about this company
    const handleOpenChat = () => {
        openChat(
            selectedCompany.company, 
            selectedCompany.selectedDomain,
            { company: selectedCompany.company, domain: selectedCompany.selectedDomain }
        );
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-md overflow-hidden"
        >
            <div className="p-4 md:p-6">
                {/* Card Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-blue-900 break-words">
                            {selectedCompany.company}
                        </h3>
                        {selectedCompany.selectedDomain && (
                            <p className="text-sm text-blue-600 mt-1">
                                Selected Domain: {selectedCompany.selectedDomain}
                            </p>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {/* Check Domains Button */}
                        <motion.button
                            onClick={() => setShowDomainChecker(true)}
                            className="inline-flex items-center justify-center gap-2 p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Check domains for this company"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="text-sm font-medium">Check Domains</span>
                        </motion.button>
                        
                        {/* Ask AI Button */}
                        <motion.button
                            onClick={handleOpenChat}
                            className="inline-flex items-center justify-center gap-2 p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Ask Kei about this company"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm font-medium">Ask Kei</span>
                        </motion.button>
                        
                        {isMobile && (
                            <button
                                onClick={onToggleExpand}
                                className="inline-flex items-center justify-center p-2.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                aria-expanded={isExpanded}
                            >
                                {isExpanded ? (
                                    <span className="flex items-center gap-1">
                                        <ChevronUp className="w-4 h-4" />
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <ChevronDown className="w-4 h-4" />
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {(!isMobile || isExpanded) && (
                        <motion.div
                            initial={isMobile ? { height: 0, opacity: 0 } : false}
                            animate={isMobile ? { height: 'auto', opacity: 1 } : false}
                            exit={isMobile ? { height: 0, opacity: 0 } : false}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Bucket Selector */}
                            {showBucketSelector && (
                                <div className="mb-6">
                                    <BucketSelector
                                        selectedBucket={selectedCompany.bucket}
                                        onChange={handleBucketSelect}
                                    />
                                </div>
                            )}

                            {/* Domain List */}
                            <div className="mb-6">
                                <DomainList
                                    priorityDomains={selectedCompany.priorityDomains}
                                    secondaryDomains={selectedCompany.secondaryDomains}
                                    selectedDomain={selectedCompany.selectedDomain}
                                    onDomainSelect={handleDomainSelect}
                                    companyName={selectedCompany.company}
                                    isMobile={isMobile}
                                />
                            </div>

                            {/* Generated Links */}
                            <div className="space-y-4">
                                {Object.entries(selectedCompany.links).map(([type, linkInfo]) => (
                                    <div 
                                        key={type}
                                        className="flex flex-col md:flex-row items-start justify-between gap-4 p-4 bg-white rounded-lg shadow-sm"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-blue-900 mb-2">
                                                {linkInfo.title}
                                            </div>
                                            <a
                                                href={linkInfo.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 break-all"
                                            >
                                                <span className="truncate">
                                                    {isMobile ? linkInfo.link.substring(0, 40) + '...' : linkInfo.link}
                                                </span>
                                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                            </a>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {linkInfo.description}
                                            </p>
                                        </div>

                                        <motion.button
                                            onClick={() => handleCopy(type, linkInfo.link, linkInfo.description)}
                                            className={`
                                                inline-flex items-center justify-center gap-2 px-4 py-2 
                                                rounded-lg transition-all min-h-[44px] w-full md:w-auto
                                                ${copiedStates[type]
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                                } text-white shadow-sm hover:shadow-md
                                            `}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {copiedStates[type] ? (
                                                    <motion.span
                                                        key="check"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                        Copied!
                                                    </motion.span>
                                                ) : (
                                                    <motion.span
                                                        key="copy"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                        Copy Link
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Domain Checker Modal */}
            <DomainCheckerModal 
                company={selectedCompany.company}
                isOpen={showDomainChecker}
                onClose={() => setShowDomainChecker(false)}
            />
        </motion.div>
    );
};

export default GeneratedLinkCard;
```

### src/components/features/linkGenerator/OpenAllLinksButton.jsx

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, AlertCircle, X, Copy, CheckCheck, Loader2 } from 'lucide-react';

const OpenAllLinksButton = ({ generatedLinks, linkType, label }) => {
  const [showLinkList, setShowLinkList] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [openingLinks, setOpeningLinks] = useState(false);
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
  const [openDelay, setOpenDelay] = useState(3); // Default 3 seconds delay
  const modalRef = useRef(null);

  // Count how many links of this type exist across all companies
  const filteredLinks = generatedLinks.filter(company => 
    company.links && company.links[linkType]
  );
  
  const linkCount = filteredLinks.length;

  // No links of this type exist
  if (linkCount === 0) {
    return null;
  }

  // When modal is shown, make sure it's visible in the viewport
  useEffect(() => {
    if (showLinkList && modalRef.current) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        modalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [showLinkList]);

  const handleShowLinks = () => {
    // Collect all the links of the specified type
    const links = filteredLinks.map(company => ({
      company: company.company,
      link: company.links[linkType].link,
      description: company.links[linkType].description,
      opened: false // Track which links have been opened
    }));
    
    setSelectedLinks(links);
    setShowLinkList(true);
    setCurrentLinkIndex(0);
    setOpeningLinks(false);
  };

  const handleCopyAllLinks = () => {
    const textToCopy = selectedLinks.map(item => 
      `${item.company}: ${item.link}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy links: ', err);
      });
  };

  // This function opens a single link
  const handleOpenSingle = (url, index) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Mark this link as opened
    if (index !== undefined) {
      const updatedLinks = [...selectedLinks];
      updatedLinks[index] = { ...updatedLinks[index], opened: true };
      setSelectedLinks(updatedLinks);
    }
  };

  // Rate-limited link opening process
  const startRateLimitedOpening = () => {
    setOpeningLinks(true);
    setCurrentLinkIndex(0);
    
    // Reset all links to "unopened" state
    const resetLinks = selectedLinks.map(link => ({
      ...link,
      opened: false
    }));
    setSelectedLinks(resetLinks);
    
    // Start the opening process for the first link
    openNextLink(0, resetLinks);
  };
  
  // Recursive function to open links with delay
  const openNextLink = (index, links) => {
    if (index >= links.length) {
      // All links opened
      setOpeningLinks(false);
      return;
    }
    
    // Open current link
    handleOpenSingle(links[index].link, index);
    setCurrentLinkIndex(index);
    
    // Schedule next link opening
    setTimeout(() => {
      openNextLink(index + 1, links);
    }, openDelay * 1000); // Convert seconds to milliseconds
  };

  // Calculate progress percentage
  const progressPercentage = openingLinks 
    ? Math.round((currentLinkIndex / selectedLinks.length) * 100)
    : 0;

  return (
    <>
      <motion.button
        onClick={handleShowLinks}
        className="mb-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ExternalLink className="w-4 h-4" />
        {`Open All ${label} Links (${linkCount})`}
      </motion.button>

      <AnimatePresence>
        {showLinkList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => !openingLinks && setShowLinkList(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-xl p-4 w-full max-w-2xl max-h-[80vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-900">
                  {`${label} Links (${selectedLinks.length})`}
                </h3>
                {!openingLinks && (
                  <button 
                    onClick={() => setShowLinkList(false)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mb-4 flex flex-wrap gap-2">
                {!openingLinks ? (
                  <>
                    <button
                      onClick={handleCopyAllLinks}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy All Links
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Open every</span>
                      <select 
                        value={openDelay}
                        onChange={(e) => setOpenDelay(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="1">1 second</option>
                        <option value="2">2 seconds</option>
                        <option value="3">3 seconds</option>
                        <option value="5">5 seconds</option>
                        <option value="10">10 seconds</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={startRateLimitedOpening}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Start Opening Links
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setOpeningLinks(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Stop Opening
                  </button>
                )}
              </div>

              {/* Progress Bar (only shown when opening links) */}
              {openingLinks && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-blue-700">
                      Opening link {currentLinkIndex + 1} of {selectedLinks.length}
                    </span>
                    <span className="text-blue-700 font-medium">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                </div>
              )}

              {/* Information Alert */}
              <div className="border-t border-gray-200 pt-3">
                <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg mb-4 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    {openingLinks 
                      ? `Opening one link every ${openDelay} seconds to avoid rate limiting. Please don't close this dialog.`
                      : "Use the rate-limited opener to avoid 429 errors. You can also click links individually or copy all links to open them later."
                    }
                  </p>
                </div>

                {/* Link List */}
                <div className="space-y-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {selectedLinks.map((item, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg flex items-center gap-3 ${
                        item.opened 
                          ? 'bg-green-50 border border-green-100' 
                          : index === currentLinkIndex && openingLinks
                            ? 'bg-blue-50 border border-blue-100'
                            : 'bg-gray-50'
                      }`}
                    >
                      {item.opened && (
                        <CheckCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                      {!item.opened && index === currentLinkIndex && openingLinks && (
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-blue-900 mb-1 truncate">{item.company}</div>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate block"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenSingle(item.link, index);
                          }}
                        >
                          {item.link.length > 50 ? `${item.link.substring(0, 50)}...` : item.link}
                        </a>
                      </div>
                      <button
                        onClick={() => handleOpenSingle(item.link, index)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex-shrink-0"
                        title="Open link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OpenAllLinksButton;
```

### src/components/features/linkGenerator/SearchHistorySection.jsx

```jsx
import React, { useState } from 'react';
import { History, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExportDropdown from '../../../components/exportDropdown';

const SearchHistorySection = ({ 
  searchHistory, 
  onClearHistory, 
  onSearchAgain,
  generatedLinks 
}) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-4">
          <motion.button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors font-semibold shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <History className="w-5 h-5" />
            {showHistory ? 'Hide History' : 'Show History'}
          </motion.button>
          {searchHistory.length > 0 && (
            <ExportDropdown 
              history={searchHistory}
              generatedLinks={generatedLinks}
            />
          )}
        </div>

        <AnimatePresence>
          {showHistory && searchHistory.length > 0 && (
            <motion.button
              onClick={onClearHistory}
              className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-semibold shadow-sm hover:shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Trash2 className="w-5 h-5" />
              Clear History
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-4"
          >
            {searchHistory.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-xl border border-blue-200 shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {item.company}
                    </h3>
                    <p className="text-blue-600 text-sm">
                      Searched on {new Date(item.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => onSearchAgain(item.company)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Search Again
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchHistorySection;
```

### src/components/linkUtils.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
  return companyName
    .toLowerCase()
    .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
    .replace(/[^a-z0-9]/g, '');
};

/**
 * Generates domain variants for a company based on given extensions
 * @param {string} companyName - The company name
 * @param {string[]} extensions - Array of domain extensions
 * @returns {string[]} - Array of complete domain names
 */
export const generateDomainVariants = (companyName, extensions) => {
  const cleanName = cleanCompanyName(companyName);
  return extensions.map(ext => `${cleanName}${ext}`);
};

/**
 * Generates a LinkedIn search URL for developer profiles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateDevSearchLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
    // Function exclusions
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    // Company filter
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    // Keywords
    'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Logiciel%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
    '%2522D%25C3%25A9veloppeur%2522%2520OR%2520%2522Entwickler%2522%2520OR%2520%2522Desarrollador%2522%2520OR%2520' +
    '%2522DevOps%2522%2520OR%2520%2522Cloud%2522%2520OR%2520%2522Engineer%2522%2520OR%2520%2522Ing%25C3%25A9nieur' +
    '%2522%2520OR%2520%2522Ingenieur%2522%2520OR%2520%2522Ingeniero%2522%2529%2520And%2520%2528NOT%2520%2522Marketing' +
    '%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for security/IAM roles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateSecurityIAMLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    // Function exclusions
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    // Company filter
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    // Keywords for security roles and management positions
    'keywords%3A%2528%2522Security%2522%2520OR%2520%2522CISO%2522%2520OR%2520%2522CTO%2522%2520OR%2520' +
    '%2522Information%2520Security%2522%2520OR%2520%2522Cybersecurity%2522%2520OR%2520%2522AppSec%2522%2520OR%2520' +
    '%2522Application%2520Security%2522%2520OR%2520%2522IAM%2522%2520OR%2520%2522Identity%2522%2520OR%2520' +
    '%2522Access%2520Management%2522%2529%2520AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520' +
    '%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates all search links for a company
 * @param {string} company - The company name
 * @param {string} domain - The company's domain
 * @returns {Object} - Object containing all generated links with their metadata
 */
export const generateLinks = (company, domain) => {
  return {
    dev: {
      title: "Dev Search",
      link: generateDevSearchLink(company),
      description: "LinkedIn Search for Development Team Members",
    },
    securityIAM: {
      title: "Security/IAM",
      link: generateSecurityIAMLink(company),
      description: "LinkedIn Search for Security/IAM Decision Makers",
    }
  };
};
```

### src/contexts/RoleContext.jsx

```jsx
// src/contexts/RoleContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Role configurations
export const ROLES = {
  SALES: 'sales',
  RECRUITER: 'recruiter',
  JOBSEEKER: 'jobseeker',
};

export const ROLE_CONFIGS = {
  [ROLES.SALES]: {
    title: 'Sales Team',
    description: 'Find and connect with technical decision makers',
    defaultSearchTypes: ['dev', 'securityIAM'],
    functionExclusions: [
      'Accounting', 'Finance', 'Human Resources', 'Legal',
      'Marketing', 'Sales', 'Customer Success and Support',
      'Arts and Design', 'Business Development'
    ],
  },
  [ROLES.RECRUITER]: {
    title: 'Recruiter',
    description: 'Find potential candidates and HR decision makers',
    defaultSearchTypes: ['hrTeam', 'candidates'],
    functionExclusions: [
      'Sales', 'Customer Success and Support',
      'Business Development'
    ],
  },
  [ROLES.JOBSEEKER]: {
    title: 'Job Seeker',
    description: 'Find relevant positions and company information',
    defaultSearchTypes: ['openings', 'teamInsights'],
    functionExclusions: [], // Job seekers typically want to see all departments
  },
};

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(ROLES.SALES); // Default to sales role
  const [roleConfig, setRoleConfig] = useState(ROLE_CONFIGS[ROLES.SALES]);

  const updateRole = (newRole) => {
    if (ROLE_CONFIGS[newRole]) {
      setCurrentRole(newRole);
      setRoleConfig(ROLE_CONFIGS[newRole]);
    }
  };

  const contextValue = {
    currentRole,
    roleConfig,
    updateRole,
    availableRoles: Object.keys(ROLE_CONFIGS).map(role => ({
      id: role,
      ...ROLE_CONFIGS[role]
    })),
  };

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

// Custom hook for role-specific link generation
export const useRoleLinks = (company, domain) => {
  const { currentRole, roleConfig } = useRole();
  
  // This will be expanded as we implement role-specific link generators
  const generateRoleSpecificLinks = () => {
    switch (currentRole) {
      case ROLES.SALES:
        return {
          dev: {
            title: "Dev Search",
            link: generateDevSearchLink(company),
            description: "LinkedIn Search for Development Team Members",
          },
          securityIAM: {
            title: "Security/IAM",
            link: generateSecurityIAMLink(company),
            description: "LinkedIn Search for Security/IAM Decision Makers",
          }
        };
      case ROLES.RECRUITER:
        // To be implemented
        return {
          hrTeam: {
            title: "HR Team",
            link: "", // TODO: Implement recruiter-specific link generation
            description: "LinkedIn Search for HR Team Members",
          },
          candidates: {
            title: "Potential Candidates",
            link: "", // TODO: Implement candidate search
            description: "LinkedIn Search for Potential Candidates",
          }
        };
      case ROLES.JOBSEEKER:
        // To be implemented
        return {
          openings: {
            title: "Open Positions",
            link: "", // TODO: Implement job opening search
            description: "LinkedIn Search for Open Positions",
          },
          teamInsights: {
            title: "Team Insights",
            link: "", // TODO: Implement team insights search
            description: "LinkedIn Search for Team Information",
          }
        };
      default:
        return {};
    }
  };

  return generateRoleSpecificLinks();
};
```

### src/index.css

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base Mobile Styles */
@layer base {
  html {
    -webkit-tap-highlight-color: transparent;
    height: -webkit-fill-available;
  }

  body {
    min-height: -webkit-fill-available;
    @apply text-base antialiased bg-gray-50;
  }

  /* Improve mobile form elements */
  input,
  select,
  textarea {
    @apply appearance-none;
    font-size: 16px; /* Prevent iOS zoom */
  }

  /* Improve button touch targets */
  button {
    @apply select-none;
    touch-action: manipulation;
  }
}

/* Component Classes */
@layer components {
  /* Mobile-First Dashboard Layout */
  .dashboard-container {
    @apply min-h-screen flex flex-col md:flex-row;
  }

  .dashboard-sidebar {
    @apply fixed inset-y-0 left-0 z-30 bg-gradient-to-b from-gray-900 to-gray-800 
           transition-all duration-300 transform;

    /* Mobile Sidebar States */
    &.mobile-expanded {
      @apply translate-x-0;
    }

    &.mobile-collapsed {
      @apply -translate-x-full;
      width: 0 !important;
    }

    /* Hide sidebar content when collapsed on mobile */
    &.mobile-collapsed .sidebar-nav,
    &.mobile-collapsed .sidebar-header {
      @apply invisible opacity-0;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
  }

  /* Mobile-Optimized Header */
  .dashboard-header {
    @apply h-16 md:h-20 border-b flex items-center justify-between px-4 md:px-6 
           bg-white sticky top-0 z-20;

    /* Mobile search optimization */
    .search-container {
      @apply flex-1 max-w-xl mx-4;
      
      input {
        @apply w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100;
        @apply focus:outline-none focus:ring-2 focus:ring-blue-500;
        @apply text-sm md:text-base;
      }
    }
  }

  /* Mobile-Optimized Content */
  .content-wrapper {
    @apply p-4 md:p-6 w-full;
    
    /* Safe area insets for notched devices */
    @supports(padding: max(0px)) {
      padding-left: max(1rem, env(safe-area-inset-left));
      padding-right: max(1rem, env(safe-area-inset-right));
      padding-bottom: max(1rem, env(safe-area-inset-bottom));
    }
  }

  /* Mobile Grid Layouts */
  .metrics-grid {
    @apply grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8;
  }

  /* Card Styles */
  .generator-card {
    @apply bg-white rounded-xl shadow-md md:shadow-xl p-4 md:p-6;
  }

  .activity-feed {
    @apply bg-white rounded-xl shadow-md md:shadow-xl p-4 md:p-6;
    @apply h-fit lg:sticky lg:top-6;
  }

  /* Mobile Touch Optimization */
  .touch-target {
    @apply min-h-[44px] min-w-[44px] flex items-center justify-center;
  }

  /* Mobile-Optimized Forms */
  .form-input-mobile {
    @apply w-full px-4 py-3 rounded-lg border-2 border-gray-200;
    @apply focus:border-blue-500 focus:ring-2 focus:ring-blue-500;
    @apply text-base md:text-sm;
  }

  /* Mobile Loading States */
  .loading-skeleton {
    @apply animate-pulse bg-gray-200 rounded;
  }

  /* Mobile Scrolling */
  .smooth-scroll {
    @apply overflow-auto overscroll-contain;
    -webkit-overflow-scrolling: touch;
  }

  /* Mobile Notifications */
  .notification-badge {
    @apply absolute -top-1 -right-1 bg-red-500 text-white;
    @apply rounded-full w-5 h-5 text-xs flex items-center justify-center;
  }
}

/* Utility Classes */
@layer utilities {
  /* Safe Area Utilities */
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
  
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .safe-left {
    padding-left: env(safe-area-inset-left);
  }
  
  .safe-right {
    padding-right: env(safe-area-inset-right);
  }

  /* Mobile Gesture Areas */
  .gesture-area {
    @apply touch-pan-y select-none;
  }

  /* Mobile Text Adjustments */
  .mobile-text {
    @apply text-base md:text-sm;
  }

  .mobile-title {
    @apply text-xl md:text-2xl font-bold;
  }

  /* Mobile Visibility */
  .mobile-only {
    @apply block md:hidden;
  }

  .desktop-only {
    @apply hidden md:block;
  }

  /* Mobile Interactions */
  .tap-highlight {
    @apply hover:bg-gray-50 active:bg-gray-100;
    @apply transition-colors duration-150;
  }

  .press-effect {
    @apply active:scale-95 transition-transform duration-150;
  }
}
```

### src/main.jsx

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### src/pages/HomePage.jsx

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import BulkLinkGenerator from '../components/features/linkGenerator/BulkLinkGenerator';
import SearchHistorySection from '../components/features/linkGenerator/SearchHistorySection';
import { ShieldCheck, ChartBar, Users, Link } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';

const MetricCard = ({ title, value, trend, icon: Icon, onClick }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{value}</span>
                    {trend &&
                        <span className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {trend}
                        </span>}
                </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
        </div>
    </div>
);

const HomePage = ({ searchQuery, setNotifications, notifications }) => {
    const [sessionSearchCount, setSessionSearchCount] = useState(0);
    const [uniqueCompanies, setUniqueCompanies] = useState(0);
    const [generatedLinkCount, setGeneratedLinkCount] = useState(0);
    const { currentRole } = useRole();
    const [showHistory, setShowHistory] = useState(false);

    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    const updateMetrics = useCallback(() => {
        try {
            const storedHistory = localStorage.getItem(`searchHistory_${currentRole}`);
            const history = storedHistory ? JSON.parse(storedHistory) : [];
             const filteredHistory = searchQuery ? history.filter(item =>
                item.company.toLowerCase().includes(searchQuery.toLowerCase())
            ) : history;
            setSessionSearchCount(filteredHistory.length);

             const uniqueCompaniesSet = new Set(filteredHistory.map(item => item.company));
            setUniqueCompanies(uniqueCompaniesSet.size);

            const storedLinks = localStorage.getItem(`generatedLinks_${currentRole}`)
            const links = storedLinks ? JSON.parse(storedLinks) : []
            setGeneratedLinkCount(links?.length || 0)

        } catch (e) {
            console.error('Error updating metrics from localStorage', e);
        }
    }, [currentRole, searchQuery]);
   
    useEffect(() => {
      updateMetrics()
    }, [updateMetrics]);
    
    return (
        <div className="dashboard-content">
            {/* Metrics Overview */}
            <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard
                    title="Session Searches"
                    value={sessionSearchCount}
                    icon={ChartBar}
                    onClick={toggleHistory}
                />
                <MetricCard
                    title="Unique Companies"
                    value={uniqueCompanies}
                    icon={Users}
                    onClick={toggleHistory}
                />
                <MetricCard
                    title="Links Generated"
                    value={generatedLinkCount}
                    icon={Link}
                    onClick={toggleHistory}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generator Card */}
                <div className="lg:col-span-2">
                    <div className="generator-card bg-white rounded-2xl shadow-xl p-6">
                        <BulkLinkGenerator updateMetrics={updateMetrics} setNotifications={setNotifications} />
                    </div>
                </div>

                {/* Recent Activity Sidebar */}
                <div className="activity-feed bg-white rounded-2xl shadow-xl p-6 h-fit lg:sticky lg:top-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                     <SearchHistorySection
                        compact={true}
                        searchHistory={localStorage.getItem(`searchHistory_${currentRole}`) ? JSON.parse(localStorage.getItem(`searchHistory_${currentRole}`)) : []}
                        onClearHistory={() => {
                            localStorage.removeItem(`searchHistory_${currentRole}`);
                            updateMetrics();
                        }}
                        onSearchAgain={() => { }}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
```

### src/pages/WelcomePage.jsx

```jsx
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
```

### src/utils/linkUtils/jobseeker.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
  return companyName
    .toLowerCase()
    .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
    .replace(/[^a-z0-9]/g, '');
};

/**
* Generates domain variants for a company based on given extensions
* @param {string} companyName - The company name
* @param {string[]} extensions - Array of domain extensions
* @returns {string[]} - Array of complete domain names
*/
export const generateDomainVariants = (companyName, extensions) => {
  const cleanName = cleanCompanyName(companyName);
  return extensions.map(ext => `${cleanName}${ext}`);
};

/**
* Generates a LinkedIn search URL for peers in your role
* @param {string} company - The company name
* @returns {string} - LinkedIn search URL
*/
export const generatePeerSearchLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
    '%2522Engineer%2522%2520OR%2520%2522Development%2522%2520OR%2520%2522Programming%2522%2520OR%2520' +
    '%2522Full%2520Stack%2522%2520OR%2520%2522Backend%2522%2520OR%2520%2522Frontend%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
* Generates a LinkedIn search URL for HR and recruiting contacts
* @param {string} company - The company name
* @returns {string} - LinkedIn search URL
*/
export const generateHRContactLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AINCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Recruiter%2522%2520OR%2520%2522Recruiting%2522%2520OR%2520%2522Talent%2522%2520OR%2520' +
    '%2522HR%2522%2520OR%2520%2522Human%2520Resources%2522%2520OR%2520%2522Talent%2520Acquisition%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
* Generates a LinkedIn search URL for Finance contacts
* @param {string} company - The company name
* @returns {string} - LinkedIn search URL
*/
export const generateFinanceLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A12%2Ctext%3ARessources%2520humaines%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3AService%2520juridique%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3AVentes%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACentre%2520de%2520ressources%2520et%2520assistance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520et%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A8%2Ctext%3AIng%25C3%25A9nierie%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A11%2Ctext%3AServices%2520de%2520sant%25C3%25A9%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A13%2Ctext%3ATechnologies%2520de%2520l%25E2%2580%2599information%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A24%2Ctext%3ARecherche%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Finance%2522%2520OR%2520%2522Accounting%2522%2520OR%2520%2522Financial%2520Analyst%2522%2520OR%2520' +
    '%2522FP%2526A%2522%2520OR%2520%2522Controlling%2522%2520OR%2520%2522Treasury%2522%2520OR%2520%2522Risk%2520Management%2522%2520OR%2520' +
    '%2522Operations%2520Finance%2522%2520OR%2520%2522Tax%2522%2520OR%2520%2522Audit%2522%2520OR%2520%2522Compliance%2522%2520OR%2520' +
    '%2522Strategic%2520Finance%2522%2520OR%2520%2522Prime%2520Finance%2522%2520OR%2520%2522Business%2520Unit%2520Finance%2522%2520OR%2520' +
    '%2522Infrastructure%2520Finance%2522%2520OR%2520%2522Transportation%2520Finance%2522%2520OR%2520%2522Global%2520Business%2520Services%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
* Generates all search links for a company
* @param {string} company - The company name
* @param {string} domain - The company's domain
* @returns {Object} - Object containing all generated links with their metadata
*/
export const generateLinks = (company, domain) => {
  return {
    peers: {
      title: "Find Peers",
      link: generatePeerSearchLink(company),
      description: "LinkedIn Search for People in Similar Roles",
    },
    hrContacts: {
      title: "HR Contacts",
      link: generateHRContactLink(company),
      description: "LinkedIn Search for HR and Recruiting Team Members",
    },
    financeContacts: {
      title: "Finance Contacts",
      link: generateFinanceLink(company),
      description: "LinkedIn Search for Finance Department Contacts",
    }
  };
};
```

### src/utils/linkUtils/recruiter.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
  return companyName
    .toLowerCase()
    .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
    .replace(/[^a-z0-9]/g, '');
};

/**
 * Generates domain variants for a company based on given extensions
 * @param {string} companyName - The company name
 * @param {string[]} extensions - Array of domain extensions
 * @returns {string[]} - Array of complete domain names
 */
export const generateDomainVariants = (companyName, extensions) => {
  const cleanName = cleanCompanyName(companyName);
  return extensions.map(ext => `${cleanName}${ext}`);
};

/**
 * Generates a LinkedIn search URL for developer profiles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateDevSearchLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Logiciel%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
    '%2522D%25C3%25A9veloppeur%2522%2520OR%2520%2522Entwickler%2522%2520OR%2520%2522Desarrollador%2522%2520OR%2520' +
    '%2522DevOps%2522%2520OR%2520%2522Cloud%2522%2520OR%2520%2522Engineer%2522%2520OR%2520%2522Ing%25C3%25A9nieur' +
    '%2522%2520OR%2520%2522Ingenieur%2522%2520OR%2520%2522Ingeniero%2522%2529%2520And%2520%2528NOT%2520%2522Marketing' +
    '%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for tech leaders and hiring managers
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateTechLeadersLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Engineering%2522%2520OR%2520%2522Software%2522%2520OR%2520%2522Development%2522%2520OR%2520' +
    '%2522Tech%2522%2520OR%2520%2522Technology%2522%2520OR%2520%2522R%2526D%2522%2520OR%2520%2522Product%2522%2520OR%2520' +
    '%2522Platform%2522%2520OR%2520%2522Architecture%2522%2529%2520AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520' +
    '%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for Finance candidates
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateFinanceCandidatesLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A12%2Ctext%3ARessources%2520humaines%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3AService%2520juridique%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3AVentes%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACentre%2520de%2520ressources%2520et%2520assistance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520et%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A8%2Ctext%3AIng%25C3%25A9nierie%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A11%2Ctext%3AServices%2520de%2520sant%25C3%25A9%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A13%2Ctext%3ATechnologies%2520de%2520l%25E2%2580%2599information%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A24%2Ctext%3ARecherche%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Finance%2522%2520OR%2520%2522Accounting%2522%2520OR%2520%2522Financial%2520Analyst%2522%2520OR%2520' +
    '%2522FP%2526A%2522%2520OR%2520%2522Controlling%2522%2520OR%2520%2522Treasury%2522%2520OR%2520%2522Risk%2520Management%2522%2520OR%2520' +
    '%2522Operations%2520Finance%2522%2520OR%2520%2522Tax%2522%2520OR%2520%2522Audit%2522%2520OR%2520%2522Compliance%2522%2520OR%2520' +
    '%2522Strategic%2520Finance%2522%2520OR%2520%2522Prime%2520Finance%2522%2520OR%2520%2522Business%2520Unit%2520Finance%2522%2520OR%2520' +
    '%2522Infrastructure%2520Finance%2522%2520OR%2520%2522Transportation%2520Finance%2522%2520OR%2520%2522Global%2520Business%2520Services%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates all search links for a company
 * @param {string} company - The company name
 * @param {string} domain - The company's domain
 * @returns {Object} - Object containing all generated links with their metadata
 */
export const generateLinks = (company, domain) => {
  return {
    dev: {
      title: "Tech Candidates",
      link: generateDevSearchLink(company),
      description: "LinkedIn Search for Development Team Members",
    },
    techLeaders: {
      title: "Tech Leaders",
      link: generateTechLeadersLink(company),
      description: "LinkedIn Search for Tech Leaders and Hiring Managers",
    },
    financeCandidates: {
      title: "Finance Candidates",
      link: generateFinanceCandidatesLink(company),
      description: "LinkedIn Search for Finance Department Contacts",
    }
  };
};
```

### src/utils/linkUtils/sales.js

```js
/**
 * Cleans a company name by removing common suffixes and special characters
 * @param {string} companyName - The raw company name
 * @returns {string} - The cleaned company name
 */
export const cleanCompanyName = (companyName) => {
  return companyName
    .toLowerCase()
    .replace(/,?\s*(inc|llc|ltd|corp|corporation|company)\.?$/i, '')
    .replace(/[^a-z0-9]/g, '');
};

/**
 * Generates domain variants for a company based on given extensions
 * @param {string} companyName - The company name
 * @param {string[]} extensions - Array of domain extensions
 * @returns {string[]} - Array of complete domain names
 */
export const generateDomainVariants = (companyName, extensions) => {
  const cleanName = cleanCompanyName(companyName);
  return extensions.map(ext => `${cleanName}${ext}`);
};

/**
 * Generates a LinkedIn search URL for developer profiles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateDevSearchLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' + 
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Software%2522%2520OR%2520%2522Logiciel%2522%2520OR%2520%2522Developer%2522%2520OR%2520' +
    '%2522D%25C3%25A9veloppeur%2522%2520OR%2520%2522Entwickler%2522%2520OR%2520%2522Desarrollador%2522%2520OR%2520' +
    '%2522DevOps%2522%2520OR%2520%2522Cloud%2522%2520OR%2520%2522Engineer%2522%2520OR%2520%2522Ing%25C3%25A9nieur' +
    '%2522%2520OR%2520%2522Ingenieur%2522%2520OR%2520%2522Ingeniero%2522%2529%2520And%2520%2528NOT%2520%2522Marketing' +
    '%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for security/IAM roles
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateSecurityIAMLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A1%2Ctext%3AAccounting%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A10%2Ctext%3AFinance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A12%2Ctext%3AHuman%2520Resources%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3ALegal%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3ASales%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACustomer%2520Success%2520and%2520Support%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520and%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A4%2Ctext%3ABusiness%2520Development%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Security%2522%2520OR%2520%2522CISO%2522%2520OR%2520%2522CTO%2522%2520OR%2520' +
    '%2522Information%2520Security%2522%2520OR%2520%2522Cybersecurity%2522%2520OR%2520%2522AppSec%2522%2520OR%2520' +
    '%2522Application%2520Security%2522%2520OR%2520%2522IAM%2522%2520OR%2520%2522Identity%2522%2520OR%2520' +
    '%2522Access%2520Management%2522%2529%2520AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520' +
    '%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates a LinkedIn search URL for finance/accounting decision-makers (NEW)
 * @param {string} company - The company name
 * @returns {string} - LinkedIn search URL
 */
export const generateFinanceLink = (company) => {
  const baseUrl = 'https://www.linkedin.com/sales/search/people';
  const queryParams = '(spellCorrectionEnabled%3Atrue%2CrecentSearchParam%3A(id%3A3196859146%2CdoLogHistory%3Atrue)%2Cfilters%3AList(' +
    '(type%3AFUNCTION%2Cvalues%3AList(' +
    '(id%3A12%2Ctext%3ARessources%2520humaines%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A14%2Ctext%3AService%2520juridique%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A15%2Ctext%3AMarketing%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A25%2Ctext%3AVentes%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A26%2Ctext%3ACentre%2520de%2520ressources%2520et%2520assistance%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A3%2Ctext%3AArts%2520et%2520Design%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A8%2Ctext%3AIng%25C3%25A9nierie%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A7%2Ctext%3A%25C3%2589ducation%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A11%2Ctext%3AServices%2520de%2520sant%25C3%25A9%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A13%2Ctext%3ATechnologies%2520de%2520l%25E2%2580%2599information%2CselectionType%3AEXCLUDED)%2C' +
    '(id%3A23%2Ctext%3AImmobilier%2CselectionType%3AEXCLUDED)))%2C' +
    `(type%3ACURRENT_COMPANY%2Cvalues%3AList((text%3A${company}%2CselectionType%3AINCLUDED))))%2C` +
    'keywords%3A%2528%2522Finance%2522%2520OR%2520%2522Accounting%2522%2520OR%2520%2522FP%2526A%2522%2520OR%2520%2522Financial%2520Planning%2522%2520OR%2520' +
    '%2522Treasury%2522%2520OR%2520%2522Controller%2522%2520OR%2520%2522CFO%2522%2520OR%2520%2522Compliance%2522%2520OR%2520%2522Risk%2520Management%2522%2520OR%2520' +
    '%2522Tax%2522%2520OR%2520%2522Audit%2522%2520OR%2520%2522Payroll%2522%2520OR%2520%2522Bookkeeping%2522%2520OR%2520%2522Financial%2520Operations%2522%2520OR%2520' +
    '%2522FinOps%2522%2520OR%2520%2522Revenue%2522%2520OR%2520%2522Billing%2522%2520OR%2520%2522Accounts%2520Payable%2522%2520OR%2520%2522Accounts%2520Receivable%2522%2529%2520' +
    'AND%2520%2528%2522Manager%2522%2520OR%2520%2522Director%2522%2520OR%2520%2522Head%2522%2520OR%2520%2522Lead%2522%2520OR%2520%2522Chief%2522%2520OR%2520%2522VP%2522%2520OR%2520%2522Vice%2520President%2522%2529)';

  return `${baseUrl}?query=${queryParams}`;
};

/**
 * Generates all search links for a company (UPDATED)
 * @param {string} company - The company name
 * @param {string} domain - The company's domain
 * @returns {Object} - Object containing all generated links
 */
export const generateLinks = (company, domain) => {
  return {
    dev: {
      title: "Dev Search",
      link: generateDevSearchLink(company),
      description: "LinkedIn Search for Development Team Members",
    },
    securityIAM: {
      title: "Security/IAM",
      link: generateSecurityIAMLink(company),
      description: "LinkedIn Search for Security/IAM Decision Makers",
    },
    finance: {
      title: "Finance Decision Makers",
      link: generateFinanceLink(company),
      description: "LinkedIn Search for Finance/Accounting Decision Makers",
    }
  };
};
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
```

### vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Or any other port you prefer.  3000 is a common choice.
  },
})
```
