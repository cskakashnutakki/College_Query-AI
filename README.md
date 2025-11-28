# College_Query-AI
An intelligent college research assistant for India powered by Gemini. Ask about IITs, entrance exams, placements, and get real-time, sourced answers.

<div align="center">
<img width="959" height="515" alt="image" src="https://github.com/user-attachments/assets/ad133711-014a-450f-918f-ced3b59c7205" />
</div>

Features
🤖 AI-powered responses using Google's Gemini API
🎓 Comprehensive college information (IITs, NITs, IIITs, Private Universities)
📚 Entrance exam guidance (JEE, NEET, CAT, CUET, GATE)
💼 Placement statistics and campus facilities
🔍 Real-time search with Google grounding for accurate, up-to-date information
📱 Responsive design with modern UI
⚡ Fast and intuitive chat interface

Tech Stack
Frontend: React 19, TypeScript, Tailwind CSS
Build Tool: Vite
AI: Google Gemini 2.5 Flash with Search Grounding
Icons: Lucide React
Deployment: Ready for static hosting

**Prerequisites:**  
Node.js (v18 or higher)
npm or yarn
Google Gemini API key


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Installation

Clone the repository:
```
git clone https://github.com/your-username/collegequery-ai.git
cd collegequery-ai
```
Install dependencies:
```
npm install
```
Create a .env file in the root directory and add your Gemini API key:
```
API_KEY=your_gemini_api_key_here
```
Start the development server:
```
npm run dev
Open http://localhost:5173 in your browser.
```

Usage
Open the application in your browser
Start chatting with the AI assistant
Ask questions about:
College admissions and rankings
Entrance exam preparation
Placement statistics
Campus facilities
Course information
API Configuration
This app uses Google's Gemini API with Search Grounding for accurate, real-time information. Make sure to:

Get your API key from Google AI Studio
Add it to the .env file as API_KEY
Build for Production
```
npm run build
```
The built files will be in the dist directory, ready for deployment to any static hosting service.

Project Structure
```
collegequery-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── AboutModal.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── GroundingSources.tsx
│   │   └── WelcomeScreen.tsx
│   ├── services/
│   │   └── gemini.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── .env
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```
Contributing
```
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
```
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Built with React
Powered by Google Gemini
Styled with Tailwind CSS
Icons from Lucide React


Disclaimer
AI can make mistakes. Verify important admissions information with official university websites.

Made with ❤️ for Indian students




# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally
http://localhost:5173/


