# Weather App

A simple and elegant weather forecast application built with **React**, **TypeScript**, and **Tailwind CSS**.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API Key**:
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Features

- **Real-time Data**: Current weather from OpenWeatherMap API.
- **Dynamic Backgrounds**: UI colors adapt to the current weather condition.
- **Caching**: Weather data is cached for 10 minutes to optimize API usage.
- **Responsive**: Fully optimized for both desktop and mobile.
- **Recent Stack**: Built with Vite, TypeScript, and Tailwind CSS.

## ⚠️ Security Note

In a real production environment, API keys should effectively be hidden by using a backend proxy (Node.js/Express) to handle requests.
For the purpose of this test task:
1. The API key is stored in `.env` for client-side usage.
2. The `.env` file is intentionally included in the repository to make it easier for reviewers to run the project immediately.

