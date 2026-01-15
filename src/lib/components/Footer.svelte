<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer id="contact" class="w-full bg-black text-white py-8 px-6 lg:px-12">
	<!-- Top Row -->
	<div class="flex items-start justify-between mb-16">
		<p class="font-mono text-sm tracking-wide">ELISA MAGLIO</p>
		<p class="font-mono text-sm tracking-wide">MEDIA DESIGNERIN</p>
		<p class="font-mono text-sm tracking-wide">{currentYear}</p>
	</div>

	<!-- Bottom Row -->
	<div class="flex items-end justify-between">
		<a 
			href="mailto:ELISA.MAGLIO@WEB.DE" 
			class="font-mono text-sm tracking-wide underline underline-offset-4 hover:opacity-70 transition-opacity"
		>
			ELISA.MAGLIO@WEB.DE
		</a>
		<a 
			href="https://linkedin.com" 
			target="_blank" 
			rel="noopener noreferrer"
			class="font-mono text-sm tracking-wide underline underline-offset-4 hover:opacity-70 transition-opacity"
		>
			LINKED IN
		</a>
	</div>
</footer>
