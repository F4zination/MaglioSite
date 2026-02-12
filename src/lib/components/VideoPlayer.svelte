<script lang="ts">
	import { onMount } from 'svelte';
	import type Hls from 'hls.js';

	interface VideoPlayerProps {
		videoId?: string;
		videoSrc?: string;
		title?: string;
		autoplay?: boolean;
		startFullscreen?: boolean;
		class?: string;
	}

	let {
		videoId = '',
		videoSrc,
		title = '',
		autoplay = false,
		startFullscreen = true,
		class: className = '',
	}: VideoPlayerProps = $props();

	let videoElement = $state<HTMLVideoElement | null>(null);
	let error: string | null = $state(null);
	let isLoading = $state(true);
	let mounted = false;
	let hls: Hls | null = null;
	let fullscreenRequested = false;

	type FullscreenVideo = HTMLVideoElement & {
		webkitEnterFullscreen?: () => void;
	};

	function destroyHls() {
		if (!hls) return;
		hls.destroy();
		hls = null;
	}

	async function requestFullscreenIfNeeded() {
		if (!startFullscreen || fullscreenRequested || !videoElement) return;
		fullscreenRequested = true;

		const el = videoElement as FullscreenVideo;

		try {
			if (document.fullscreenElement) return;

			if (typeof el.requestFullscreen === 'function') {
				await el.requestFullscreen();
				return;
			}

			if (typeof el.webkitEnterFullscreen === 'function') {
				el.webkitEnterFullscreen();
			}
		} catch {
			// Fullscreen can be denied depending on browser/user gesture policy.
		}
	}

	async function initializePlayer() {
		if (!mounted || !videoElement) return;

		error = null;
		isLoading = true;
		fullscreenRequested = false;
		destroyHls();

		videoElement.onerror = () => {
			if (!error) {
				error = 'Video stream could not be loaded.';
			}
			isLoading = false;
		};

		videoElement.onloadeddata = () => {
			isLoading = false;
		};

		videoElement.onplay = () => {
			void requestFullscreenIfNeeded();
		};

		const directSource = videoSrc?.trim();
		if (directSource) {
			videoElement.src = directSource;
			videoElement.load();

			if (autoplay) {
				void videoElement.play().then(() => requestFullscreenIfNeeded()).catch(() => {});
			}
			return;
		}

		if (!videoId) {
			error = 'Video stream could not be loaded.';
			isLoading = false;
			return;
		}

		const streamPath = `/videos/hls/${encodeURIComponent(videoId)}/playlist.m3u8`;

		// Safari and browsers with native HLS support.
		if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
			videoElement.src = streamPath;
			videoElement.load();

			if (autoplay) {
				void videoElement.play().then(() => requestFullscreenIfNeeded()).catch(() => {});
			}
			return;
		}

		const { default: Hls } = await import('hls.js');
		if (!mounted || !videoElement) return;

		if (!Hls.isSupported()) {
			error = 'HLS playback is not supported in this browser.';
			isLoading = false;
			return;
		}

		const instance = new Hls({
			enableWorker: true,
			lowLatencyMode: false,
		});
		hls = instance;

		instance.loadSource(streamPath);
		instance.attachMedia(videoElement);

		instance.on(Hls.Events.MANIFEST_PARSED, () => {
			isLoading = false;
			if (autoplay) {
				void videoElement
					?.play()
					.then(() => requestFullscreenIfNeeded())
					.catch(() => {});
			}
		});

		instance.on(Hls.Events.ERROR, (_event, data) => {
			if (!data.fatal || !hls) return;

			if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
				hls.startLoad();
				return;
			}

			if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
				hls.recoverMediaError();
				return;
			}

			error = 'Video stream could not be played.';
			isLoading = false;
			destroyHls();
		});
	}

	onMount(() => {
		mounted = true;
		void initializePlayer();

		return () => {
			mounted = false;
			destroyHls();

			if (videoElement) {
				videoElement.pause();
				videoElement.removeAttribute('src');
				videoElement.load();
			}
		};
	});

	$effect(() => {
		videoId;
		videoSrc;
		if (mounted) {
			void initializePlayer();
		}
	});
</script>

<div class={`w-full ${className}`}>
	{#if title}
		<h3 class="mb-2 text-xl font-semibold text-white">{title}</h3>
	{/if}

	<div class="relative overflow-hidden rounded-lg bg-black">
		{#if error}
			<div class="p-8 text-center text-red-400">
				<p>{error}</p>
			</div>
		{:else}
			<video
				bind:this={videoElement}
				class="w-full"
				controls
				{autoplay}
				preload="metadata"
			>
				<track kind="captions" />
				Your browser does not support the video tag.
			</video>
		{/if}

		{#if isLoading}
			<div class="absolute inset-0 flex items-center justify-center bg-black/50">
				<div class="text-white">Loading video...</div>
			</div>
		{/if}
	</div>
</div>
