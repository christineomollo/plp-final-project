# plp-final-project
💖 BurBestie: A Supportive Haven for Women

"A digital haven for every woman's well-being and security."

Project Overview

BurBestie is an interactive web platform designed to be a safe and empowering space for women, affectionately referred to as "Besties." It focuses on providing essential tools for mental wellness, community support, and personal development.

This project directly contributes to the United Nations Sustainable Development Goal (SDG) 5: Gender Equality, and SDG 3: Good Health and Well-being, by promoting mental health, fostering supportive communities, and offering immediate assistance to women in crisis.

Key Features

1.Daily Wellness Hub (Affirmations & Articles): Curated content for emotional resilience and positive mental health.

2.Community Circle (Collaborative Chat): A secure space for Besties to foster mutual support, share experiences, and connect in real-time.

3. SOS Button/Form: A critical emergency function allowing any Bestie in distress to securely send an urgent alert or request help/resources.

4. Secure Authentication: Login using international phone numbers with OTP verification (simulated for demonstration) to ensure user security.

Technology Stack

| Area | Technology | Purpose |
| Frontend | React.js | Interactive and component-based user interface. |
| Styling | Tailwind CSS | Utility-first framework for rapid, responsive, and femme-friendly styling. |
| Backend | Node.js (Express) | Fast, unopinionated server-side framework. |
| Database | MongoDB | Flexible, scalable NoSQL database for content and user data. |
| ODM | Mongoose | Elegant MongoDB object modeling for Node.js. |
| Middleware | CORS | Handling cross-origin requests between frontend and backend. |

🚀 Getting Started

1. Backend Setup (port 5000)

Clone the files.

Initialize Project: Create a project directory and a package.json.

Install Dependencies:

npm install express mongoose jsonwebtoken bcrypt cors dotenv
npm install -D nodemon




Database: Ensure you have a MongoDB instance running (local or Atlas) and update the connection string in the generated db.js file.

Run Server:

npx nodemon server.js
# Server will run on http://localhost:5000




2. Frontend Setup (React)

The frontend is a single file (App.jsx). Run a standard React project (e.g., created with Vite or Create React App) and replace the default content of the main component file with the contents of the generated App.jsx.

Install Frontend Dependencies:

npm install react-router-dom lucide-react



Run Client:

npm start
# Client will run on http://localhost:3000 (default)

