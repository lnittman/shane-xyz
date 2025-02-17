import { put } from '@vercel/blob';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';

const BLOB_TOKEN = "vercel_blob_rw_78JcsYcAwDld2zEI_hKaKV1GMs1x8btTHHc1eZ16zNz0pai";

interface UploadResult {
  filename: string;
  url: string;
}

async function uploadMedia() {
  try {
    const mediaFiles = {
      collider: [
        'public/assets/collider-gifs/succession_text_animation_fixed.gif',
        'public/assets/collider-gifs/fall_text_animation_fixed.gif',
        'public/assets/collider-gifs/short_text_animation.gif'
      ],
      stockx: [
        'public/assets/stockx-videos/What Drives Brittney Elena _ StockX.mp4',
        'public/assets/stockx-videos/Briana King Joins StockX.mp4',
        'public/assets/stockx-videos/Behind the Streams with Sydeon _ Welcome to StockX (1).mp4'
      ]
    };

    const allFiles = [...mediaFiles.collider, ...mediaFiles.stockx];
    
    // Upload each file to Vercel Blob
    const uploads = await Promise.all(
      allFiles.map(async (filepath: string) => {
        const filename = filepath.split('/').pop()!;
        const buffer = await readFile(filepath);
        
        console.log(`Uploading ${filename}...`);
        
        const blob = await put(filename, buffer, {
          access: 'public',
          token: BLOB_TOKEN
        });
        
        return {
          filename,
          url: blob.url,
        };
      })
    );

    // Generate media mapping
    const mediaMap = uploads.reduce((acc: Record<string, string>, { filename, url }: UploadResult) => {
      // Map filenames to environment variable names
      const envMapping: Record<string, string> = {
        'succession_text_animation_fixed.gif': 'NEXT_PUBLIC_SUCCESSION_GIF_URL',
        'fall_text_animation_fixed.gif': 'NEXT_PUBLIC_FALL_GIF_URL',
        'short_text_animation.gif': 'NEXT_PUBLIC_SHORT_GIF_URL',
        'What Drives Brittney Elena _ StockX.mp4': 'NEXT_PUBLIC_BRITTNEY_MP4_URL',
        'Briana King Joins StockX.mp4': 'NEXT_PUBLIC_BRIANA_MP4_URL',
        'Behind the Streams with Sydeon _ Welcome to StockX (1).mp4': 'NEXT_PUBLIC_SYDEON_MP4_URL'
      };

      const envName = envMapping[filename];
      if (envName) {
        acc[envName] = url;
      }
      return acc;
    }, {});

    console.log('Upload complete! Add these to your .env.local file:');
    Object.entries(mediaMap).forEach(([key, value]) => {
      console.log(`${key}="${value}"`);
    });

  } catch (error) {
    console.error('Error uploading media:', error);
  }
}

uploadMedia(); 