import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import type { RequestHandler } from './$types';

const HLS_ROOT = resolve('videos/hls');

const CONTENT_TYPES: Record<string, string> = {
	'.m3u8': 'application/vnd.apple.mpegurl',
	'.ts': 'video/mp2t',
	'.mp4': 'video/mp4',
	'.key': 'application/octet-stream',
};

function isWithinRoot(path: string, root: string) {
	return path === root || path.startsWith(root + sep);
}

export const GET: RequestHandler = async ({ params }) => {
	const relativePath = params.path ?? '';
	const filePath = resolve(HLS_ROOT, relativePath);

	if (!isWithinRoot(filePath, HLS_ROOT)) {
		return new Response('Forbidden', { status: 403 });
	}

	try {
		const file = await readFile(filePath);
		const extension = extname(filePath).toLowerCase();
		const contentType = CONTENT_TYPES[extension] ?? 'application/octet-stream';
		const cacheControl =
			extension === '.m3u8'
				? 'no-store'
				: 'public, max-age=31536000, immutable';

		return new Response(file, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': cacheControl,
			},
		});
	} catch (error) {
		const errno = error as NodeJS.ErrnoException;
		if (errno.code === 'ENOENT' || errno.code === 'ENOTDIR') {
			return new Response('Not found', { status: 404 });
		}

		return new Response('Unable to read stream asset', { status: 500 });
	}
};
