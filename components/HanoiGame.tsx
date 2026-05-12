import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react';

interface HanoiGameProps {
  onBack: () => void;
}

export const HanoiGame: React.FC<HanoiGameProps> = ({ onBack }) => {
  const [numDisks, setNumDisks] = useState<number>(3);
  const [towers, setTowers] = useState<number[][]>([[], [], []]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initGame(numDisks);
  }, [numDisks]);

  const initGame = (disks: number) => {
    const initialTower = Array.from({ length: disks }, (_, i) => disks - i);
    setTowers([initialTower, [], []]);
    setSelectedTower(null);
    setMoves(0);
    setIsWon(false);
  };

  const handleTowerClick = (towerIndex: number) => {
    if (isWon) return;

    if (selectedTower === null) {
      // Select a tower if it has disks
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      // Try to move
      if (selectedTower === towerIndex) {
        // Deselect
        setSelectedTower(null);
      } else {
        const sourceTower = towers[selectedTower];
        const destTower = towers[towerIndex];
        const diskToMove = sourceTower[sourceTower.length - 1];
        const topDestDisk = destTower.length > 0 ? destTower[destTower.length - 1] : null;

        if (topDestDisk === null || diskToMove < topDestDisk) {
          // Valid move
          const newTowers = [...towers];
          newTowers[selectedTower] = sourceTower.slice(0, -1);
          newTowers[towerIndex] = [...destTower, diskToMove];
          setTowers(newTowers);
          setMoves(moves + 1);
          setSelectedTower(null);

          // Check win
          if (newTowers[2].length === numDisks) {
            setIsWon(true);
          }
        } else {
          // Invalid move, just deselect
          setSelectedTower(null);
        }
      }
    }
  };

  const getDiskColor = (size: number) => {
    const colors = [
      'bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-green-500', 'bg-blue-500'
    ];
    return colors[(size - 1) % colors.length];
  };

  const getDiskWidth = (size: number) => {
    return `${30 + size * 12}%`;
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm hover:shadow text-gray-500">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl md:text-3xl font-black text-gray-800">Tháp Hà Nội</h2>
        <button onClick={() => initGame(numDisks)} className="p-2 bg-white rounded-xl shadow-sm hover:shadow text-blue-500">
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm mb-6 flex flex-col items-center">
        <div className="flex gap-4 mb-8">
          {[3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => setNumDisks(n)}
              className={`px-4 py-2 rounded-xl font-bold transition ${numDisks === n ? 'bg-indigo-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {n} Vòng
            </button>
          ))}
        </div>

        <div className="text-lg font-bold text-gray-600 mb-8">
          Số bước di chuyển: <span className="text-indigo-600">{moves}</span>
        </div>

        <div className="flex justify-between w-full max-w-2xl h-64 items-end relative">
          {towers.map((tower, tIndex) => (
            <div 
              key={tIndex} 
              className={`flex-1 flex flex-col items-center justify-end relative h-full cursor-pointer group ${selectedTower === tIndex ? 'bg-indigo-50/50 rounded-t-3xl' : ''}`}
              onClick={() => handleTowerClick(tIndex)}
            >
              {/* Peg */}
              <div className="absolute bottom-0 w-4 h-56 bg-amber-700/50 rounded-t-full z-0 group-hover:bg-amber-700/70 transition"></div>
              
              {/* Base */}
              <div className="w-full h-4 bg-amber-800 rounded-full z-10"></div>

              {/* Disks */}
              <div className="absolute bottom-4 w-full flex flex-col-reverse items-center z-20 gap-1">
                {tower.map((disk, dIndex) => {
                  const isTop = dIndex === tower.length - 1;
                  const isSelected = selectedTower === tIndex && isTop;
                  return (
                    <motion.div
                      key={disk}
                      layoutId={`disk-${disk}`}
                      className={`h-8 rounded-full border-2 border-black/10 shadow-sm ${getDiskColor(disk)} ${isSelected ? 'ring-4 ring-indigo-400 ring-offset-2' : ''}`}
                      style={{ width: getDiskWidth(disk) }}
                      animate={{ y: isSelected ? -20 : 0 }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isWon && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 border-2 border-green-400 p-6 rounded-3xl text-center"
        >
          <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-green-800 mb-2">Chúc mừng bé!</h3>
          <p className="text-green-700 font-bold">Bé đã giải xong tháp {numDisks} vòng trong {moves} bước.</p>
          <button 
            onClick={() => initGame(numDisks)}
            className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition shadow-md"
          >
            Chơi lại nào!
          </button>
        </motion.div>
      )}
    </div>
  );
};
