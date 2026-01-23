<script lang="ts">
	let expanded = $state(true);

	interface Project {
		number: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		thumbnail: string;
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
		},
		{
			number: "02",
			title: "DUO",
			description:
				"Ein kreatives Projekt, das zwei komplementäre Designkonzepte verbindet und eine harmonische visuelle Sprache entwickelt.",
			tags: ["Visual Design", "Konzeption"],
			date: "2025",
			thumbnail: "/Duo.png",
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
			EIGENE PROJEKTE
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
			{#each projects as project, index}
				<article
					class="grid grid-cols-[1fr_1fr] min-h-[400px] border-b border-electric-blue last:border-b-0"
				>
					{#if index % 2 === 1}
						<!-- Left: Thumbnail (even items) -->
						<div
							class="bg-[#c8e6c9] flex items-center justify-center border-r border-electric-blue overflow-hidden"
						>
							<img
								src={project.thumbnail}
								alt="{project.title} Thumbnail"
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
								{project.number}
								{project.title}
							</h3>

							<div
								class="space-y-4 text-sm leading-relaxed font-mono max-w-md text-white"
							>
								{#each project.description.split("\n\n") as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>
						</div>

						<div class="mt-8 pt-4 border-t border-electric-blue">
							<p class="text-sm font-mono text-white">
								{project.tags.join(", ")}
							</p>
							<p class="text-sm font-mono text-white">
								{project.date}
							</p>
						</div>
					</div>

					{#if index % 2 === 0}
						<!-- Right: Thumbnail (odd items) -->
						<div
							class="bg-[#c8e6c9] flex items-center justify-center overflow-hidden"
						>
							<img
								src={project.thumbnail}
								alt="{project.title} Thumbnail"
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
