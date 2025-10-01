
# LinkForge

- **NOTE**: LinkForge requires a LinkedIn Sales Navigator license to be used purposefully.
- **NOTE**: You can just use the demo link instead of installing it and running it locally: [https://linkforge-alikeldev.netlify.app/dashboard](https://linkforge-alikeldev.netlify.app/dashboard)
- **NOTE**: It's mostly a personal tool to make my job easier, most updates are made to make my life easier haha
- **NOTE**: A Chrome extension is available to automate data capture from LinkedIn Sales Navigator. [See installation instructions below](#-chrome-extension).

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Netlify Functions](https://img.shields.io/badge/Netlify-Functions-00C7B7?logo=netlify&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-^6.0-646CFF?logo=vite&logoColor=white)


<img width="1316" alt="LinkForge Screenshot" src="https://github.com/user-attachments/assets/e331fc24-e937-4bda-997d-bb192d35954c" />

## Overview

LinkForge is a React-based automation tool designed to streamline the process of finding relevant professionals or specific individuals on LinkedIn, primarily using Sales Navigator. It allows for bulk generation of search URLs for companies or individuals, intelligent domain validation, role-specific search patterns, and AI-powered assistance.

**Who is this for?** Sales professionals, recruiters, and job seekers who need to efficiently find relevant contacts across multiple companies or locate specific known individuals in bulk.

### Key Features

-   **Multi-Role Support:** Tailored workflows for Sales Teams, Recruiters, and Job Seekers.
-   **Bulk Company Link Generation:** Generate targeted Sales Navigator searches for dozens of companies simultaneously.
-   **Bulk Person Name Search:** Generate Sales Navigator searches for specific individuals by name, optionally filtering by a common company.
-   **Combined Person Search:** Generate a single bulk search link using `OR` logic to find any of the entered individuals at once.
-   **Chrome Extension:** Automatic data capture from LinkedIn Sales Navigator searches.
-   **AI-Powered Assistant (Kei):** Get domain validation help, strategy planning, company analysis, and outreach advice.
-   **Domain Checker Tool:** Visual grid preview and list view for validating company domain variations.
-   **Company Size Buckets:** Classify companies with customizable size thresholds and manage these buckets.
-   **Search History:** Cross-session persistence for both company and name searches (stored locally).
-   **Export Capabilities:** Export current results or search history to CSV.
-   **Rate-Limited Link Opening:** Safely open multiple generated links with configurable delays.

## 🦊 Chrome Extension

LinkForge includes a Chrome extension that automatically extracts LinkedIn Sales Navigator search results and populates them directly into your LinkForge dashboard - eliminating manual data entry.

**[Download Latest Release →](https://github.com/AliKelDev/Alikel-Linkgen/releases/latest)**

<!-- SCREENSHOT PLACEHOLDER: Extension popup showing green status indicators when both LinkedIn and LinkForge tabs are open -->

### Features

- **Automatic Data Capture**: Detects company name and developer count from Sales Navigator searches
- **Real-Time Sync**: Instantly forwards data to your open LinkForge tab
- **Visual Feedback**: Shows success notifications when data is captured
- **Multi-Tab Support**: Works across multiple LinkForge windows simultaneously
- **Status Monitoring**: Popup shows connection status for LinkedIn and LinkForge tabs

### Installation

1. Download [linkforge-extension.zip](https://github.com/AliKelDev/Alikel-Linkgen/releases/tag/2.0.0)
2. Unzip the file
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" (toggle in top right)
5. Click "Load unpacked" and select the unzipped `linkforge-extension` folder
6. The extension icon (🦊) should appear in your toolbar

<!-- SCREENSHOT PLACEHOLDER: Chrome extensions page showing the extension loaded in developer mode -->

### How It Works

1. Open [LinkForge](https://linkforge-alikeldev.netlify.app/dashboard)
2. Enter a company name in LinkForge (e.g., "Google")
3. Click one of the generated Sales Navigator links
4. Once the search results load on LinkedIn, the extension automatically:
   - Extracts the company name from your search query
   - Captures the exact result count from the page
   - Sends the data back to your LinkForge tab
5. The developer count appears instantly in LinkForge for that company

<!-- SCREENSHOT PLACEHOLDER: Side-by-side view - Sales Navigator search on left showing results, LinkForge on right showing the captured developer count appearing in real-time -->

**Note**: The extension only activates on Sales Navigator search URLs and requires an active LinkForge tab to be open.

### Troubleshooting

- **Data not appearing?** Ensure you have LinkForge open in another tab before clicking the Sales Navigator link
- **Extension not detecting?** Wait 2-3 seconds for the Sales Navigator page to fully load
- **No success notification?** Check the extension is enabled in `chrome://extensions/`
- **Multiple counts appearing?** The extension captures data from the most recent search - older searches may be cached

---

## Real-World Usage Scenarios

### Sales Workflow (Company Search)

<img width="708" alt="Sales Workflow" src="https://github.com/user-attachments/assets/041cc293-8683-478b-b008-459c04bb9b4e" />

As a tech sales professional:

1.  Input target companies in bulk (e.g., "Quadient, CyberAgent, QBurst").
2.  Select the "Sales Team" role.
3.  Optionally, use the Bucket Selector to classify companies by size.
4.  Click "Generate Links" to create targeted searches for relevant roles (Dev, Security, Finance, etc.).
5.  Use "Open All Security Links" (or other types) to launch searches sequentially.
6.  **With the Chrome extension**: The developer counts populate automatically as you visit each link.
7.  Ask Kei: "Analyze Quadient's security posture based on their likely tech stack."
8.  Get insights to tailor outreach.

### Recruiter Workflow (Company Search)

<img width="701" alt="Recruiter Workflow" src="https://github.com/user-attachments/assets/5bdfd975-4f05-4069-b200-0a47f6c2e3a8" />

As a technical recruiter:

1.  Input target companies known for engineering excellence.
2.  Select the "Recruiter" role.
3.  Generate links focused on engineering talent, tech leaders, or finance candidates.
4.  Use "Open All Tech Candidates Links" to build candidate pipelines.
5.  **With the Chrome extension**: Developer counts are captured automatically as you review each company.
6.  Export results for your ATS or recruitment team.

### Job Seeker Workflow (Company Search)

<img width="695" alt="Job Seeker Workflow" src="https://github.com/user-attachments/assets/f73b8e40-4c07-44f6-843a-625f923a55b6" />

As a job seeker looking for opportunities:

1.  Input companies you're interested in working for.
2.  Select the "Job Seeker" role.
3.  Generate HR or Finance contact searches.
4.  Use Kei to analyze companies and suggest tailored application strategies.
5.  Build your targeted application list with relevant contacts.

### General Workflow (Person Name Search)

<img width="772" alt="image" src="https://github.com/user-attachments/assets/243d9ca1-19f5-419e-ba32-b84f84376dc2" />

<img width="691" alt="image" src="https://github.com/user-attachments/assets/967c42a4-ec64-43a0-92c8-83ab5711f2d3" />


1.  Switch to the "Name Search" mode on the dashboard.
2.  Input a list of names (one per line, e.g., "John Smith", "Alice Leiser").
3.  (Optional) Enter a common company name if you want to find these people specifically at that company.
4.  Click "Generate Name Search Links".
5.  Review the results:
    -   Use the individual "Open Link" buttons for each person.
    -   Use the "Open All Basic Search Links" or "Open All Targeted Search Links" buttons to check individuals sequentially.
    -   Use the "Open Bulk Search" link to see a combined view of results for *any* of the names entered.
6.  Useful for verifying contacts, finding specific stakeholders, or reconnecting with known individuals.

## Core Features

### Bulk Link Generator (Company Search)

-   Input unlimited company names at once.
-   Role-specific search templates focus on relevant positions:
    -   **Sales**: Dev, Security, Finance, and Machine Identity decision-makers.
    -   **Recruiter**: Tech candidates, Tech leaders, Finance candidates.
    -   **Job Seeker**: HR contacts, Finance contacts.
-   Automatic domain inference and selection via the Domain Checker.
-   Export generated links and company data (including bucket) in CSV format.

### Domain Checker Tool

<img width="1440" alt="Domain Checker Grid View" src="https://github.com/user-attachments/assets/b71440e3-d64a-4503-8a05-a098b228ee9d" />

Quickly validate potential domains for a company:

-   **Grid View:** Live website previews in configurable layouts (2x2, 3x3, 4x4). Ideal for quick visual checks.
-   **List View:** Detailed management of domain statuses.
-   **Status Tracking:** Mark domains as "exists", "not exists", or leave as "unknown".
-   **Filtering:** View domains based on their status.
-   **Export:** Save findings (domain, status, URL) to CSV.
-   **New Window:** Open the grid view in a separate browser window for easier comparison (requires pop-ups enabled).

#### Using the Domain Checker

1.  Click "Check Domains" on a generated company card.
2.  View variations across common TLDs (.com, .io, .fr, etc.).
3.  Toggle between grid and list views.
4.  Mark validity status for each domain.
5.  Export findings or simply close the modal (status is stored locally).

### Kei AI Assistant

<img width="1440" alt="Kei AI Assistant Chat Interface" src="https://github.com/user-attachments/assets/29943f75-1145-481d-8950-40561fdf3ec7" />

Kei is your integrated AI research assistant (powered by Gemini, configurable if run locally):

-   **Chat Interface:** Engage in conversations about specific companies or general strategies.
-   **Multiple Personality Modes:** Adjust Kei's tone (Professional, Balanced, Creative).
-   **Company Analysis:** Get insights on market position, potential tech stack, organizational structure, etc.
-   **Domain Strategy:** Get recommendations on priority TLDs and branding implications.
-   **Outreach Strategy:** Get advice on targeting roles, messaging angles, and competitive positioning.
-   **Persistent History:** Conversations are saved locally by company for easy reference via a dropdown.
-   **Contextual Awareness:** Kei understands the company and domain you are asking about.

### Person Name Search Generator

-   Input a list of names (one per line).
-   Optionally provide a common company name to narrow the search for both individual and combined links.
-   Generates several types of links per batch:
    -   **Individual Basic Search:** A general LinkedIn search for each name entered.
    -   **Individual Targeted Search:** A LinkedIn search specifically looking for each name within the provided company context (only generated if a company is entered).
    -   **Combined Bulk Search:** A single search link using `OR` logic to find *any* of the entered names in one result set. Useful for quickly scanning for multiple contacts.
-   Includes "Open All" buttons for individual basic and targeted searches.
-   Provides "Open Bulk Search" and "Copy Link" buttons for the combined search.
-   Maintains its own persistent search history (stored locally).

### Company Bucket Selector & Management

<img width="694" alt="Company Size Bucket Selection" src="https://github.com/user-attachments/assets/24e4d64f-d143-4710-878c-c11c766f62c8" />
<img width="701" alt="Editing Company Size Buckets" src="https://github.com/user-attachments/assets/988e5502-4369-4993-8333-cd22e259c12b" />

Classify companies based on estimated team sizes using fully customizable buckets:

-   **Default Buckets:** Ranging from "Pre-Seed" to "Tech Giant" based on Dev & Security team sizes.
-   **Customization:**
    -   **Edit buckets:** Modify names, thresholds, and colors.
    -   **Add buckets:** Create new categories.
    -   **Delete buckets:** Remove classifications.
    -   **Reset buckets:** Restore defaults.
-   Helps tailor outreach based on company scale. Assigned bucket is included in CSV export.

### Link Management

<img width="687" alt="Generated Link Card with Actions" src="https://github.com/user-attachments/assets/67a86358-bd8f-4b28-8cf0-46d7d8971a32" />

-   **Rate-Limited Opening:** Use the "Open All..." buttons with configurable delays (1-10 seconds) to open links sequentially without triggering LinkedIn's rate limits.
-   **Progress Tracking:** Visual feedback when using the rate-limited opening feature.
-   **Individual Opening:** Open any generated link directly.
-   **Copy-to-Clipboard:** Quickly copy individual link URLs or descriptions.

## Technical Architecture

LinkForge leverages modern web technologies:

### Frontend

-   **React 18.3:** Core UI library utilizing Hooks and Context.
-   **Vite:** Fast build tool and development server.
-   **Tailwind CSS:** Utility-first CSS framework for styling.
-   **Framer Motion:** Declarative animations and transitions.
-   **React Router:** Client-side routing for navigation (`WelcomePage`, `HomePage`).

### Chrome Extension

-   **Manifest V3:** Modern Chrome extension architecture.
-   **Content Scripts:** Run on both LinkedIn Sales Navigator and LinkForge pages.
-   **Background Service Worker:** Routes messages between content scripts.
-   **window.postMessage API:** Secure communication between extension and React app.

### State Management

-   **React Context API:** Used for global state like the current user role (`RoleContext`).
-   **Local Storage:** Persists user data across sessions, including:
    -   Company search history and generated links per role.
    -   Name search history and generated links.
    -   Kei AI chat conversations by company.
    -   Custom company bucket configurations.
    -   User preferences (like AI personality mode).

### AI Integration

-   **Netlify Functions:** Serverless backend (`ai-chat.js`) acting as a proxy to the AI API.
-   **Google Gemini API:** Powers the Kei assistant (specifically Gemini Flash 2 by default in the Netlify function). Configurable if run locally.
-   **Context Awareness:** The backend function receives company/domain context to tailor Kei's responses.

### Responsive Design

-   Adapts to various screen sizes from mobile to desktop.
-   Touch-friendly controls and mobile-optimized layouts.

## Installation & Configuration

(Unless you want to modify the way something works, using the deployed version is recommended: [https://linkforge-alikeldev.netlify.app/dashboard](https://linkforge-alikeldev.netlify.app/dashboard))

### Prerequisites

-   **Node.js:** Version recommended by the `.nvmrc` file (Requires Node.js 18+). Check with `node -v`.
-   **npm:** Comes with Node.js. Check with `npm -v`.
-   **Git:** For cloning the repository.
-   **(Optional) Gemini API Key:** Required *only* if you intend to run the application locally and use the Kei AI assistant. Needed for the Netlify Function to work.

### Setup

```bash
# Clone the repository
git clone https://github.com/AliKelDev/Alikel-Linkgen.git
cd Alikel-Linkgen

# Install recommended Node.js version (if you use nvm)
nvm use

# Install dependencies
npm install

# Set up environment variables for local development (only needed for AI)
cp .env.example .env
# Edit the .env file in the project root:
# Add your Google Gemini API key like this:
# GEMINI_API_KEY=your_api_key_here

# Start the development server (usually runs on http://localhost:3000)
npm run dev

# To build for production
npm run build
```

### Environment Variables

-   `.env` file (in project root):
    -   `GEMINI_API_KEY`: Your API key for Google Gemini. This allows the `ai-chat.js` Netlify function (or its local development equivalent) to communicate with the AI model. *Note: Using the API may incur costs based on usage.*

## Development Guide

### Project Structure

```
src/
├── App.jsx                 # Main application component
├── main.jsx                # Application entry point
├── assets/                 # Static assets like SVGs
├── components/
│   ├── common/             # Shared UI components (e.g., RoleSelector)
│   ├── features/           # Feature-specific components
│   │   ├── linkGenerator/  # Company search feature
│   │   └── nameGenerator/  # Person name search feature
│   ├── AnimatedBackground.jsx # Main layout, includes header, sidebar logic
│   └── exportDropdown.jsx  # Export functionality UI
├── contexts/
│   └── RoleContext.jsx     # Manages user role state
├── pages/
│   ├── HomePage.jsx        # Main dashboard page
│   └── WelcomePage.jsx     # Landing/introduction page
├── utils/
│   ├── linkUtils/          # URL generation logic for company search by role
│   │   ├── sales.js
│   │   ├── recruiter.js
│   │   └── jobseeker.js
│   └── nameSearchUtils.js  # URL generation logic for individual and bulk name search
└── index.css               # Tailwind base styles and custom CSS

linkforge-extension/         # Chrome extension
├── background.js           # Service worker, message routing
├── linkedin_content_script.js  # LinkedIn data extraction
├── linkforge_content_script.js # LinkForge app bridge
├── manifest.json           # Extension configuration
└── popup.html              # Extension popup UI
```

### Key Components

-   `BulkLinkGenerator.jsx`: Interface for company search.
-   `BulkNameSearch.jsx`: Interface for person name search.
-   `GeneratedLinkCard.jsx`: Displays results for a single company search.
-   `DomainCheckerModal.jsx`: Modal for validating company domains.
-   `AIChatAssistant.jsx`: Kei AI chat interface.
-   `BucketSelector.jsx`: Component for selecting and managing company size buckets.
-   `RoleSelector.jsx`: Allows switching between Sales, Recruiter, Job Seeker roles.
-   `AnimatedBackground.jsx`: Wraps the application, handles layout, sidebar, header, and manages the floating AI chat bubble/window.
-   `HomePage.jsx`: Orchestrates the main dashboard view, including metrics and switching between company/name search.

### Development Commands

-   `npm run dev`: Start the local development server.
-   `npm run build`: Create a production-ready build in the `dist/` folder.
-   `npm run lint`: Run ESLint to check code quality.

### Adding New Features

#### New Role Type

1.  Add the new role key to `ROLES` and its configuration to `ROLE_CONFIGS` in `src/contexts/RoleContext.jsx`.
2.  Create a corresponding link generation utility file in `src/utils/linkUtils/`.
3.  Update UI components (like `RoleSelector.jsx`, potentially `BulkLinkGenerator.jsx`) to recognize and handle the new role.
4.  Define the specific link types for the new role in `BulkLinkGenerator.jsx` (inside `ROLE_LINK_TYPES`).

#### New Search Template (within an existing role)

1.  Add a new link generation function (e.g., `generateNewTypeLink`) in the relevant role file within `src/utils/linkUtils/`.
2.  Update the `generateLinks` function in that same file to include the new type.
3.  Add the new link type and label to the `ROLE_LINK_TYPES` constant in `BulkLinkGenerator.jsx`.
4.  Ensure `GeneratedLinkCard.jsx` can display the new link type correctly (it should work automatically if the structure is consistent).
5.  Add a corresponding "Open All..." button in `BulkLinkGenerator.jsx`.

## Advanced Usage Tips

### Market Segmentation Research

Use the **Company Bucket Selector** to estimate sizes for a list of companies, then export the results (which include the bucket classification) for market analysis or territory planning.

### Conference Preparation

1.  Input companies attending an event into the **Bulk Link Generator**.
2.  Generate links for key roles (e.g., Sales Leaders, Tech Leaders).
3.  Use the **Domain Checker** to quickly find their main websites.
4.  Use **Kei AI Assistant** to get quick summaries or potential talking points for each company.

### Competitive Analysis

1.  Input competitors into the **Bulk Link Generator**.
2.  Use the **Domain Checker** (especially the grid view) to analyze their web presence and branding consistency across TLDs.
3.  Generate links for key departments (e.g., Sales, Engineering) to map their organizational structure.
4.  Ask **Kei** to compare their likely strategies or tech stacks based on available information.

### Automated Data Collection with Extension

1.  Input a large list of target companies in **Bulk Link Generator**.
2.  Click "Open All Dev Links" with 3-second delays.
3.  As each Sales Navigator page loads, the extension captures developer counts automatically.
4.  Review the populated data in LinkForge without manual entry.
5.  Export the complete dataset with all captured metrics.

## What's Next

Planned improvements include:

-   Ability for Kei to remember user-specific information across sessions (like preferred prompts, user's role, company, etc.) similar to profile creation.
-   Exploring more advanced AI capabilities for Kei, potentially analysis of broader market trends or more specific profile analysis (maybe image analysis via Moondream if feasible).
-   Adding more specific search templates based on user needs.
-   Potentially exploring more agentic functions for Kei to perform multi-step tasks.
-   Chrome Web Store publication for easier extension distribution and auto-updates.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

-   Developed by [AliKelDev](https://github.com/AliKelDev)
-   Built with React, Vite, Tailwind CSS, and Netlify Functions.

**NOTE**: I am Alice, it's an Alias. Alice Leiser = Alikel = AKD = Jordan.M, so when Alice Leiser commits something, it's me.
```
