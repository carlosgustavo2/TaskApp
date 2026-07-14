import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home';

function App() {
  return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
            <Home />
        </div>
    );
}

export default App
