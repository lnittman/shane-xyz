import { put } from '@vercel/blob';
import { readFile } from 'fs/promises';
import { join } from 'path';
import glob from 'glob';

interface UploadResult {
  filename: string;
  url: string;
}

async function uploadMedia() {
  try {
    // Define paths to media directories
    const directories = [
      'public/assets/collider-gifs',
      'public/assets/stockx-videos'
    ];

    // Get all media files
    const files = await Promise.all(
      directories.map(dir => 
        glob(join(process.cwd(), dir, '**/*.(gif|mp4|mov)'))
      )
    );

    const allFiles = files.flat();
    
    // Upload each file to Vercel Blob
    const uploads = await Promise.all(
      allFiles.map(async (filepath: string) => {
        const filename = filepath.split('/').pop()!;
        const buffer = await readFile(filepath);
        
        console.log(`Uploading ${filename}...`);
        
        const blob = await put(filename, buffer, {
          access: 'public',
        });
        
        return {
          filename,
          url: blob.url,
        };
      })
    );

    // Generate media mapping
    const mediaMap = uploads.reduce((acc: Record<string, string>, { filename, url }: UploadResult) => {
      acc[filename] = url;
      return acc;
    }, {});

    console.log('Upload complete! Media URLs:');
    console.log(JSON.stringify(mediaMap, null, 2));

    // TODO: Save this mapping to a file or environment variables
  } catch (error) {
    console.error('Error uploading media:', error);
  }
}

uploadMedia(); 