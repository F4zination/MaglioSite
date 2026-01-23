<script lang="ts">
	let expanded = $state(true);

	interface Experience {
		number: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		thumbnail: string;
	}

	const experiences: Experience[] = [
		{
			number: "01",
			title: "Vektorgrafiken Duschkabine",
			description:
				"Erstellung von detaillierten Vektorgrafiken für Duschkabinen-Produkte. Die Grafiken wurden für Produktkataloge und technische Dokumentationen verwendet.",
			tags: ["Vektorgrafik", "Illustration"],
			date: "2024",
			thumbnail: "/Duka.png",
		},
		{
			number: "02",
			title: "Vektorgrafiken Wohnwagen",
			description:
				"Entwicklung von präzisen Vektorgrafiken für Wohnwagen und Caravan-Produkte. Die Illustrationen dienten der visuellen Kommunikation im Vertrieb.",
			tags: ["Vektorgrafik", "Technische Illustration"],
			date: "2024",
			thumbnail: "/Detthlefs.png",
		},
		{
			number: "03",
			title: "Marketingunterstützung Baumarkt",
			description:
				"Unterstützung bei der Erstellung von Marketingmaterialien für einen Baumarkt. Dazu gehörten Flyer, Poster und digitale Werbemittel.",
			tags: ["Marketing", "Grafikdesign"],
			date: "2023",
			thumbnail: "/BMS.png",
		},
	];

	function toggleExpanded() {
		expanded = !expanded;
	}
</script>

<section class="w-full border-x border-electric-blue">
	<!-- Header -->
	<button
		onclick={toggleExpanded}
		class="w-full bg-black text-white py-4 px-6 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors border-b border-electric-blue"
	>
		<h2 class="text-2xl font-bold tracking-[0.3em] uppercase">
			BERUFLICHE ERFAHRUNGEN
		</h2>
		<span
			class="text-2xl transition-transform duration-300"
			class:rotate-180={!expanded}
		>
			^
		</span>
	</button>

	<!-- Content -->
	{#if expanded}
		<div class="border-b border-electric-blue">
			{#each experiences as experience, index}
				<article
					class="grid grid-cols-[1fr_1fr] min-h-[400px] border-b border-electric-blue last:border-b-0"
				>
					{#if index % 2 === 1}
						<!-- Left: Thumbnail (even items) -->
						<div
							class="bg-[#c8e6c9] flex items-center justify-center border-r border-electric-blue overflow-hidden"
						>
							<img
								src={experience.thumbnail}
								alt="{experience.title} Thumbnail"
								class="w-full h-full object-cover"
							/>
						</div>
					{/if}

					<!-- Text Content -->
					<div
						class="bg-black p-8 flex flex-col justify-between text-white {index %
							2 ===
						0
							? 'border-r border-electric-blue'
							: ''}"
					>
						<div>
							<h3 class="text-lg font-mono mb-8 text-white">
								{experience.number}
								{experience.title}
							</h3>

							<div
								class="space-y-4 text-sm leading-relaxed font-mono max-w-md text-white"
							>
								{#each experience.description.split("\n\n") as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>
						</div>

						<div class="mt-8 pt-4 border-t border-electric-blue">
							<p class="text-sm font-mono text-white">
								{experience.tags.join(", ")}
							</p>
							<p class="text-sm font-mono text-white">
								{experience.date}
							</p>
						</div>
					</div>

					{#if index % 2 === 0}
						<!-- Right: Thumbnail (odd items) -->
						<div
							class="bg-[#c8e6c9] flex items-center justify-center overflow-hidden"
						>
							<img
								src={experience.thumbnail}
								alt="{experience.title} Thumbnail"
								class="w-full h-full object-cover"
							/>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.rotate-180 {
		transform: rotate(180deg);
	}
</style>
