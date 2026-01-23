<script lang="ts">
	let { class: className = "" } = $props();
</script>

<header
	class="sticky top-0 z-50 bg-black border-b border-electric-blue {className}"
>
	<div
		class="flex items-center justify-between px-6 py-4 border-x border-electric-blue"
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
			<span class="text-xl font-bold tracking-wide">EM</span>
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
