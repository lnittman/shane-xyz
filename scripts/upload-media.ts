import { put } from '@vercel/blob';
import { readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';
import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync } from 'fs';

const execAsync = promisify(exec);
const BLOB_TOKEN = "vercel_blob_rw_78JcsYcAwDld2zEI_hKaKV1GMs1x8btTHHc1eZ16zNz0pai";
const TEMP_DIR = join(process.cwd(), 'temp');

interface UploadResult {
  filename: string;
  url: string;
}

async function compressVideo(inputPath: string): Promise<string> {
  // Create temp directory if it doesn't exist
  if (!existsSync(TEMP_DIR)) {
    await mkdir(TEMP_DIR);
  }

  const outputFilename = `compressed_${inputPath.split('/').pop()}`;
  const outputPath = join(TEMP_DIR, outputFilename);

  try {
    // Compress video with FFmpeg
    // -vcodec libx264: Use H.264 codec
    // -crf 28: Constant Rate Factor (18-28 is a good range, lower means better quality)
    // -preset faster: Encoding speed preset
    // -movflags +faststart: Enable fast start for web playback
    // -vf scale=-2:720: Scale to 720p maintaining aspect ratio
    await execAsync(`ffmpeg -i "${inputPath}" -vcodec libx264 -crf 28 -preset faster -movflags +faststart -vf scale=-2:720 "${outputPath}"`);
    
    return outputPath;
  } catch (error) {
    console.error(`Error compressing video ${inputPath}:`, error);
    // If compression fails, return original path
    return inputPath;
  }
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
        const isVideo = filename.endsWith('.mp4') || filename.endsWith('.mov');
        
        let fileToUpload = filepath;
        if (isVideo) {
          console.log(`Compressing ${filename}...`);
          fileToUpload = await compressVideo(filepath);
        }
        
        const buffer = await readFile(fileToUpload);
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
  } finally {
    // Clean up temp directory if it exists
    if (existsSync(TEMP_DIR)) {
      await execAsync(`rm -rf ${TEMP_DIR}`);
    }
  }
}

uploadMedia(); 