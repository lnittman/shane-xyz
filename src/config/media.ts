export const mediaUrls = {
  collider: {
    succession: process.env.NEXT_PUBLIC_SUCCESSION_GIF_URL,
    fall: process.env.NEXT_PUBLIC_FALL_GIF_URL,
    short: process.env.NEXT_PUBLIC_SHORT_GIF_URL,
  },
  phony: {
    snapScore: process.env.NEXT_PUBLIC_SNAPSCORE_MOV_URL,
    myAi: process.env.NEXT_PUBLIC_MYAI_MOV_URL,
    cured: process.env.NEXT_PUBLIC_CURED_MOV_URL,
  },
  stockx: {
    brittney: process.env.NEXT_PUBLIC_BRITTNEY_MP4_URL,
    briana: process.env.NEXT_PUBLIC_BRIANA_MP4_URL,
  },
} as const; 