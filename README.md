# Social Activities Client  
*A front-end application for browsing and participating in social activities*

## Table of Contents  
- [About](#about)  
- [Features](#features)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Configuration](#configuration)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)  

---

## About  
This project is the client (front-end) portion of a social activities application. The goal is to provide a user-friendly interface where users can browse, join, create, and manage social activities (events, meet-ups, groups) easily.  
It’s built using modern web technologies (for example React + Vite) for a fast and responsive experience.

## Features  
Here are some of the main features included (and planned) in this version of the client:

- User Authentication: Login / Sign up workflows (assuming backend support)  
- Browse Activities: View a list of upcoming or available social activities  
- Activity Detail: View detailed information about a specific activity (time, location, description)  
- Create Activity: Authenticated users can create a new social activity (event, group meet-up)  
- Join / Leave Activity: Users can join an activity or opt out  
- Manage Own Activities: Users can view/manage the activities they created (edit, cancel)  
- Search & Filter: Filter activities by date, category, location (if supported)  
- Responsive Design: Works across devices (desktop, tablet, mobile)  
- Client-side Routing: Smooth navigation through pages/views  
- State Management: Efficiently handle UI state (authentication, user profile, activity list)  
- Environment Configuration: Use environment variables for API endpoints, etc  
- Linting & Code Quality: ESLint setup for maintaining consistent code style  

## Getting Started  

### Prerequisites  
- Node.js (e.g., version 16.x or newer)  
- npm or yarn  
- A running backend API that the client can talk to (you’ll need the endpoint URL)  

### Installation  
```bash
# Clone the repository
git clone https://github.com/sadikaafrin/social-activities-client.git
cd social-activities-client

# Install dependencies
npm install
# or
yarn install
Running the App
# Start the development server
npm run dev
# or
yarn dev