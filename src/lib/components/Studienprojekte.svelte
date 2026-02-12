<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

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
		visualTone: string;
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
			visualTone: "bg-[#b6ccb2]",
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
			visualTone: "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
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
			visualTone: "bg-zinc-200",
		},
	];

	function openVideo(videoSlug: string, title: string) {
		activeVideo = videoSlug;
		activeTitle = title;
	}

	function closeVideo() {
		activeVideo = null;
		activeTitle = "";
	}

	function openProjectVideo(project: Project) {
		if (!project.videoSlug) return;
		openVideo(project.videoSlug, project.title);
	}
</script>

<!-- Video Modal -->
{#if activeVideo}
	<div class="fixed inset-0 z-50 p-4 md:p-8">
		<button
			type="button"
			class="absolute inset-0 appearance-none bg-black/90"
			onclick={closeVideo}
			aria-label="Video schließen"
		></button>
		<div
			class="relative mx-auto mt-8 w-full max-w-5xl"
			role="dialog"
			aria-modal="true"
			aria-label={activeTitle}
		>
			<div class="mb-4 flex items-center justify-between gap-4">
				<h3 class="text-xl font-mono text-white md:text-2xl">{activeTitle}</h3>
				<button
					type="button"
					onclick={closeVideo}
					class="appearance-none text-3xl text-white transition-opacity hover:opacity-70"
					aria-label="Schließen"
				>
					✕
				</button>
			</div>
			<video
				src="/videos/hls/{activeVideo}/playlist.m3u8"
				class="w-full border border-zinc-700 bg-black"
				controls
				autoplay
			>
				<track kind="captions" />
				Your browser does not support the video tag.
			</video>
		</div>
	</div>
{/if}

<ExpandableSection sectionId="work" title="STUDIENPROJEKTE" alternateEntries={true}>
	{#each projects as project}
		<article
			class="grid min-h-[560px] grid-cols-2 border-b border-zinc-700 last:border-b-0"
		>
			<div
				class="entry-text flex flex-col border-r border-zinc-700 bg-zinc-100 text-zinc-900"
			>
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3
						class="font-mono text-xl underline decoration-1 underline-offset-4"
					>
						{project.number} {project.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-xl leading-[1.06] md:text-2xl">

						{#each project.description.split("\n\n") as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>

					{#if project.videoSlug}
						<button
							type="button"
							onclick={() => openProjectVideo(project)}
							class="appearance-none inline-flex w-fit items-center border border-zinc-900 px-4 py-2 font-mono text-xl transition-colors hover:bg-zinc-900 hover:text-zinc-100"
						>
							&gt; Casefilm ansehen
						</button>
					{/if}

					<div class="border-t border-zinc-700 pt-4 font-mono text-2xl">
						<p>{project.tags.join(", ")}</p>
						<p>{project.semester}</p>
						<p>{project.date}</p>
					</div>
				</div>
			</div>

			<button
				type="button"
				class="entry-media group relative flex items-center justify-center overflow-hidden appearance-none p-8 md:p-14 {project.visualTone}"
				onclick={() => openProjectVideo(project)}
				disabled={!project.videoSlug}
			>
				<div class="relative h-full w-full">
					<img
						src={project.thumbnail}
						alt={`${project.title} Thumbnail`}
						class="h-full max-h-[460px] w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.02]"
					/>
					{#if project.videoSlug}
						<div
							class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
						>
							<div class="rounded-full bg-black/75 p-4">
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
		</article>
	{/each}
</ExpandableSection>
