# TypeIt - Typing Game

TypeIt is an engaging and challenging typing game built using React and powered by Firebase. Sharpen your typing skills, improve your accuracy, and compete against your friends to achieve the highest scores. This README provides a comprehensive guide on how to set up, install, and run the game, as well as an overview of its features.

## Features

- **Typing Practice**: TypeIt provides an interactive and fun way to practice your typing skills. Improve your speed and accuracy with various game modes and difficulty levels.

- **Firebase Integration**: Scores and user data are stored securely in Firebase, allowing you to keep track of your progress and compete with others.

- **Real-time Leaderboard**: Compete against other players in real-time and see who can type the fastest. The leaderboard updates dynamically as new scores are submitted.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/typeit.git
cd typeit
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Create a Firebase project at https://console.firebase.google.com.
   - Add a new web app to your project and copy the Firebase configuration.
   - Create a `.env` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Run the development server:

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser to play the game.

## How to Play

1. Choose a game mode from the main menu.
2. Start typing the displayed text as fast and accurately as you can.
3. Once you finish, your score will be submitted to the leaderboard if you are signed in.
