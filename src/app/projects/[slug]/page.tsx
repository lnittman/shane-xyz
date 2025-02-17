'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { media } from '@/data/media';
import { MediaCard } from '@/components/media/MediaCard';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Flatten media items and add category info
const allMedia = Object.entries(media).flatMap(([category, items]) =>
  items.map(item => ({
    ...item,
    category,
    slug: item.src.split('/').pop()?.replace(/\.[^/.]+$/, '')
  }))
);

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = allMedia.find(item => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-zinc-600 hover:text-zinc-900">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const categoryColors = {
    collider: 'bg-blue-100 text-blue-800',
    phony: 'bg-yellow-100 text-yellow-800',
    stockx: 'bg-green-100 text-green-800'
  };

  const categoryLabels = {
    collider: 'Entertainment Media',
    phony: 'Social Media',
    stockx: 'Brand Content'
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <div className="space-y-8">
        <motion.div variants={item} className="space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center text-zinc-600 hover:text-zinc-900"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Projects
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <div className="flex items-center gap-2">
              <span className={`text-sm px-2 py-1 rounded-full ${categoryColors[project.category as keyof typeof categoryColors]}`}>
                {categoryLabels[project.category as keyof typeof categoryLabels]}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="max-w-3xl">
          <MediaCard
            item={project}
            type={project.category === 'collider' ? 'image' : 'video'}
            size="large"
            showLink={false}
          />
        </motion.div>

        <motion.div variants={item} className="prose prose-zinc max-w-3xl">
          <h2>About this Project</h2>
          <p className="text-lg text-zinc-600">{project.description}</p>
          
          {/* Add more project details here based on category */}
          {project.category === 'collider' && (
            <>
              <h3>Content Strategy</h3>
              <ul>
                <li>SEO-optimized content creation</li>
                <li>Trending topic analysis</li>
                <li>Reader engagement optimization</li>
                <li>Search visibility enhancement</li>
              </ul>
            </>
          )}

          {project.category === 'phony' && (
            <>
              <h3>Social Media Impact</h3>
              <ul>
                <li>Viral content creation</li>
                <li>Audience engagement metrics</li>
                <li>Platform-specific optimization</li>
                <li>Community growth strategies</li>
              </ul>
            </>
          )}

          {project.category === 'stockx' && (
            <>
              <h3>Brand Storytelling</h3>
              <ul>
                <li>Profile development</li>
                <li>Visual narrative creation</li>
                <li>Brand message alignment</li>
                <li>Multi-platform distribution</li>
              </ul>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
} 