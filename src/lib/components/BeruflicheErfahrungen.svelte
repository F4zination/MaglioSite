<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

	interface Experience {
		number: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		thumbnail: string;
		visualTone: string;
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
			visualTone: "bg-zinc-200",
		},
		{
			number: "02",
			title: "Vektorgrafiken Wohnwagen",
			description:
				"Entwicklung von präzisen Vektorgrafiken für Wohnwagen und Caravan-Produkte. Die Illustrationen dienten der visuellen Kommunikation im Vertrieb.",
			tags: ["Vektorgrafik", "Technische Illustration"],
			date: "2024",
			thumbnail: "/Detthlefs.png",
			visualTone: "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700",
		},
		{
			number: "03",
			title: "Marketingunterstützung Baumarkt",
			description:
				"Unterstützung bei der Erstellung von Marketingmaterialien für einen Baumarkt. Dazu gehörten Flyer, Poster und digitale Werbemittel.",
			tags: ["Marketing", "Grafikdesign"],
			date: "2023",
			thumbnail: "/BMS.png",
			visualTone: "bg-zinc-200",
		},
	];
</script>

<ExpandableSection title="BERUFLICHE ERFAHRUNGEN">
	{#each experiences as experience}
		<article
			class="grid min-h-[520px] grid-cols-2 border-b border-zinc-700 last:border-b-0"
		>
			<div class="flex flex-col border-r border-zinc-700 bg-zinc-100 text-zinc-900">
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3 class="font-mono text-2xl underline decoration-1 underline-offset-4">
						{experience.number} {experience.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-2xl leading-[1.06] md:text-3xl">
						{#each experience.description.split("\n\n") as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
					<div class="border-t border-zinc-700 pt-4 font-mono text-2xl">
						<p>{experience.tags.join(", ")}</p>
						<p>{experience.date}</p>
					</div>
				</div>
			</div>

			<div
				class="flex items-center justify-center overflow-hidden p-8 md:p-14 {experience.visualTone}"
			>
				<img
					src={experience.thumbnail}
					alt={`${experience.title} Thumbnail`}
					class="h-full max-h-[430px] w-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
				/>
			</div>
		</article>
	{/each}
</ExpandableSection>
