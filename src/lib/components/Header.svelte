<script lang="ts">
	import faviconEm from '$lib/assets/favicon_em.svg';

	let { class: className = "" } = $props();
</script>

<header
	class="sticky top-0 z-50 border-b border-zinc-700 bg-black {className}"
>
	<div
		class="flex items-center justify-between border-x border-zinc-700 px-6 py-4"
	>
		<!-- Logo -->
		<a
			href="/"
			class="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-70 transition-opacity"
		>
			<span class="flex flex-col gap-[3px]">
				<span class="w-5 h-[2px] bg-white"></span>
				<span class="w-5 h-[2px] bg-white"></span>
				<span class="w-5 h-[2px] bg-white"></span>
			</span>
			<img src={faviconEm} alt="EM" class="h-5 w-auto invert" />
		</a>

		<!-- Navigation -->
		<nav class="flex items-center gap-8">
			<a
				href="#about"
				class="text-sm font-medium tracking-wider text-white hover:opacity-70 transition-opacity uppercase"
			>
				ABOUT
			</a>
			<a
				href="#work"
				class="text-sm font-medium tracking-wider text-white hover:opacity-70 transition-opacity uppercase"
			>
				WORK
			</a>
			<a
				href="#contact"
				class="text-sm font-medium tracking-wider text-white hover:opacity-70 transition-opacity uppercase"
			>
				CONTACT
			</a>
		</nav>
	</div>
</header>
