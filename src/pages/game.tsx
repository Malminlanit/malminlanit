import React, { useEffect, useRef, useState } from 'react';

export default function MalmiRace() {
  const canvasRef = useRef(null);
  const [car, setCar] = useState({ x: 180, y: 350, width: 40, height: 60 });
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const moveCar = (e) => {
      if (e.key === 'ArrowLeft' && car.x > 0) {
        setCar((prev) => ({ ...prev, x: prev.x - 20 }));
      } else if (e.key === 'ArrowRight' && car.x < width - car.width) {
        setCar((prev) => ({ ...prev, x: prev.x + 20 }));
      }
    };
    window.addEventListener('keydown', moveCar);

    const createObstacle = () => {
      const obstacleX = Math.random() * (width - 30);
      setObstacles((prev) => [...prev, { x: obstacleX, y: 0, width: 30, height: 30 }]);
    };

    const checkCollision = (car, obstacle) => {
      return (
        car.x < obstacle.x + obstacle.width &&
        car.x + car.width > obstacle.x &&
        car.y < obstacle.y + obstacle.height &&
        car.y + car.height > obstacle.y
      );
    };

    const gameLoop = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, width, height);

      // Draw car
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(car.x, car.y, car.width, car.height);

      // Draw obstacle
      setObstacles((prev) => {
        return prev.map((obstacle) => ({ ...obstacle, y: obstacle.y + 4 }));
      });

      obstacles.forEach((obstacle) => {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (checkCollision(car, obstacle)) {
          setGameOver(true);
        }
      });

      // Remove obstacles that have gone off-screen
      setObstacles((prev) => prev.filter((obstacle) => obstacle.y < height));

      // Update score
      setScore((prev) => prev + 1);

      requestAnimationFrame(gameLoop);
    };

    const interval = setInterval(createObstacle, 1500);
    gameLoop();

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', moveCar);
    };
  }, [car, obstacles, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Malmi Race</h1>
      <p className="text-xl mb-2">Pisteet: {score}</p>
      {gameOver && <p className="text-red-400 text-2xl">Peli ohi! 🚗💥</p>}
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-4 border-green-400 rounded-xl bg-gray-800"
      />
    </div>
  );
}
