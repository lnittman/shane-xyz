import { MediaItem } from '@/components/media/MediaCard';

export const media = {
  collider: [
    {
      src: '/Collider_Gifs/succession_text_animation_fixed.gif',
      title: 'Succession Character Analysis',
      description: 'In-depth analysis piece with high search ranking achievement and strong reader engagement',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      src: '/Collider_Gifs/fall_text_animation_fixed.gif',
      title: 'Fall Movies Guide',
      description: 'Seasonal content strategy with optimized SEO and trending topic coverage',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      src: '/Collider_Gifs/short_text_animation.gif',
      title: 'Short Animation',
      description: 'Engaging animated content for enhanced user interaction',
      aspectRatio: 'aspect-[4/3]'
    }
  ],
  phony: [
    {
      src: '/SnapScore.mov',
      title: 'SnapScore',
      description: 'Viral content series showcasing innovative storytelling formats',
      aspectRatio: 'aspect-[9/16]'
    },
    {
      src: '/MyAI.mov',
      title: 'My AI',
      description: 'Interactive narrative exploring AI-driven conversations',
      aspectRatio: 'aspect-[9/16]'
    },
    {
      src: '/Cured.mov',
      title: 'Cured',
      description: 'Strategic content series with high engagement metrics',
      aspectRatio: 'aspect-[9/16]'
    }
  ],
  stockx: [
    {
      src: '/What Drives Brittney Elena _ StockX.mp4',
      title: 'What Drives Brittney Elena',
      description: 'Feature profile highlighting influential personalities in streetwear culture',
      aspectRatio: 'aspect-video'
    },
    {
      src: '/Briana King Joins StockX.mp4',
      title: 'Briana King Joins StockX',
      description: 'Brand storytelling campaign featuring community leaders',
      aspectRatio: 'aspect-video'
    }
  ]
} as const; 