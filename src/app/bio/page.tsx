'use client';

import { motion } from 'framer-motion';
import { MediaCard } from '@/components/media/MediaCard';
import { media } from '@/data/media';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Bio() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={item} className="space-y-4">
        <h1 className="text-4xl font-bold">Professional Journey</h1>
        <h2 className="text-xl text-zinc-600">A Timeline of Digital Innovation</h2>
      </motion.div>

      <div className="space-y-12">
        <motion.section variants={item} className="relative pl-8 pb-12 border-l-2 border-zinc-200">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-zinc-200" />
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Content Manager at Phony Texts</h3>
              <p className="italic text-zinc-600">Present Role</p>
              <p className="text-zinc-600">
                In the fast-paced world of digital storytelling, I've found my stride managing Tiny Texts, 
                a Snapchat powerhouse with over 3.4M followers. Here, storytelling happens through the intimate 
                lens of text messages, creating narratives that feel authentically personal and irresistibly engaging.
              </p>
              <ul className="space-y-2 text-zinc-600">
                <li>• Spearheaded creative direction leading to 90% viewership growth</li>
                <li>• Cultivated an engaged audience of 44.2K+ new followers</li>
                <li>• Generated 6.56M+ views through strategic content optimization</li>
                <li>• Developed innovative story formats based on performance analytics</li>
                <li>• Mentored writing team in crafting compelling dialogue and narratives</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {media.phony.map((item) => (
                <MediaCard key={item.title} item={item} type="video" size="small" showLink={false} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} className="relative pl-8 pb-12 border-l-2 border-zinc-200">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-zinc-200" />
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">SEO Writer at Collider</h3>
              <p className="italic text-zinc-600">Previous Role</p>
              <p className="text-zinc-600">
                At Collider, I mastered the art of balancing creative storytelling with technical SEO expertise. 
                My role involved crafting engaging content about film and television while ensuring maximum search 
                visibility and reader engagement.
              </p>
              <ul className="space-y-2 text-zinc-600">
                <li>• Created high-performing articles on trending entertainment topics</li>
                <li>• Implemented data-driven SEO strategies to increase organic traffic</li>
                <li>• Developed comprehensive content calendars aligned with search trends</li>
                <li>• Specialized in long-form analytical pieces and engaging listicles</li>
                <li>• Built a reputation for insightful, well-researched entertainment coverage</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {media.collider.map((item) => (
                <MediaCard key={item.title} item={item} type="image" size="small" showLink={false} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} className="relative pl-8 pb-12 border-l-2 border-zinc-200">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-zinc-200" />
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Production Assistant at StockX</h3>
              <p className="italic text-zinc-600">Previous Role</p>
              <p className="text-zinc-600">
                My time at StockX put me at the intersection of creative production and brand storytelling. 
                Working on digital campaigns required precise attention to detail and strong collaborative skills.
              </p>
              <ul className="space-y-2 text-zinc-600">
                <li>• Managed end-to-end production logistics for digital campaigns</li>
                <li>• Coordinated with cross-functional teams including photographers and directors</li>
                <li>• Ensured brand consistency across all produced content</li>
                <li>• Assisted in location scouting and shoot organization</li>
                <li>• Contributed to successful campaign launches and content rollouts</li>
              </ul>
            </div>
            <div className="space-y-4">
              {media.stockx.map((item) => (
                <MediaCard key={item.title} item={item} type="video" size="small" showLink={false} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} className="relative pl-8 border-l-2 border-zinc-200">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-zinc-200" />
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Freelance Email Copywriter at Cappuccino Man</h3>
            <p className="italic text-zinc-600">Previous Role</p>
            <p className="text-zinc-600">
              As a freelance copywriter, I refined Cappuccino Man's customer communications through strategic 
              email template optimization.
            </p>
            <ul className="space-y-2 text-zinc-600">
              <li>• Revamped B2C email templates for improved clarity and engagement</li>
              <li>• Developed brand-aligned tone of voice guidelines</li>
              <li>• Increased email response rates through targeted messaging</li>
              <li>• Created templates that balanced professionalism with approachability</li>
              <li>• Delivered measurable improvements in customer communication effectiveness</li>
            </ul>
          </div>
        </motion.section>
      </div>

      <motion.section variants={item} className="space-y-8">
        <h3 className="text-2xl font-semibold">Skills & Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-xl font-medium">Content Strategy</h4>
            <ul className="space-y-2 text-zinc-600">
              <li>• Digital Media Management</li>
              <li>• Content Optimization</li>
              <li>• Audience Growth</li>
              <li>• Performance Analytics</li>
              <li>• Narrative Development</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium">Technical</h4>
            <ul className="space-y-2 text-zinc-600">
              <li>• SEO Best Practices</li>
              <li>• Content Management Systems</li>
              <li>• Analytics Tools</li>
              <li>• Production Management</li>
              <li>• Email Marketing</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-medium">Creative</h4>
            <ul className="space-y-2 text-zinc-600">
              <li>• Copywriting</li>
              <li>• Story Development</li>
              <li>• Brand Voice</li>
              <li>• Creative Direction</li>
              <li>• Visual Storytelling</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
} 