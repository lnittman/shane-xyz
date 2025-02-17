'use client';

import { motion } from 'framer-motion';
import { MediaCard } from '@/components/media/MediaCard';
import { media } from '@/data/media';
import { useState } from 'react';

const categories = [
  { id: 'phony', label: 'Phony', emoji: '📱' },
  { id: 'collider', label: 'Collider', emoji: '🎬' },
  { id: 'stockx', label: 'StockX', emoji: '👟' }
] as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  return (
    <div className="min-h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 inset-x-0 z-10 p-4 bg-gradient-to-b from-black via-black/60 to-transparent"
      >
        <h1 className="text-2xl font-bold text-center mb-4">My Work</h1>
        
        {/* Category Tabs */}
        <div className="flex justify-center gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm
                ${activeCategory === category.id
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Stories Grid */}
      <div className="pt-32 min-h-full">
        <div className="space-y-4 p-4">
          {media[activeCategory as keyof typeof media].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="snap-start snap-always"
            >
              <MediaCard
                item={item}
                type={activeCategory === 'collider' ? 'image' : 'video'}
                size="medium"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 