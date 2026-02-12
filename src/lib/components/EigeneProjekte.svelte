<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

	interface Project {
		number: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		thumbnail: string;
		visualTone: string;
	}

	const projects: Project[] = [
		{
			number: "01",
			title: "Expense Tracker",
			description:
				"Eine persönliche Finanz-App zur Verfolgung von Ausgaben und Einnahmen. Die App ermöglicht es Nutzern, ihre Finanzen übersichtlich zu verwalten und Sparziele zu setzen.",
			tags: ["App Design", "UX Design"],
			date: "2025",
			thumbnail: "/ET.png",
			visualTone: "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700",
		},
		{
			number: "02",
			title: "DUO",
			description:
				"Ein kreatives Projekt, das zwei komplementäre Designkonzepte verbindet und eine harmonische visuelle Sprache entwickelt.",
			tags: ["Visual Design", "Konzeption"],
			date: "2025",
			thumbnail: "/Duo.png",
			visualTone: "bg-zinc-200",
		},
	];
</script>

<ExpandableSection title="EIGENE PROJEKTE" alternateEntries={true}>
	{#each projects as project}
		<article
			class="grid min-h-[520px] grid-cols-2 border-b border-zinc-700 last:border-b-0"
		>
			<div
				class="entry-text flex flex-col border-r border-zinc-700 bg-zinc-100 text-zinc-900"
			>
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3 class="font-mono text-2xl underline decoration-1 underline-offset-4">
						{project.number} {project.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-xl leading-[1.06] md:text-2xl">
						{#each project.description.split("\n\n") as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
					<div class="border-t border-zinc-700 pt-4 font-mono text-2xl">
						<p>{project.tags.join(", ")}</p>
						<p>{project.date}</p>
					</div>
				</div>
			</div>

			<div
				class="entry-media flex items-center justify-center overflow-hidden p-8 md:p-14 {project.visualTone}"
			>
				<img
					src={project.thumbnail}
					alt={`${project.title} Thumbnail`}
					class="h-full max-h-[430px] w-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.35)]"
				/>
			</div>
		</article>
	{/each}
</ExpandableSection>
