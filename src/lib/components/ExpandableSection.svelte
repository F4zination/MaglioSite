<script lang="ts">
	import dropdownArrow from '$lib/assets/dropdown_arrow.svg';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	interface ExpandableSectionProps {
		title: string;
		sectionId?: string;
		initialExpanded?: boolean;
		alternateEntries?: boolean;
		buttonClass?: string;
		iconClass?: string;
		class?: string;
		contentClass?: string;
		titleClass?: string;
		children: import('svelte').Snippet;
	}

	let {
		title,
		sectionId,
		initialExpanded = true,
		alternateEntries = false,
		buttonClass = "",
		iconClass = "",
		class: className = "",
		contentClass = "",
		titleClass = "",
		children,
	}: ExpandableSectionProps = $props();

	let expanded = $state(initialExpanded);

	$effect(() => {
		expanded = initialExpanded;
	});

	function toggleExpanded() {
		expanded = !expanded;
	}
</script>

<section id={sectionId} class={`w-full overflow-x-hidden border-x border-zinc-700 bg-black ${className}`}>
	<button
		type="button"
		onclick={toggleExpanded}
		class={`appearance-none flex w-full items-center justify-center gap-2 border-b border-zinc-700 bg-black px-4 py-4 text-white transition-colors hover:bg-zinc-900 sm:gap-3 sm:px-6 sm:py-5 ${buttonClass}`}
	>
		<h2
			class={`font-archivo-expanded text-center text-2xl font-bold uppercase tracking-[0.08em] sm:text-3xl md:text-5xl ${titleClass}`}
		>
			{title}
		</h2>
		<img
			src={dropdownArrow}
			alt=""
			aria-hidden="true"
			class={`h-4 w-7 transition-transform duration-300 md:h-5 md:w-9 ${iconClass}`}
			style:transform={expanded ? 'rotate(0deg)' : 'rotate(180deg)'}
			style:transform-origin="center"
		/>
	</button>

	{#if expanded}
		<div
			transition:slide={{ duration: 260, easing: cubicOut }}
			class={`border-b border-zinc-700 ${alternateEntries
				? 'alternate-entries'
				: ''} ${contentClass}`}
		>
			{@render children()}
		</div>
	{/if}
</section>

<style>
	:global(.entry-media) {
		background-color: var(--entry-media-bg, #fff);
		border-bottom: 1px solid #000;
	}

	:global(.entry-text .space-y-4) {
		max-width: 75%;
	}

	@media (min-width: 768px) {
		:global(.entry-media) {
			border-bottom: 0;
			border-left: 1px solid #000;
		}

		:global(.alternate-entries > article:nth-child(even) .entry-text) {
			order: 2;
		}

		:global(.alternate-entries > article:nth-child(even) .entry-media) {
			order: 1;
			border-left: 0;
			border-right: 1px solid #000;
		}
	}
</style>
