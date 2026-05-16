'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const FALLING_SPEED = 5;
const SPAWN_RATE = 1000;

export default function PizzaGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [items, setItems] = useState<{ id: number; x: number; y: number; type: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerX = useRef(50); // percentage 0-100
  const requestRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  const toppingImages = [
    '/images/topping-tomato.png',
    '/images/topping-mushroom.png',
    '/images/topping-paneer.png',
  ];

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
    setItems([]);
  };

  const updateGame = (time: number) => {
    if (gameOver) return;

    if (time - lastSpawnRef.current > SPAWN_RATE) {
      setItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10, // 10% to 90%
          y: -10,
          type: toppingImages[Math.floor(Math.random() * toppingImages.length)],
        },
      ]);
      lastSpawnRef.current = time;
    }

    setItems((prev) => {
      let activeItems = prev.map((item) => ({ ...item, y: item.y + FALLING_SPEED }));
      
      // Check collision
      const newActive: typeof items = [];
      activeItems.forEach((item) => {
        if (item.y > 85 && item.y < 95) {
          // Player is at playerX.current. If item.x is within +- 10% of playerX, caught!
          if (Math.abs(item.x - playerX.current) < 15) {
            setScore((s) => {
              const newScore = s + 1;
              if (newScore >= 10) setGameOver(true);
              return newScore;
            });
            return; // don't push to newActive, it's caught
          }
        }
        if (item.y < 120) {
          newActive.push(item);
        }
      });
      return newActive;
    });

    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    if (isPlaying && !gameOver) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isPlaying, gameOver]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    playerX.current = Math.max(10, Math.min(90, x));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {!isPlaying && !gameOver && (
        <button 
          onClick={startGame}
          className="w-full py-4 bg-[#D85A30] hover:bg-[#c44f28] text-white rounded-2xl font-bold tracking-wide text-lg transition-all shadow-[0_0_30px_rgba(216,90,48,0.3)]"
        >
          Play 'Catch the Toppings'
        </button>
      )}

      {isPlaying && !gameOver && (
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[300px] bg-black/50 border border-[#333] rounded-2xl overflow-hidden cursor-none"
        >
          <div className="absolute top-4 left-4 text-white font-mono text-xl z-10">
            Score: {score}/10
          </div>
          
          {items.map((item) => (
            <div 
              key={item.id} 
              className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <Image src={item.type} alt="Topping" fill className="object-contain mix-blend-screen" unoptimized />
            </div>
          ))}

          {/* Player Pizza Base */}
          <div 
            className="absolute bottom-4 w-24 h-12 -translate-x-1/2 pointer-events-none"
            style={{ left: `${playerX.current}%` }}
          >
            <Image src="/images/menu-pizza-base.png" alt="Base" fill className="object-contain scale-y-50 mix-blend-screen" unoptimized />
          </div>
        </div>
      )}

      {gameOver && score >= 10 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-[#111] border border-[#D85A30] rounded-2xl p-6 text-center"
        >
          <h3 className="text-2xl font-serif text-[#F5F0E8] mb-2">You Won! 🍕</h3>
          <p className="text-[#888780] mb-4">Use code <strong className="text-[#D85A30]">SUSI10</strong> on Zomato/Swiggy for 10% off!</p>
          <button 
            onClick={startGame}
            className="px-6 py-2 border border-[#333] text-sm text-[#F5F0E8] rounded-full hover:bg-[#333] transition-colors"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
