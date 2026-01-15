<script lang="ts">
	let { class: className = '' } = $props();
</script>

<header class="sticky top-0 z-50 bg-white border-b border-gray-200 {className}">
	<div class="flex items-center justify-between px-6 py-4">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-1 text-2xl font-bold text-black hover:opacity-70 transition-opacity">
			<span class="flex flex-col leading-none">
				<span class="text-xs leading-tight">=</span>
				<span class="text-xs leading-tight">=</span>
			</span>
			<span class="text-2xl font-black">M</span>
		</a>

		<!-- Navigation -->
		<nav class="flex items-center gap-8">
			<a href="#about" class="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
				ABOUT
			</a>
			<a href="#work" class="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
				WORK
			</a>
			<a href="#contact" class="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
				CONTACT
			</a>
		</nav>
	</div>
</header>
