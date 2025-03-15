# Alikel Linkgen

**NOTE** : Alikel Linkgen requires a SaleNavigator license to be used purposefully.

**NOTE** : You can just use the demo link instead of installing it and running it locally.[ https://linkforge-alikeldev.netlify.app/dashboard](url)

**NOTE** : will let Kei do have more AI related abilities . i dont know what yet ! but Max does has bunch of abilities on deepfit, Kei could probably do way much more stuff on linkgen, like analysis, i dont know of what, but he's clearly underused rn

**NOTE** : I'll add profile creation, like there is on [https://deepfit-alikearn.com/](url), so that Kei can remember important things, like special prompts, my role, what company i work for, etc etc.

**NOTE** : It's mostly a personal tool to make my job easier, most updates are made to make my life easier haha

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Functions-00C7B7?logo=netlify&logoColor=white)

<img width="1316" alt="image" src="https://github.com/user-attachments/assets/e331fc24-e937-4bda-997d-bb192d35954c" />


## Overview

Alikel Linkgen is a React-based LinkedIn search automation tool designed to streamline the process of finding relevant professionals on LinkedIn Sales Navigator. Unlike traditional saved searches, LinkForge allows you to generate multiple search URLs for unlimited companies in bulk, with intelligent domain validation and role-specific search patterns.

**Who is this for?** Sales professionals, recruiters, and job seekers who need to efficiently find relevant contacts across multiple companies.

### Key Features

- **Multi-Role Support** for Sales Teams, Recruiters, and Job Seekers
- **Bulk Link Generation** for dozens of companies simultaneously
- **AI-Powered Assistant (Kei)** for domain validation and strategy planning
- **Domain Checker Tool** with visual grid preview and validation
- **Search History** with cross-session persistence
- **Export Capabilities** for team collaboration

## Real-World Usage Scenarios

### Sales Workflow

<img width="708" alt="image" src="https://github.com/user-attachments/assets/041cc293-8683-478b-b008-459c04bb9b4e" />



As a tech sales professional:

1. Input target companies in bulk (e.g., "Quadient, CyberAgent, QBurst")
2. Select the "Sales Team" role
3. Click "Generate Links" to create targeted searches
4. Use "Open All Security/IAM Links" to launch searches in sequence
5. Select and copy relevant contacts
6. Ask Kei: "Which people should I contact considering my company sells [product]?"
7. Get personalized outreach recommendations

This saves hours compared to manually searching on LinkedIn and helps focus on the most relevant prospects.

### Recruiter Workflow

<img width="701" alt="image" src="https://github.com/user-attachments/assets/5bdfd975-4f05-4069-b200-0a47f6c2e3a8" />



As a technical recruiter:

1. Input target companies known for engineering excellence
2. Select the "Recruiter" role
3. Use the bucket selector to focus on companies with larger development teams
4. Generate links focused on engineering talent
5. Open results in sequence to build candidate pipelines
6. Export results for your ATS or recruitment team

### Job Seeker Workflow

<img width="695" alt="image" src="https://github.com/user-attachments/assets/f73b8e40-4c07-44f6-843a-625f923a55b6" />



As a job seeker looking for opportunities:

1. Input companies you're interested in working for
2. Select the "Job Seeker" role
3. Generate HR contact searches
4. Use Kei to analyze companies and suggest tailored application strategies
5. Build your targeted application list with relevant contacts

## Core Features

### Bulk Link Generator


- Input unlimited company names at once
- Role-specific search templates that focus on relevant positions:
  - **Sales**: Dev, Security/IAM, Finance decision-makers
  - **Recruiter**: Tech candidates, Tech leaders, Finance candidates
  - **Job Seeker**: Peer roles, HR contacts, Finance contacts
- Automatic domain inference
- Export results in CSV format

### Domain Checker Tool

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/b71440e3-d64a-4503-8a05-a098b228ee9d" />


The domain checker allows you to quickly validate which domain variations a company owns:

- Grid view with live website previews (configurable as 2x2, 3x3, or 4x4)
- List view for detailed management
- Mark domains as "exists" or "not exists"
- Filter by status
- Export results in CSV format
- Open grid in separate window for easier viewing

#### Using the Domain Checker

1. Click "Check Domains" for any company
2. View domain variations across different TLDs (.com, .io, etc.)
3. Toggle between grid and list views
4. Mark validity status
5. Export findings

### Kei AI Assistant

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/29943f75-1145-481d-8950-40561fdf3ec7" />


Kei is your AI research assistant (if you run it locally, you can make him run on any model really. Gemini Flash 2 works super well):

- **Chat Interface**: Engage in conversations about specific companies
- **Multiple Personality Modes**: 
  - Professional Mode: Business analysis with minimal playfulness
  - Balanced Mode: Helpful insights with moderate enthusiasm
  - Creative Mode: Innovative thinking with maximum playfulness
- **Company Analysis**: Get insights on market position, tech stack, and structure
- **Domain Validation**: Get recommendations on priority TLDs and alternatives
- **Outreach Strategy**: Get advice on targeting the right roles and messaging
- **Persistent History**: Conversations saved by company for future reference

### Company Bucket Selector

<img width="694" alt="image" src="https://github.com/user-attachments/assets/24e4d64f-d143-4710-878c-c11c766f62c8" />
<img width="701" alt="image" src="https://github.com/user-attachments/assets/988e5502-4369-4993-8333-cd22e259c12b" />


## Company Classification System

Classify companies based on development and security team sizes with fully customizable buckets:

- **Tech Giant** (10000+ devs, 3000+ security)
- **Major Enterprise** (5000+ devs, 1500+ security)
- **Large Enterprise** (2000+ devs, 600+ security)
- **Enterprise** (1000+ devs, 300+ security)
- **Growth Plus** (500+ devs, 150+ security)
- **Growth** (200+ devs, 60+ security)
- **Late Startup** (100+ devs, 30+ security)
- **Mid Startup** (50+ devs, 15+ security)
- **Early Startup** (20+ devs, 6+ security)
- **Pre-Seed** (0+ devs, 0+ security)

### New Bucket Management Features

You can now fully customize the classification system to match your specific needs:

- **Edit buckets**: Modify bucket names, team size thresholds, and color coding
- **Add buckets**: Create new company size categories with custom parameters
- **Delete buckets**: Remove unwanted classifications from your system
- **Reset buckets**: Return to default classifications if needed

This flexible classification system helps tailor your outreach strategy to each company's scale and likely needs.


### Link Management

<img width="687" alt="image" src="https://github.com/user-attachments/assets/67a86358-bd8f-4b28-8cf0-46d7d8971a32" />


- **Rate-Limited Opening**: Open multiple links without triggering LinkedIn's anti-bot measures
- **Configurable Delays**: Set custom delays between opening links (1-10 seconds)
- **Progress Tracking**: Visual indication of which links have been opened
- **Copy-to-Clipboard**: Quick access to all URLs

## Technical Architecture

Alikel Linkgen is built with modern web technologies:

### Frontend

- **React 18.3**: Core UI framework with hooks and context
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations and transitions
- **React Router**: Navigation and routing

### State Management

- **React Context API**: Global state management
- **Local Storage**: Cross-session persistence for:
  - Search history
  - Chat conversations
  - Company data
  - User preferences

### AI Integration

- **Netlify Functions**: Serverless backend for API integration
- **Gemini API**: Powers the Kei assistant
- **Context Awareness**: Ability to analyze and remember company-specific details
- I plan on adding **moondream analysis**, so that you can show a pic to kei, like someones profile, and he gives you advice based on your question

### Responsive Design

- Mobile-optimized interface
- Adaptive layouts for different screen sizes
- Touch-friendly controls

## Installation & Configuration
(unless you want to modify the way something works, no need, just use the deployed version : [https://linkforge-alikeldev.netlify.app/dashboard](url) )

### Prerequisites

- Node.js 18+
- npm/yarn
- Gemini API key

### Setup

```bash
# Clone the repository
git clone https://github.com/AliKelDev/Alikel-Linkgen.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:

```
GEMINI_API_KEY=your_api_key_here
```

## Development Guide

### Project Structure

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

### Key Components

- `BulkLinkGenerator.jsx`: Main link generation interface
- `GeneratedLinkCard.jsx`: Display for generated search links
- `DomainCheckerModal.jsx`: Domain validation tool
- `AIChatAssistant.jsx`: Kei AI interface
- `AnimatedBackground.jsx`: UI wrapper with animations

### Adding New Features

#### New Role Type

1. Update `RoleContext.jsx` with a new role entry
2. Create role-specific link generators in `utils/linkUtils/`
3. Update UI components to support the new role

#### New Search Templates

1. Add new template generators to `linkUtils/[role].js`
2. Update the UI components to display the new search types

## Advanced Usage Tips

### Market Segmentation Research

Use the bucket selector to identify companies within specific size ranges, then export your findings for market analysis.

### Conference Preparation

1. Input a list of companies attending an event
2. Generate links for key roles you want to meet
3. Research and plan your networking strategy
4. Have Kei prepare personalized talking points

### Competitive Analysis

1. Input your competitors
2. Use the domain checker to analyze their web presence
3. Use generated links to map their organizational structure
4. Ask Kei to compare approaches and identify opportunities

## What's Next

Planned improvements include:

- Role-specific AI assistants
- Additional search templates
- Agentic funcitons for Kei

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Developed by [AliKelDev](https://github.com/AliKelDev)
- Built with React and Netlify

NOTE : I am Alice, it's an Alias. Alice Leiser = Alikel = AKD = Jordan.M, so when Alice Leiser commits something, it's me.
