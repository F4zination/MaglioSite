# Quick Start Guide

## What's Included

This repository is fully set up with:

✅ **SvelteKit 2.x** - Modern, fast web framework  
✅ **TypeScript** - Type-safe development  
✅ **Tailwind CSS 3.x** - Utility-first CSS framework  
✅ **adapter-node** - Node.js server deployment  
✅ **Docker** - Containerized deployment ready  
✅ **HLS Video Conversion** - MP4 to HLS conversion script  
✅ **VideoPlayer Component** - Ready-to-use HLS video player  

## Immediate Next Steps

### 1. Verify Everything Works

```bash
# Install dependencies
npm install

# Type check
npm run check

# Build the project
npm run build

# Preview production build
npm run preview
```

### 2. Start Development

```bash
# Start dev server with hot reload
npm run dev

# Open http://localhost:5173
```

### 3. Customize Your Portfolio

Edit these files to make it yours:

- `src/routes/+page.svelte` - Home page content
- `src/app.css` - Global styles (or add custom Tailwind)
- `tailwind.config.js` - Tailwind theme customization
- `static/` - Add your images, fonts, etc.

### 4. Add Videos (Optional)

```bash
# 1. Add MP4 files to videos/raw/
cp your-video.mp4 videos/raw/

# 2. Convert to HLS format
npm run convert:videos

# 3. Converted files appear in videos/hls/
# These files are committed to Git
```

### 5. Use the VideoPlayer Component

```svelte
<script>
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
</script>

<VideoPlayer videoId="your-video" title="My Video" />
```

## Docker Deployment

### Build and Run Locally

```bash
# Build Docker image
docker build -t magliosite .

# Run container
docker run -p 3000:3000 magliosite
```

### Using Docker Compose

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## VPS Deployment

1. **Build on your local machine**:
   ```bash
   docker build -t magliosite .
   docker save magliosite > magliosite.tar
   ```

2. **Transfer to VPS**:
   ```bash
   scp magliosite.tar user@your-vps:/path/to/deploy
   ```

3. **Load and run on VPS**:
   ```bash
   docker load < magliosite.tar
   docker run -d -p 3000:3000 --name magliosite magliosite
   ```

4. **Set up reverse proxy** (nginx/caddy) for HTTPS

## Project Structure

```
├── src/
│   ├── routes/              # Pages (file-based routing)
│   │   ├── +layout.svelte   # Root layout
│   │   └── +page.svelte     # Home page
│   ├── lib/
│   │   └── components/      # Reusable components
│   └── app.css              # Tailwind imports
├── static/                  # Static files (served as-is)
├── videos/
│   ├── raw/                 # Raw MP4s (gitignored)
│   └── hls/                 # HLS output (committed)
├── scripts/
│   └── convert-videos.js    # Video conversion script
├── Dockerfile               # Production Docker image
└── docker-compose.yml       # Docker Compose config
```

## Tips

- **Hot reload**: Changes to `.svelte` files auto-reload during development
- **TypeScript**: Get intellisense in VS Code for better DX
- **Tailwind**: Use utility classes directly in your Svelte components
- **Build output**: The `build/` directory contains your production app
- **Environment variables**: Copy `.env.example` to `.env` for local config

## Common Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type check
npm run convert:videos  # Convert videos to HLS
```

## Need Help?

- **SvelteKit Docs**: https://svelte.dev/docs/kit
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **FFmpeg Guide**: https://ffmpeg.org/documentation.html

---

**Ready to build!** Start by editing `src/routes/+page.svelte` 🚀
