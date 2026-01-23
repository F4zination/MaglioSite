<script lang="ts">
	let { class: className = '' } = $props();
</script>

<header class="sticky top-0 z-50 bg-black border-b border-electric-blue {className}">
	<div class="flex items-center justify-between px-6 py-4 border-x border-electric-blue">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-1 text-2xl font-bold text-white hover:opacity-70 transition-opacity">
			<span class="flex flex-col leading-none">
				<span class="text-xs leading-tight">E</span>
				<span class="text-xs leading-tight">M</span>
			</span>
		</a>

		<!-- Navigation -->
		<nav class="flex items-center gap-8">
			<a href="#about" class="text-sm font-medium tracking-wider text-white hover:opacity-70 transition-opacity uppercase">
				ABOUT
			</a>
			<a href="#work" class="text-sm font-medium tracking-wider text-white hover:opacity-70 transition-opacity uppercase">
				WORK
			</a>
			<a href="#contact" class="text-sm font-medium tracking-wider text-white hover:opacity-70 transition-opacity uppercase">
				CONTACT
			</a>
		</nav>
	</div>
</header>
