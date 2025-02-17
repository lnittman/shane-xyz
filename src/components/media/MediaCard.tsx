'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface MediaItem {
  src: string;
  title: string;
  description: string;
  aspectRatio: string;
  link?: string;
}

interface MediaCardProps {
  item: MediaItem;
  type: 'image' | 'video';
  size?: 'small' | 'medium' | 'large';
  showLink?: boolean;
}

export const MediaCard = ({ item, type, size = 'medium', showLink = true }: MediaCardProps) => {
  if (!item?.src) return null;

  const Content = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      {type === 'image' ? (
        <Image
          src={item.src}
          alt={item.title || 'Project media'}
          fill
          className="object-cover"
          unoptimized
          priority
        />
      ) : (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10">
        <div className="space-y-3 max-w-2xl">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white font-semibold text-2xl tracking-tight"
          >
            {item.title}
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-base leading-relaxed font-medium"
          >
            {item.description}
          </motion.p>
          {showLink && item.link && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium text-white">View Story</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );

  const containerClasses = `
    relative rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm
    ${size === 'large' ? 'h-[85vh]' : size === 'medium' ? 'h-[70vh]' : 'h-[50vh]'}
    ${item.link ? 'cursor-pointer' : ''}
    snap-start snap-always
  `;

  if (item.link && showLink) {
    return (
      <Link href={item.link} className="block">
        <motion.div
          className={containerClasses}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          transition={{ 
            duration: 0.3,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          <Content />
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <Content />
    </motion.div>
  );
}; 