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