<script lang="ts">
	let expanded = $state(true);
	let activeVideo = $state<string | null>(null);
	let activeTitle = $state<string>("");

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
			number: "01",
			title: "BeeHelpful",
			description:
				"Im Rahmen dieses Projekts sollten Anwendungen zum Thema Nachbarschaftshilfe entwickelt werden.\n\nDie App BeeHelpful unterstützt insbesondere ältere Menschen dabei, unkompliziert mit jüngeren Personen in Kontakt zu treten. Darüber hinaus ermöglicht sie die Teilnahme an gemeinsamen Veranstaltungen und bietet einen integrierten Kalender, der alle wichtigen Termine übersichtlich darstellt.",
			tags: ["UX Design", "Konzeption"],
			semester: "3. Semester",
			date: "Dezember 2024",
			thumbnail: "/Beehelpful.png",
			videoSlug: "BeeHelpful",
		},
		{
			number: "02",
			title: "Pocket Nature",
			description:
				"Ein interaktives Naturerlebnis für unterwegs. Die App verbindet Nutzer mit ihrer natürlichen Umgebung und fördert nachhaltiges Bewusstsein durch gamifizierte Erkundungstouren.",
			tags: ["App Design", "UX Research"],
			semester: "4. Semester",
			date: "März 2025",
			thumbnail: "/PocketNature.png",
			videoSlug: "Pocket_Nature",
		},
		{
			number: "03",
			title: "En Passant",
			description:
				"Ein Kurzfilm-Intro für ein Schachturnier. Die Animation verbindet klassische Schachästhetik mit modernem Motion Design.",
			tags: ["Motion Design", "Film"],
			semester: "2. Semester",
			date: "Juni 2024",
			thumbnail: "/Schachvideo.png",
			videoSlug: "Filmintro_en passant",
		},
	];

	function toggleExpanded() {
		expanded = !expanded;
	}

	function openVideo(videoSlug: string, title: string) {
		activeVideo = videoSlug;
		activeTitle = title;
	}

	function closeVideo() {
		activeVideo = null;
		activeTitle = "";
	}
</script>

<section class="w-full">
	<!-- Video Modal -->
	{#if activeVideo}
		<div
			class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
			onclick={closeVideo}
			onkeydown={(e) => e.key === "Escape" && closeVideo()}
			role="dialog"
			tabindex="-1"
		>
			<div
				class="relative w-full max-w-4xl"
				onclick={(e) => e.stopPropagation()}
				role="document"
			>
				<button
					onclick={closeVideo}
					class="absolute -top-12 right-0 text-white text-3xl hover:opacity-70 transition-opacity"
					aria-label="Schließen"
				>
					✕
				</button>
				<h3 class="text-white text-xl font-mono mb-4">{activeTitle}</h3>
				<video
					src="/videos/hls/{activeVideo}/playlist.m3u8"
					class="w-full rounded-lg"
					controls
					autoplay
				>
					<track kind="captions" />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	{/if}

	<!-- Header -->
	<button
		onclick={toggleExpanded}
		class="w-full bg-black text-white py-4 px-6 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors"
	>
		<h2 class="text-2xl font-bold tracking-[0.3em] uppercase">
			Studienprojekte
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
		<div class="divide-y divide-gray-300">
			{#each projects as project, index}
				<article class="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
					{#if index % 2 === 1}
						<!-- Left: Thumbnail (even items) -->
						<button
							class="bg-[#c8e6c9] flex items-center justify-center p-8 border-r border-gray-300 cursor-pointer group"
							onclick={() =>
								project.videoSlug &&
								openVideo(project.videoSlug, project.title)}
							disabled={!project.videoSlug}
						>
							<div class="relative">
								<img
									src={project.thumbnail}
									alt="{project.title} Thumbnail"
									class="max-w-full max-h-[350px] object-contain drop-shadow-2xl transition-transform group-hover:scale-105"
								/>
								{#if project.videoSlug}
									<div
										class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<div
											class="bg-black/70 rounded-full p-4"
										>
											<svg
												class="w-12 h-12 text-white"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8 5v14l11-7z" />
											</svg>
										</div>
									</div>
								{/if}
							</div>
						</button>
					{/if}

					<!-- Text Content -->
					<div
						class="bg-white p-8 flex flex-col justify-between {index %
							2 ===
						0
							? 'border-r border-gray-300'
							: ''}"
					>
						<div>
							<h3
								class="text-lg font-mono mb-8 underline underline-offset-4"
							>
								{project.number}
								{project.title}
							</h3>

							<div
								class="space-y-4 text-sm leading-relaxed font-mono max-w-md"
							>
								{#each project.description.split("\n\n") as paragraph}
									<p>{paragraph}</p>
								{/each}
							</div>

							{#if project.videoSlug}
								<button
									onclick={() =>
										openVideo(
											project.videoSlug!,
											project.title,
										)}
									class="inline-block mt-8 border border-black px-4 py-2 text-sm font-mono hover:bg-black hover:text-white transition-colors cursor-pointer"
								>
									&gt; Casefilm ansehen
								</button>
							{/if}
						</div>

						<div class="mt-8 pt-4 border-t border-gray-300">
							<p
								class="text-sm font-mono underline underline-offset-2"
							>
								{project.tags.join(", ")}
							</p>
							<p class="text-sm font-mono">{project.semester}</p>
							<p class="text-sm font-mono">{project.date}</p>
						</div>
					</div>

					{#if index % 2 === 0}
						<!-- Right: Thumbnail (odd items) -->
						<button
							class="bg-[#c8e6c9] flex items-center justify-center p-8 cursor-pointer group"
							onclick={() =>
								project.videoSlug &&
								openVideo(project.videoSlug, project.title)}
							disabled={!project.videoSlug}
						>
							<div class="relative">
								<img
									src={project.thumbnail}
									alt="{project.title} Thumbnail"
									class="max-w-full max-h-[350px] object-contain drop-shadow-2xl transition-transform group-hover:scale-105"
								/>
								{#if project.videoSlug}
									<div
										class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<div
											class="bg-black/70 rounded-full p-4"
										>
											<svg
												class="w-12 h-12 text-white"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M8 5v14l11-7z" />
											</svg>
										</div>
									</div>
								{/if}
							</div>
						</button>
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
