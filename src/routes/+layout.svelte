<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon_em.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
