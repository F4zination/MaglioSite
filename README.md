# MaglioSite

A high-performance portfolio website for a web designer built with SvelteKit, Tailwind CSS, and Node.js.

## Tech Stack

- **Frontend**: SvelteKit 2.x with TypeScript
- **Styling**: Tailwind CSS 3.x with PostCSS
- **Deployment**: Docker container with adapter-node
- **Video Streaming**: HLS (HTTP Live Streaming) with local conversion

## Project Structure

```
MaglioSite/
├── src/
│   ├── routes/          # SvelteKit routes
│   ├── lib/             # Shared components and utilities
│   └── app.css          # Tailwind CSS imports
├── static/              # Static assets
├── videos/
│   ├── raw/             # Raw MP4 files (not committed to Git)
│   └── hls/             # Converted HLS files (committed to Git)
├── scripts/
│   └── convert-videos.js # MP4 to HLS conversion script
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
└── package.json         # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or pnpm
- FFmpeg (for video conversion)
- Docker (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/F4zination/MaglioSite.git
cd MaglioSite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Video Conversion Workflow

This project uses a "Local Conversion" strategy for optimal performance:

1. **Place raw videos**: Add your MP4 files to `videos/raw/`
2. **Convert to HLS**: Run the conversion script:
   ```bash
   npm run convert:videos
   ```
3. **Commit optimized files**: The HLS files in `videos/hls/` are committed to Git
4. **Deploy**: Push to your repository and deploy

### Why Local Conversion?

- **Performance**: HLS provides adaptive bitrate streaming
- **Compatibility**: Works across all modern browsers
- **Bandwidth**: Reduced server costs with optimized segments
- **Control**: Full control over encoding quality and settings

### FFmpeg Installation

**macOS**:
```bash
brew install ffmpeg
```

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows**:
Download from [ffmpeg.org](https://ffmpeg.org/download.html)

## Building for Production

### Local Build

```bash
npm run build
npm run preview
```

### Docker Build

Build the Docker image:
```bash
docker build -t magliosite .
```

Run the container:
```bash
docker run -p 3000:3000 magliosite
```

Or use Docker Compose:
```bash
docker-compose up -d
```

## Deployment

The application is configured with `@sveltejs/adapter-node` for Node.js deployment.

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (production/development)

### VPS Deployment Steps

1. Build and push your Docker image
2. Pull the image on your VPS
3. Run the container with appropriate port mapping
4. Set up a reverse proxy (nginx/caddy) for HTTPS

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type-check with svelte-check
- `npm run convert:videos` - Convert MP4s to HLS format

## License

All rights reserved.
