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
			number: '01',
			title: 'Expense Tracker',
			description: 'Eine persönliche Finanz-App zur Verfolgung von Ausgaben und Einnahmen. Die App ermöglicht es Nutzern, ihre Finanzen übersichtlich zu verwalten und Sparziele zu setzen.',
			tags: ['App Design', 'UX Design'],
			date: '2025',
			thumbnail: '/ET.png'
		},
		{
			number: '02',
			title: 'DUO',
			description: 'Ein kreatives Projekt, das zwei komplementäre Designkonzepte verbindet und eine harmonische visuelle Sprache entwickelt.',
			tags: ['Visual Design', 'Konzeption'],
			date: '2025',
			thumbnail: '/Duo.png'
		}
	];

	function toggleExpanded() {
		expanded = !expanded;
	}
</script>

<section class="w-full">
	<!-- Header -->
	<button 
		onclick={toggleExpanded}
		class="w-full bg-black text-white py-4 px-6 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors"
	>
		<h2 class="text-2xl font-bold tracking-[0.3em] uppercase">Eigene Projekte</h2>
		<span 
			class="text-2xl transition-transform duration-300"
			class:rotate-180={!expanded}
		>
			^
		</span>
	</button>

	<!-- Content -->
	{#if expanded}
		<div class="divide-y divide-gray-300">
			{#each projects as project, index}
				<article class="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
					{#if index % 2 === 1}
						<!-- Left: Thumbnail (even items) -->
						<div class="bg-[#c8e6c9] flex items-center justify-center p-8 border-r border-gray-300">
							<img 
								src={project.thumbnail} 
								alt="{project.title} Thumbnail"
								class="max-w-full max-h-[350px] object-contain drop-shadow-2xl"
							/>
						</div>
					{/if}

					<!-- Text Content -->
					<div class="bg-white p-8 flex flex-col justify-between {index % 2 === 0 ? 'border-r border-gray-300' : ''}">
						<div>
							<h3 class="text-lg font-mono mb-8 underline underline-offset-4">
								{project.number} {project.title}
							</h3>
							
							<div class="space-y-4 text-sm leading-relaxed font-mono max-w-md">
								{#each project.description.split('\n\n') as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>
						</div>

						<div class="mt-8 pt-4 border-t border-gray-300">
							<p class="text-sm font-mono underline underline-offset-2">
								{project.tags.join(', ')}
							</p>
							<p class="text-sm font-mono">{project.date}</p>
						</div>
					</div>

					{#if index % 2 === 0}
						<!-- Right: Thumbnail (odd items) -->
						<div class="bg-[#c8e6c9] flex items-center justify-center p-8">
							<img 
								src={project.thumbnail} 
								alt="{project.title} Thumbnail"
								class="max-w-full max-h-[350px] object-contain drop-shadow-2xl"
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
