#!/usr/bin/env node

/**
 * Video Conversion Script - Video to HLS
 * 
 * This script converts raw video files (.mp4/.mov) to HLS format (.m3u8 + .ts segments)
 * Usage: node scripts/convert-videos.js
 * 
 * The script:
 * 1. Scans the videos/raw directory for supported video files
 * 2. Converts each MP4 to HLS format using FFmpeg
 * 3. Outputs the HLS files to videos/hls directory
 * 4. Creates multiple quality variants for adaptive streaming
 */

import { spawn } from 'child_process';
import { readdir, mkdir, rm } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';
import ffmpegPath from 'ffmpeg-static';

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
		if (!ffmpegPath) {
			reject(new Error('FFmpeg binary not found. Ensure ffmpeg-static is installed correctly.'));
			return;
		}
		const ffmpeg = spawn(ffmpegPath, args);

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
 * Convert a single video file to HLS format
 */
async function convertToHLS(inputPath, outputDir) {
	const filename = basename(inputPath, extname(inputPath));
	const streamId = filename.replace(/\s+/g, '_');
	const outputPath = join(outputDir, streamId);

	// Recreate output directory so stale segments from previous conversions are removed.
	await rm(outputPath, { recursive: true, force: true });
	await mkdir(outputPath, { recursive: true });

	console.log(`Converting ${filename} -> ${streamId}...`);

	// FFmpeg arguments for HLS conversion
	// Force browser-compatible H.264 output.
	const args = [
		'-i', inputPath,
		'-map', '0:v:0',
		'-map', '0:a:0?',
		'-c:v', 'libx264', // Video codec
		'-profile:v', 'high',
		'-level:v', '4.1',
		'-pix_fmt', 'yuv420p',
		'-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p',
		'-preset', 'medium',
		'-crf', '20',
		'-c:a', 'aac', // Audio codec
		'-b:a', '192k',
		'-ac', '2',
		'-ar', '48000',
		'-hls_time', HLS_TIME.toString(),
		'-hls_playlist_type', HLS_PLAYLIST_TYPE,
		'-hls_segment_filename', join(outputPath, 'segment_%03d.ts'),
		'-hls_flags', 'independent_segments',
		join(outputPath, 'playlist.m3u8')
	];

	try {
		await execFFmpeg(args);
			console.log(`✓ Successfully converted ${filename} (${streamId})`);
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
	console.log('🎬 Video Conversion Script - Video to HLS\n');

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
		console.error('Please create the directory and add your video files');
		process.exit(1);
	}

	// Create output directory if it doesn't exist
	if (!existsSync(HLS_OUTPUT_DIR)) {
		await mkdir(HLS_OUTPUT_DIR, { recursive: true });
	}

	// Read all files in raw directory
	const files = await readdir(RAW_VIDEO_DIR);
	const supportedExtensions = new Set(['.mp4', '.mov']);
	const videoFiles = files.filter(file =>
		supportedExtensions.has(extname(file).toLowerCase())
	);

	if (videoFiles.length === 0) {
		console.log(`No supported video files found in ${RAW_VIDEO_DIR}`);
		console.log('Supported formats: .mp4, .mov');
		return;
	}

	console.log(`Found ${videoFiles.length} video file(s) to convert:\n`);
	videoFiles.forEach(file => console.log(`  - ${file}`));
	console.log('');

	// Convert each file
	let successful = 0;
	let failed = 0;

	for (const file of videoFiles) {
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
