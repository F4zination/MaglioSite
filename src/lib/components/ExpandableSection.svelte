<script lang="ts">
	interface ExpandableSectionProps {
		title: string;
		sectionId?: string;
		initialExpanded?: boolean;
		class?: string;
		contentClass?: string;
		titleClass?: string;
		children: import('svelte').Snippet;
	}

	let {
		title,
		sectionId,
		initialExpanded = true,
		class: className = "",
		contentClass = "",
		titleClass = "",
		children,
	}: ExpandableSectionProps = $props();

	let expanded = $state(true);

	$effect(() => {
		expanded = initialExpanded;
	});

	function toggleExpanded() {
		expanded = !expanded;
	}
</script>

<section id={sectionId} class={`w-full border-x border-zinc-700 bg-black ${className}`}>
	<button
		type="button"
		onclick={toggleExpanded}
		class="appearance-none flex w-full items-center justify-center gap-3 border-b border-zinc-700 bg-black px-6 py-5 text-white transition-colors hover:bg-zinc-900"
	>
		<h2
			class={`text-3xl font-light uppercase tracking-[0.08em] md:text-5xl ${titleClass}`}
		>
			{title}
		</h2>
		<span
			class="text-3xl transition-transform duration-300 md:text-4xl"
			class:rotate-180={!expanded}
		>
			^
		</span>
	</button>

	{#if expanded}
		<div class={`border-b border-zinc-700 ${contentClass}`}>
			{@render children()}
		</div>
	{/if}
</section>

<style>
	.rotate-180 {
		transform: rotate(180deg);
	}
</style>
