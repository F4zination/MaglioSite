<script lang="ts">
	let expanded = $state(true);

	interface Project {
		number: string;
		title: string;
		description: string;
		tags: string[];
		semester: string;
		date: string;
		thumbnail: string;
		videoSlug?: string;
	}

	const projects: Project[] = [
		{
			number: '01',
			title: 'BeeHelpful',
			description: 'Im Rahmen dieses Projekts sollten Anwendungen zum Thema Nachbarschaftshilfe entwickelt werden.\n\nDie App BeeHelpful unterstützt insbesondere ältere Menschen dabei, unkompliziert mit jüngeren Personen in Kontakt zu treten. Darüber hinaus ermöglicht sie die Teilnahme an gemeinsamen Veranstaltungen und bietet einen integrierten Kalender, der alle wichtigen Termine übersichtlich darstellt.',
			tags: ['UX Design', 'Konzeption'],
			semester: '3. Semester',
			date: 'Dezember 2024',
			thumbnail: '/Beehelpful.png',
			videoSlug: 'BeeHelpful'
		},
		{
			number: '02',
			title: 'Pocket Nature',
			description: 'Ein interaktives Naturerlebnis für unterwegs. Die App verbindet Nutzer mit ihrer natürlichen Umgebung und fördert nachhaltiges Bewusstsein durch gamifizierte Erkundungstouren.',
			tags: ['App Design', 'UX Research'],
			semester: '4. Semester',
			date: 'März 2025',
			thumbnail: '/PocketNature.png',
			videoSlug: 'Pocket_Nature'
		},
		{
			number: '03',
			title: 'En Passant',
			description: 'Ein Kurzfilm-Intro für ein Schachturnier. Die Animation verbindet klassische Schachästhetik mit modernem Motion Design.',
			tags: ['Motion Design', 'Film'],
			semester: '2. Semester',
			date: 'Juni 2024',
			thumbnail: '/Schachvideo.png',
			videoSlug: 'Filmintro_en passant'
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
		<h2 class="text-2xl font-bold tracking-[0.3em] uppercase">Studienprojekte</h2>
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
			{#each projects as project}
				<article class="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
					<!-- Left: Text Content -->
					<div class="bg-white p-8 flex flex-col justify-between">
						<div>
							<h3 class="text-lg font-mono mb-8 underline underline-offset-4">
								{project.number} {project.title}
							</h3>
							
							<div class="space-y-4 text-sm leading-relaxed font-mono max-w-md">
								{#each project.description.split('\n\n') as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>

							{#if project.videoSlug}
								<a 
									href="/videos/hls/{project.videoSlug}/playlist.m3u8"
									class="inline-block mt-8 border border-black px-4 py-2 text-sm font-mono hover:bg-black hover:text-white transition-colors"
								>
									&gt; Casefilm ansehen
								</a>
							{/if}
						</div>

						<div class="mt-8 pt-4 border-t border-gray-300">
							<p class="text-sm font-mono underline underline-offset-2">
								{project.tags.join(', ')}
							</p>
							<p class="text-sm font-mono">{project.semester}</p>
							<p class="text-sm font-mono">{project.date}</p>
						</div>
					</div>

					<!-- Right: Thumbnail -->
					<div class="bg-[#c8e6c9] flex items-center justify-center p-8">
						<img 
							src={project.thumbnail} 
							alt="{project.title} Thumbnail"
							class="max-w-full max-h-[350px] object-contain drop-shadow-2xl"
						/>
					</div>
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
