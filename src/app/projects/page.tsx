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
    <div className="min-h-full pt-20 pb-32">
      {/* Category Switcher */}
      <div className="flex justify-center mb-8">
        <motion.div 
          className="flex items-center gap-2 bg-black/20 backdrop-blur-lg p-2 rounded-lg border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${activeCategory === category.id
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Stories Grid */}
      <div className="px-4 space-y-4">
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
  );
} 