<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer
	id="contact"
	class="w-full overflow-x-hidden border-x border-t border-zinc-700 bg-black px-6 py-8 text-white lg:px-12"
>
	<!-- Top Row -->
	<div class="mb-8 flex flex-col gap-2 sm:mb-16 sm:flex-row sm:items-start sm:justify-between">
		<p class="font-mono text-sm tracking-wide">ELISA MAGLIO</p>
		<p class="font-mono text-sm tracking-wide">MEDIA DESIGNERIN</p>
		<p class="font-mono text-sm tracking-wide">{currentYear}</p>
	</div>

	<!-- Bottom Row -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
		<a 
			href="mailto:contact@elisamaglio.de" 
			class="font-mono text-sm tracking-wide hover:opacity-70 transition-opacity"
		>
			contact@elisamaglio.de
		</a>
		<div class="flex items-center gap-6 font-mono text-sm tracking-wide">
			<a href="/legal#impressum" class="hover:opacity-70 transition-opacity">IMPRESSUM</a>
			<a href="/legal#datenschutz" class="hover:opacity-70 transition-opacity">DATENSCHUTZ</a>
		</div>
		<a 
			href="https://linkedin.com" 
			target="_blank" 
			rel="noopener noreferrer"
			class="font-mono text-sm tracking-wide hover:opacity-70 transition-opacity"
		>
			LINKED IN
		</a>
	</div>
</footer>
