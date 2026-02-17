<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import WerBinIch from '$lib/components/WerBinIch.svelte';
	import Studienprojekte from '$lib/components/Studienprojekte.svelte';
	import EigeneProjekte from '$lib/components/EigeneProjekte.svelte';
	import BeruflicheErfahrungen from '$lib/components/BeruflicheErfahrungen.svelte';
	import Ausbildung from '$lib/components/Ausbildung.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen w-full overflow-x-hidden border border-zinc-700 bg-black">
	<!-- Header -->
	<Header />

	<!-- Wer bin ich? Section -->
	<WerBinIch />

	<!-- Studienprojekte Section -->
	<Studienprojekte />

	<!-- Eigene Projekte Section -->
	<EigeneProjekte />

	<!-- Berufliche Erfahrungen Section -->
	<BeruflicheErfahrungen />

	<!-- Ausbildung Section -->
	<Ausbildung />

	<!-- Footer -->
	<Footer />
</div>
