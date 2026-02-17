<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';
</script>

<ExpandableSection sectionId="about" title="Wer bin ich?">
	<div class="grid grid-cols-1 md:grid-cols-2">
		<div class="order-2 bg-zinc-100 text-zinc-900 md:order-1">
			<div class="border-b border-zinc-700 px-6 py-4">
				<p class="font-mono text-2xl">Hey :)</p>
			</div>

			<div class="border-b border-zinc-700 px-6 py-6">
				<p class="font-mono text-xl leading-tight">
					Ich bin Elisa Maglio, bin 23 Jahre alt und studiere derzeit
					Mediendesign an der DHBW in Ravensburg.
				</p>
				<p class="mt-4 font-mono text-xl leading-tight">
					Willkommen auf meinem Portfolio!
				</p>
			</div>

			<div class="border-b  border-zinc-700 px-6 py-6">
				<p class="font-mono text-xl  decoration-zinc-500 ">
					Volleyball
				</p>
				<p class="font-mono text-xl  decoration-zinc-500 ">
					Zeichnen
				</p>
				<p class="font-mono text-xl  decoration-zinc-500 ">
					Lesen
				</p>
				<p class="font-mono text-xl  decoration-zinc-500 ">
					Brettspiele
				</p>
			</div>

			<div class="border-b border-zinc-700 px-6 py-6">
				<p class="font-mono text-xl  decoration-zinc-500 ">
					offen
				</p>
				<p
					class="font-mono text-xl  decoration-zinc-500 "
				>
					etwas stur
				</p>
				<p
					class="font-mono text-xl  decoration-zinc-500 "
				>
					ehrgeizig
				</p>
				<p
					class="font-mono text-xl  decoration-zinc-500 "
				>
					interessiert
				</p>
				<p
					class="font-mono text-xl  decoration-zinc-500 "
				>
					hilfsbereit
				</p>
			</div>

			<div class="px-6 py-6">
				<p class="font-mono text-xl">
					email: <a
						href="mailto:contact@elisamaglio.de"
						class="underline decoration-zinc-500 underline-offset-4 transition-opacity hover:opacity-70"
						>contact@elisamaglio.de</a
					>
				</p>
				<p class="font-mono text-xl">
					linkedIn: <a
						href="https://www.linkedin.com/in/elisa-maglio-559a87336/"
						target="_blank"
						rel="noopener noreferrer"
						class="underline decoration-zinc-500 underline-offset-4 transition-opacity hover:opacity-70"
						>Elisa Maglio</a
					>
				</p>
			</div>
		</div>

		<div
			class="entry-media order-1 flex items-end justify-center overflow-hidden md:order-2"
			style="--entry-media-bg: #f4f4f5;"
		>
			<img
				src="/Avatar.png"
				alt="Elisa Maglio - 3D Avatar"
				class="block h-auto max-h-[70vh] w-full object-contain md:max-h-none md:w-1/2"
			/>
		</div>
	</div>
</ExpandableSection>
