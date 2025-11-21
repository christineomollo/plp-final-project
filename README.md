# plp-final-project

💖 BurBestie: A Supportive Haven for Women - Project Documentation

"A digital haven built on safety, community, and comprehensive well-being, dedicated to empowering every woman."

Deployment link https://burbestie.onrender.com

Pitch Deck https://docs.google.com/presentation/d/1Fga4f7qilbwqhijk0s62gWDuMrIFUXx8Tzbci3XjrNk/edit?usp=sharing


Project Overview

BurBestie is an interactive, full-stack web platform meticulously designed to serve as a secure and empowering digital space for women, affectionately known within the community as "Besties." The core mission is to provide essential, accessible tools for holistic well-being, encompassing mental resilience, trusted community support, and personal security resources. By integrating these critical components, the platform aims to actively foster genuine, supportive connections and strengthen the collective confidence of its users globally.

This project is fundamentally rooted in its commitment to the United Nations Sustainable Development Goals (SDG). It directly contributes to:

SDG 5: Gender Equality, by establishing a dedicated, secure environment that combats isolation, provides immediate recourse via the SOS feature, and promotes safe peer-to-peer collaboration, thus enhancing the overall security and independence of women.

SDG 3: Good Health and Well-being, by offering proactive and preventive mental health care solutions. This includes daily psychological nourishment (affirmations) and scientifically informed articles that address the unique physiological and emotional needs of women. The platform represents a continuous resource for maintaining emotional equilibrium and physical health.

Key Features and Interactive Support

1. Daily Wellness Hub (Affirmations & Holistic Articles): This is the heart of the platform's focus on proactive mental health and self-care. It moves beyond generic content by offering highly personalized, functional, and supportive information through three distinct, critical areas:

- Menstrual Health Insight: Provides detailed, phase-by-phase education on the menstrual cycle (Follicular, Ovulatory, Luteal, and Menstrual). Articles meticulously outline how these hormonal shifts influence daily life, energy levels, and emotional state. For instance, specific guidance is offered on moods expected during the Luteal phase (often characterized by pre-menstrual symptoms like irritability or fatigue), coupled with actionable self-care strategies to mitigate these effects and navigate monthly cycles effectively with greater self-awareness.

- Guided Exercises for Mental Clarity: Features quick, low-impact, and highly accessible fitness routines, such as mindful Pilates and specific Yoga flows, explicitly designed to clear the mind, reduce cortisol levels associated with stress, and improve both physical and psychological well-being. These routines are presented with simulated visual instructions within the article modal to ensure ease of practice regardless of the user's prior experience or physical setting.

-Nutrition for Women's Health: Focuses on practical, digestible articles dedicated to dietary insights that specifically aid women's digestion and promote radiant skin health. This content emphasizes the critical gut-skin axis, recommending food groups and habits that reduce inflammation, support balanced gut flora, and address common digestive issues unique to women, thereby linking internal health directly to external appearance and well-being.

2. Community Circle (Collaborative Chat): This feature provides a secure, moderated peer-support channel, ensuring that Besties can connect authentically without fear of judgment. The underlying technical architecture utilizes HTTP Polling for synchronization, which regularly fetches new messages (every 3 seconds). This method, chosen to be robust and prevent browser hanging without requiring complex multi-file Socket.io infrastructure, ensures a reliable, real-time feel to the conversational flow, fostering mutual support and shared experiences.

3. SOS Button/Form: Designed as the platform's primary security measure, this feature establishes a critical, direct channel for help. It allows any Bestie experiencing distress or threat to securely and discreetly send an urgent alert or request specific resources. In a full deployment, the collected details would be prioritized and instantly routed to localized emergency services or a dedicated moderation team, fulfilling a vital role in the project's SDG commitment to safety.

4. Secure Authentication: User access to the community and sensitive content is strictly controlled via a robust registration and login system. This utilizes international phone numbers with OTP (One-Time Password) verification, which is a high-security, low-friction method. Upon successful verification, the backend issues a JSON Web Token (JWT), which is required for all subsequent authenticated API calls, ensuring that the protected community and personalized content remain exclusively accessible to verified users.

Technology Stack Architecture

The BurBestie application is engineered as a modern MERN-stack hybrid, leveraging a powerful separation of concerns for scalability and maintainability.

Area        Technology           Purpose

Frontend     React.js            Provides the structure for the highly interactive and dynamic single-page application (SPA). React's component-based nature ensures reusable                                   UI elements and a state-driven approach for fast, engaging user experiences.

Styling      Tailwind CSS        Used extensively for rapid, responsive design implementation. The use of utility classes ensures a consistent, femme-friendly, and                                             aesthetically pleasing visual identity that adapts perfectly across all devices (mobile, tablet, desktop).

Backend      Node.js (Express)   Forms the robust foundation for the RESTful API, handling business logic, authentication, and data routing efficiently.


Database     MongoDB             A scalable NoSQL database, perfectly suited for storing the varied structure of wellness articles, flexible user profiles, and high-volume,                                    time-stamped chat messages.

ODM         Mongoose             Provides a structured layer over MongoDB, enforcing schemas for users (User.js), content (Content.js), and chat logs (ChatMessage.js), which                                   significantly improves data integrity and query efficiency.


Middleware  CORS & JSON/Auth    ORS middleware is essential for securely enabling communication between the frontend (typically port 3000) and the backend (port 5000), while                                  built-in Express middleware handles the parsing of JSON bodies and JWT verification for protected routes.



🚀 Getting Started: Developer Quick-Start Guide

To deploy and run the BurBestie application locally, follow these sequential steps for both the API and the client:

1. BACKEND SETUP (PORT 5000)


1.Project Initialization: Navigate to your desired project directory and ensure you have a standard package.json file ready.

2.Dependency Installation: Install all necessary core libraries and the development dependency for automatic server reloading:

npm install express mongoose jsonwebtoken bcrypt cors dotenv
npm install -D nodemon



3.Environment Configuration: Create a .env file in the root directory. You must populate this file with your MongoDB connection string and a strong, secret key for JWT creation:

MONGO_URI="mongodb+srv://<user>:<password>@<cluster-url>/burBestieDB?retryWrites=true&w=majority"
JWT_SECRET="YOUR_SUPER_SECURE_32_CHAR_SECRET_KEY"



4.Run the API Server: Launch the server using nodemon to automatically track changes during development:

npx nodemon server.js
# Success message will confirm the Server is running on http://localhost:5000



5. Initial Data Load (Crucial Step): The database starts empty. To make the dashboard functional, you must manually trigger the data seeding endpoint. Use Postman or a similar tool to send a POST request (with an empty body) to:
http://localhost:5000/api/content/seed
This action populates the MongoDB collections with all the required affirmations, articles (menstrual health, exercise), and diet insights.

2. FRONTEND SETUP (REACT CLIENT)

1. Client Environment: Start a standard React project. The provided App.jsx file contains the complete application logic, components, and router, ready to replace the default main file (e.g., App.js or App.jsx) in your setup.

2. Frontend Dependencies: Install libraries required for routing and iconography:

npm install react-router-dom lucide-react



3. Run the Client: Start the React development server:

npm start
# The BurBestie client will be accessible at http://localhost:3000 (default)



Security Note: The current OTP system is a mock implementation for development purposes. For a production deployment, the OTP generation and sending functionality within routes/authRoutes.js must be replaced with a secure, external service integration (e.g., Twilio Programmable Messaging or a cloud-based authentication service like Firebase Authentication) to handle actual secure SMS delivery and phone number verification.
