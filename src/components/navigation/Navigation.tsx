'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: '/assets/home.png', path: '/' },
    { name: 'Bio', icon: '/assets/bio.png', path: '/bio' },
    { name: 'Projects', icon: '/assets/projects.png', path: '/projects' },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div 
        className="flex items-center gap-3 bg-black/20 backdrop-blur-lg p-2 rounded-lg border border-white/10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link href={item.path}>
                  <Button
                    variant={pathname === item.path ? "secondary" : "ghost"}
                    size="icon"
                    className="relative w-10 h-10 rounded-lg transition-all hover:bg-white/10 data-[state=open]:bg-white/10"
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-black/80 border-white/10">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </motion.div>
    </nav>
  );
};

export default Navigation; 