<script lang="ts">
	import faviconEm from '$lib/assets/favicon_em.svg';

	let { class: className = "" } = $props();
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-zinc-700 bg-black {className}"
>
	<div
		class="flex w-full items-center justify-between border-x border-zinc-700 px-3 py-4 sm:px-6"
	>
		<!-- Logo -->
		<a
			href="/"
			class="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-70 transition-opacity"
		>
			<img src={faviconEm} alt="EM" class="h-5 w-auto invert" />
		</a>

		<!-- Navigation -->
		<nav class="flex items-center gap-4 sm:gap-8">
			<a
				href="#about"
				class="text-xs font-medium tracking-wider text-white uppercase transition-opacity hover:opacity-70 sm:text-sm"
			>
				ABOUT
			</a>
			<a
				href="#work"
				class="text-xs font-medium tracking-wider text-white uppercase transition-opacity hover:opacity-70 sm:text-sm"
			>
				WORK
			</a>
			<a
				href="#contact"
				class="text-xs font-medium tracking-wider text-white uppercase transition-opacity hover:opacity-70 sm:text-sm"
			>
				CONTACT
			</a>
		</nav>
	</div>
</header>
