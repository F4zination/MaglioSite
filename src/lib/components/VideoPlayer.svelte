<script lang="ts">
	import { onMount } from 'svelte';
	import type Hls from 'hls.js';

	interface VideoPlayerProps {
		videoId: string;
		title?: string;
		autoplay?: boolean;
		class?: string;
	}

	let {
		videoId,
		title = '',
		autoplay = false,
		class: className = '',
	}: VideoPlayerProps = $props();

	let videoElement = $state<HTMLVideoElement | null>(null);
	let error: string | null = $state(null);
	let isLoading = $state(true);
	let mounted = false;
	let hls: Hls | null = null;

	function destroyHls() {
		if (!hls) return;
		hls.destroy();
		hls = null;
	}

	async function initializePlayer() {
		if (!mounted || !videoElement) return;

		const streamPath = `/videos/hls/${encodeURIComponent(videoId)}/playlist.m3u8`;

		error = null;
		isLoading = true;
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

		// Safari and browsers with native HLS support.
		if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
			videoElement.src = streamPath;
			videoElement.load();

			if (autoplay) {
				void videoElement.play().catch(() => {});
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
				void videoElement?.play().catch(() => {});
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
