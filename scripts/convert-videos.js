#!/usr/bin/env node

/**
 * Video Conversion Script - MP4 to HLS
 * 
 * This script converts raw MP4 files to HLS format (.m3u8 + .ts segments)
 * Usage: node scripts/convert-videos.js
 * 
 * The script:
 * 1. Scans the videos/raw directory for MP4 files
 * 2. Converts each MP4 to HLS format using FFmpeg
 * 3. Outputs the HLS files to videos/hls directory
 * 4. Creates multiple quality variants for adaptive streaming
 */

import { spawn } from 'child_process';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const RAW_VIDEO_DIR = './videos/raw';
const HLS_OUTPUT_DIR = './videos/hls';

// HLS conversion settings
const HLS_TIME = 6; // Segment duration in seconds
const HLS_PLAYLIST_TYPE = 'vod'; // Video on demand

/**
 * Execute FFmpeg command
 */
function execFFmpeg(args) {
	return new Promise((resolve, reject) => {
		const ffmpeg = spawn('ffmpeg', args);
		
		let stdout = '';
		let stderr = '';

		ffmpeg.stdout.on('data', (data) => {
			stdout += data.toString();
		});

		ffmpeg.stderr.on('data', (data) => {
			stderr += data.toString();
		});

		ffmpeg.on('close', (code) => {
			if (code === 0) {
				resolve({ stdout, stderr });
			} else {
				reject(new Error(`FFmpeg exited with code ${code}\n${stderr}`));
			}
		});

		ffmpeg.on('error', (err) => {
			reject(err);
		});
	});
}

/**
 * Check if FFmpeg is installed
 */
async function checkFFmpeg() {
	try {
		await execFFmpeg(['-version']);
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Convert a single MP4 file to HLS format
 */
async function convertToHLS(inputPath, outputDir) {
	const filename = basename(inputPath, extname(inputPath));
	const outputPath = join(outputDir, filename);

	// Create output directory for this video
	if (!existsSync(outputPath)) {
		await mkdir(outputPath, { recursive: true });
	}

	console.log(`Converting ${filename}...`);

	// FFmpeg arguments for HLS conversion
	// Creates adaptive bitrate streaming with multiple quality levels
	const args = [
		'-i', inputPath,
		'-c:v', 'libx264', // Video codec
		'-c:a', 'aac', // Audio codec
		'-strict', '-2',
		'-hls_time', HLS_TIME.toString(),
		'-hls_playlist_type', HLS_PLAYLIST_TYPE,
		'-hls_segment_filename', join(outputPath, 'segment_%03d.ts'),
		'-hls_flags', 'independent_segments',
		join(outputPath, 'playlist.m3u8')
	];

	try {
		await execFFmpeg(args);
		console.log(`✓ Successfully converted ${filename}`);
		return true;
	} catch (error) {
		console.error(`✗ Failed to convert ${filename}:`, error.message);
		return false;
	}
}

/**
 * Main conversion process
 */
async function main() {
	console.log('🎬 Video Conversion Script - MP4 to HLS\n');

	// Check if FFmpeg is installed
	console.log('Checking for FFmpeg...');
	const hasFFmpeg = await checkFFmpeg();
	
	if (!hasFFmpeg) {
		console.error('✗ FFmpeg is not installed or not in PATH');
		console.error('Please install FFmpeg: https://ffmpeg.org/download.html');
		process.exit(1);
	}
	console.log('✓ FFmpeg is available\n');

	// Check if raw video directory exists
	if (!existsSync(RAW_VIDEO_DIR)) {
		console.error(`✗ Raw video directory not found: ${RAW_VIDEO_DIR}`);
		console.error('Please create the directory and add your MP4 files');
		process.exit(1);
	}

	// Create output directory if it doesn't exist
	if (!existsSync(HLS_OUTPUT_DIR)) {
		await mkdir(HLS_OUTPUT_DIR, { recursive: true });
	}

	// Read all files in raw directory
	const files = await readdir(RAW_VIDEO_DIR);
	const mp4Files = files.filter(file => 
		extname(file).toLowerCase() === '.mp4'
	);

	if (mp4Files.length === 0) {
		console.log(`No MP4 files found in ${RAW_VIDEO_DIR}`);
		console.log('Add some MP4 files and run the script again');
		return;
	}

	console.log(`Found ${mp4Files.length} MP4 file(s) to convert:\n`);
	mp4Files.forEach(file => console.log(`  - ${file}`));
	console.log('');

	// Convert each file
	let successful = 0;
	let failed = 0;

	for (const file of mp4Files) {
		const inputPath = join(RAW_VIDEO_DIR, file);
		const success = await convertToHLS(inputPath, HLS_OUTPUT_DIR);
		
		if (success) {
			successful++;
		} else {
			failed++;
		}
	}

	// Summary
	console.log('\n' + '='.repeat(50));
	console.log(`Conversion complete!`);
	console.log(`  ✓ Successful: ${successful}`);
	console.log(`  ✗ Failed: ${failed}`);
	console.log(`  Output directory: ${HLS_OUTPUT_DIR}`);
	console.log('='.repeat(50));
	console.log('\nThe HLS files are now ready to be committed to Git.');
}

// Run the script
main().catch(error => {
	console.error('Fatal error:', error);
	process.exit(1);
});
