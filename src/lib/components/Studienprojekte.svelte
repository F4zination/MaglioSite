<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';
	import ModelViewer from '$lib/components/ModelViewer.svelte';
	import VideoPlayer from '$lib/components/VideoPlayer.svelte';

	let activeVideo = $state<string | null>(null);
	let activeVideoSrc = $state<string | null>(null);
	let activeTitle = $state<string>("");
	let modelSkylightEnabled = $state(false);

	interface Project {
		number: string;
		title: string;
		description: string;
		tags: string[];
		semester: string;
		date: string;
		thumbnail?: string;
		videoSlug?: string;
		videoSrc?: string;
		modelPath?: string;
		ctaLabel?: string;
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
			ctaLabel: "Casefilm anschauen",
		},
		{
			number: "02",
			title: "Recommended by your algorithm",
			description:
				"Ziel dieses Projekts war die Realisierung eines Kurzfilms zu einem Thema aus dem Spannungsfeld „Macht und Medien“. Als inhaltlicher Schwerpunkt wurde der Algorithmus gewählt.\n\nDer Animationsfilm, der Frame für Frame auf einem Tablet gezeichnet wurde, thematisiert die allgegenwärtige Präsenz algorithmischer Systeme im Alltag und deren Einfluss auf unser Leben. Durch die Personifizierung des Algorithmus wird verdeutlicht, wie tiefgreifend und selbstverständlich er in unsere täglichen Handlungen und Entscheidungen eingebunden ist.",
			tags: ["Animationsfilm", "Konzeption"],
			semester: "4. Semester",
			date: "Juni 2025",
			thumbnail: "/P4.png",
			videoSlug: "Recommended_by_your_algorithm",
			ctaLabel: "bald verfügbar"
		},
		{
			number: "03",
			title: "Pocket Nature",
			description:
				"Ein interaktives Naturerlebnis für unterwegs. Die App verbindet Nutzer mit ihrer natürlichen Umgebung und fördert nachhaltiges Bewusstsein durch gamifizierte Erkundungstouren.",
			tags: ["App Design", "UX Research"],
			semester: "4. Semester",
			date: "März 2025",
			thumbnail: "/PocketNature.png",
			videoSlug: "Pocket_Nature",
			ctaLabel: "Casefilm anschauen",
		},
		{
			number: "04",
			title: "En Passant",
			description:
				"Ein Kurzfilm-Intro für ein Schachturnier. Die Animation verbindet klassische Schachästhetik mit modernem Motion Design.",
			tags: ["Motion Design", "Film"],
			semester: "2. Semester",
			date: "Juni 2024",
			thumbnail: "/Schachvideo.png",
			videoSlug: "Filmintro_en passant",
			ctaLabel: "Casefilm anschauen",
		},
		{
			number: "05",
			title: "Logo Animation",
			description:
				"Das Logo visualisiert den Verlauf eines typischen Semesters: Anfangs geordnet und ruhig, steigern sich mit der Zeit Arbeitsaufwand und Druck, bis das Logo anwächst und schließlich platzt - als Sinnbild für die Überforderung vieler Studierender. Trotz dieser Entwicklung entsteht am Ende ein individuelles Projekt. Die Farbgebung orientiert sich am menschlichen Gehirn und verweist auf Kreativität, Denken und Entwicklung.\n\nEin Retrofilter verleiht der Animation eine passende Ästhetik und knüpft an den Fokus auf das Medium Film im Semester an. Klanglich begleitet ein Aufblasegeräusch den Prozess und macht die visuelle Entwicklung unmittelbar nachvollziehbar.",
			tags: ["Stop Motion"],
			semester: "4. Semester",
			date: "Juni 2025",
			thumbnail: "/MdRV.png",
			videoSrc: "/MdRV%20Logo.mov",
			ctaLabel: "Animation ansehen",
		},
		{
			number: "06",
			title: "Modelling",
			description:
				"Dieses Projekt soll untersuchen, wie Algorithmen menschliches Verhalten verändern. Mithilfe des selbst erstellten 3D-Kopfmodells soll in einem kurzen Video veranschaulicht werden, wie Menschen durch Datensysteme transformiert werden, die ihr Handeln analysieren und vorhersagen.\n\nDieses Video ist allerdings noch nicht erstellt, aber hier ist ein Einblick in das bereits erstellte Modell.",
			tags: ["Blender"],
			semester: "5. Semester",
			date: "Dezember 2025",
			modelPath: "/sculpture.obj",
			ctaLabel: "3D Modell ansehen",
		},
	];

	function openVideo(videoSlug: string | null, videoSrc: string | null, title: string) {
		activeVideo = videoSlug;
		activeVideoSrc = videoSrc;
		activeTitle = title;
	}

	function closeVideo() {
		activeVideo = null;
		activeVideoSrc = null;
		activeTitle = "";
	}

	function openProjectVideo(project: Project) {
		if (!project.videoSlug && !project.videoSrc) return;
		openVideo(project.videoSlug ?? null, project.videoSrc ?? null, project.title);
	}

	function handleProjectAction(project: Project) {
		if (project.videoSlug || project.videoSrc) {
			openProjectVideo(project);
		}
	}

	function toggleModelSkylight() {
		modelSkylightEnabled = !modelSkylightEnabled;
	}
</script>

<!-- Video Modal -->
{#if activeVideo || activeVideoSrc}
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
			<VideoPlayer
				videoId={activeVideo ?? undefined}
				videoSrc={activeVideoSrc ?? undefined}
				autoplay={true}
				class="border border-zinc-700"
			/>
		</div>
	</div>
{/if}

<ExpandableSection sectionId="work" title="STUDIENPROJEKTE" alternateEntries={true}>
	{#each projects as project}
		<article class="grid grid-cols-2 border-b border-zinc-700 last:border-b-0">
			<div
				class="entry-text flex flex-col bg-zinc-100 text-zinc-900"
			>
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3
						class="font-mono text-xl underline decoration-1 underline-offset-4"
					>
						{project.number} {project.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-xl leading-[1.06] md:text-xl">

						{#each project.description.split("\n\n") as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>

					{#if project.modelPath}
						<button
							type="button"
							onclick={toggleModelSkylight}
							aria-pressed={modelSkylightEnabled}
							aria-label={modelSkylightEnabled
								? "Zur Standardbeleuchtung wechseln"
								: "Modell besser sichtbar machen"}
							class="mt-auto appearance-none inline-flex w-fit items-center border border-zinc-900 px-4 py-2 font-mono text-xl transition-colors hover:bg-zinc-900 hover:text-zinc-100"
						>
							&gt; {modelSkylightEnabled
								? "Zur Standardbeleuchtung wechseln"
								: "Modell besser sichtbar machen"}
						</button>
					{:else if project.videoSlug || project.videoSrc}
						<button
							type="button"
							onclick={() => handleProjectAction(project)}
							class="mt-auto appearance-none inline-flex w-fit items-center border border-zinc-900 px-4 py-2 font-mono text-xl transition-colors hover:bg-zinc-900 hover:text-zinc-100"
						>
							&gt; {project.ctaLabel ?? "Casefilm anschauen"}
						</button>
					{/if}

					<div class="border-t border-zinc-700 pt-4 font-mono text-xl">
						<p>{project.tags.join(", ")}</p>
						<p>{project.semester}</p>
						<p>{project.date}</p>
					</div>
				</div>
			</div>

			{#if project.modelPath}
				<div
					id={`model-panel-${project.number}`}
					class="entry-media relative overflow-hidden"
					style="--entry-media-bg: #000;"
				>
					<ModelViewer
						modelPath={project.modelPath}
						skylightEnabled={modelSkylightEnabled}
						class="min-h-[460px]"
					/>
				</div>
			{:else if project.videoSlug || project.videoSrc}
				<div class="entry-media relative overflow-hidden">
					<img
						src={project.thumbnail}
						alt={`${project.title} Thumbnail`}
						class="block h-full w-full object-cover"
					/>
				</div>
			{:else}
				<div class="entry-media relative overflow-hidden">
					{#if project.thumbnail}
						<img
							src={project.thumbnail}
							alt={`${project.title} Thumbnail`}
							class="block h-full w-full object-cover"
						/>
					{/if}
				</div>
			{/if}
		</article>
	{/each}
</ExpandableSection>
