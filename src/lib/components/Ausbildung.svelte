<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

	interface Education {
		number: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		thumbnail: string;
		visualTone: string;
	}

	const educations: Education[] = [
		{
			number: "01",
			title: "Abschlussprüfung",
			description:
				"Die praktische Abschlussprüfung im Bereich Mediengestaltung. Das Projekt umfasste die Konzeption und Umsetzung eines umfangreichen Designprojekts.",
			tags: ["Abschlussarbeit", "Mediengestaltung"],
			date: "2024",
			thumbnail: "/AP.png",
			visualTone: "bg-zinc-200",
		},
		{
			number: "02",
			title: "Biogemüse Ravensburg",
			description:
				"Ein Branding-Projekt für einen regionalen Biogemüse-Anbieter. Das Projekt beinhaltete Logo-Design, Corporate Identity und Verpackungsgestaltung.",
			tags: ["Branding", "Corporate Design"],
			date: "2023",
			thumbnail: "/Biogemüse RV.png",
			visualTone: "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700",
		},
	];
</script>

<ExpandableSection title="AUSBILDUNG" alternateEntries={true}>
	{#each educations as education}
		<article
			class="grid min-h-[520px] grid-cols-2 border-b border-zinc-700 last:border-b-0"
		>
			<div
				class="entry-text flex flex-col border-r border-zinc-700 bg-zinc-100 text-zinc-900"
			>
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3 class="font-mono text-2xl underline decoration-1 underline-offset-4">
						{education.number} {education.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-xl leading-[1.06] md:text-2xl">
						{#each education.description.split("\n\n") as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
					<div class="border-t border-zinc-700 pt-4 font-mono text-2xl">
						<p>{education.tags.join(", ")}</p>
						<p>{education.date}</p>
					</div>
				</div>
			</div>

			<div
				class="entry-media flex items-center justify-center overflow-hidden p-8 md:p-14 {education.visualTone}"
			>
				<img
					src={education.thumbnail}
					alt={`${education.title} Thumbnail`}
					class="h-full max-h-[430px] w-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
				/>
			</div>
		</article>
	{/each}
</ExpandableSection>
