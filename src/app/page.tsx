'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

function Hero() {
  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center px-4 py-4 sm:p-0 overflow-hidden">
      {/* Main card */}
      <motion.div
        className="relative rounded-2xl p-3 sm:p-4 md:p-8 w-full max-w-2xl mx-auto overflow-hidden select-none"
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: '1200px',
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-6 md:gap-8">
          {/* Logo section */}
          <motion.div
            className="relative mb-2 sm:mb-4 md:mb-6 cursor-pointer w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1]
            }}
            style={{ transform: 'translateZ(40px)' }}
            whileHover={{ 
              scale: 1.05,
              transition: { 
                type: "spring",
                stiffness: 500,
                damping: 15,
                restDelta: 0.001
              }
            }}
            whileTap={{
              scale: 0.95,
              rotate: -8,
              x: 10,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 8,
                mass: 0.8
              }
            }}
          >
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={112}
              height={112}
              className="w-full h-full object-contain relative z-10 select-none touch-none pointer-events-none"
              priority
              draggable={false}
              quality={95}
            />
          </motion.div>

          {/* Personal narrative */}
          <div className="relative z-10 w-full flex flex-col gap-1.5 landscape:gap-2 sm:gap-3 md:gap-4 font-mono text-[10px] landscape:text-[9px] sm:text-sm select-none">
            <motion.div 
              className="flex flex-col gap-0.5 landscape:gap-1 sm:gap-2 px-2 sm:px-4 md:px-6 py-1 landscape:py-1 sm:py-2 md:py-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-base landscape:text-sm sm:text-xl md:text-2xl lg:text-3xl font-mono tracking-tight relative select-none">
                digital media + content strategy
              </span>
              <span className="text-[rgb(var(--text-primary))] leading-relaxed text-sm landscape:text-xs sm:text-lg md:text-xl lg:text-2xl select-none">
                crafting engaging narratives and building online communities
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero />
    </div>
  );
}
