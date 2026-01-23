<script lang="ts">
	import { onMount } from "svelte";

	interface VideoPlayerProps {
		videoId: string;
		title?: string;
		autoplay?: boolean;
	}

	let { videoId, title = "", autoplay = false }: VideoPlayerProps = $props();

	let videoElement: HTMLVideoElement;
	let error: string | null = $state(null);
	let isLoading = $state(true);

	onMount(() => {
		// Check if HLS.js is supported
		if (typeof window !== "undefined") {
			const videoSrc = `/videos/hls/${videoId}/playlist.m3u8`;

			// For browsers that support HLS natively (Safari)
			if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
				videoElement.src = videoSrc;
				isLoading = false;
			}
			// For other browsers, you would use HLS.js (to be installed separately)
			// For now, we'll just show the native player
			else {
				error =
					"HLS playback not supported. Install hls.js for cross-browser support.";
				isLoading = false;
			}
		}
	});
</script>

<div class="video-player-container">
	{#if title}
		<h3 class="text-xl font-semibold mb-2 text-white">{title}</h3>
	{/if}

	<div class="relative bg-black rounded-lg overflow-hidden">
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
			<div
				class="absolute inset-0 flex items-center justify-center bg-black/50"
			>
				<div class="text-white">Loading video...</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.video-player-container {
		width: 100%;
	}
</style>
