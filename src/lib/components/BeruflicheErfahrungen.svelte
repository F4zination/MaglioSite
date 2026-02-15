<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

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
</script>

<ExpandableSection title="BERUFLICHE ERFAHRUNGEN" alternateEntries={true}>
	{#each experiences as experience}
		<article class="grid grid-cols-2 border-b border-zinc-700 last:border-b-0">
			<div
				class="entry-text flex flex-col bg-zinc-100 text-zinc-900"
			>
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3 class="font-mono text-2xl underline decoration-1 underline-offset-4">
						{experience.number} {experience.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-xl leading-[1.06] md:text-2xl">
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

			<div class="entry-media overflow-hidden">
				<img
					src={experience.thumbnail}
					alt={`${experience.title} Thumbnail`}
					class="block h-full w-full object-cover"
				/>
			</div>
		</article>
	{/each}
</ExpandableSection>
