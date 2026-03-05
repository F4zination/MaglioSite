<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';
	import ModelViewer from '$lib/components/ModelViewer.svelte';
	import VideoPlayer from '$lib/components/VideoPlayer.svelte';

	let activeVideo = $state<string | null>(null);
	let activeVideoSrc = $state<string | null>(null);
	let activeTitle = $state<string>("");
	let activeDocumentUrl = $state<string | null>(null);
	let activeDocumentTitle = $state<string>("");
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
		documentUrl?: string;
		ctaLabel?: string;
	}

	const projects: Project[] = [
		{
			number: "01",
			title: "Pocket Nature",
			description:
				"Pocket Nature ist eine spielerische Lern-App, die Kinder und Jugendliche wieder aktiv mit der realen Natur verbindet. Statt Wissen nur digital zu vermitteln, motiviert sie dazu, nach draußen zu gehen, Pflanzen, Tiere und Pilze zu entdecken und per Smartphone zu erkennen. Jede gefundene Art wird als Sammelkarte freigeschaltet und vermittelt anschaulich Wissen über ihre Rolle im Ökosystem\nIm Mittelpunkt steht eine persönliche Insel, auf der die gesammelten Arten platziert werden. Sie beeinflussen sich gegenseitig, wachsen gemeinsam und bilden ein lebendiges Ökosystem. Vielfalt wird belohnt, Monokulturen schwächen die Insel - ökologische Zusammenhänge werden so intuitiv verständlich. Pocket Nature ist damit mehr als ein Spiel: Es macht Natur wieder erlebbar, verständlich und emotional wertvoll.",
			tags: ["UX Design", "Konzeption"],
			semester: "5. Semester",
			date: "Dezember 2025",
			thumbnail: "/PocketNature.png",
			videoSlug: "Pocket_Nature",
			ctaLabel: "Casefilm anschauen",
		},
		{
			number: "02",
			title: "Recommended by your algorithm",
			description:
				"Ziel dieses Projekts war die Realisierung eines Kurzfilms zu einem Thema aus dem Spannungsfeld „Macht und Medien“. Als inhaltlicher Schwerpunkt wurde der Algorithmus gewählt.\n\nDer Animationsfilm, welcher Frame by Frame auf einem Tablet gezeichnet wurde, thematisiert die allgegenwärtige Präsenz algorithmischer Systeme im Alltag und deren Einfluss auf unser Leben. Durch die Personifizierung des Algorithmus wird verdeutlicht, wie tiefgreifend und selbstverständlich er in unsere täglichen Handlungen und Entscheidungen eingebunden ist.",
			tags: ["Animationsfilm", "Konzeption"],
			semester: "4. Semester",
			date: "Juni 2025",
			thumbnail: "/P4.png",
			videoSlug: "Recommended_by_your_algorithm",
			ctaLabel: "Kurzfilm ansehen",
		},
		{
			number: "03",
			title: "BeeHelpful",
			description:
				"Im Rahmen dieses Projekts sollten Anwendungen zum Thema Nachbarschaftshilfe entwickelt werden.\n\nDie App BeeHelpful unterstützt insbesondere ältere Menschen dabei, unkompliziert mit jüngeren Personen in Kontakt zu treten. Darüber hinaus ermöglicht sie die Teilnahme an gemeinsamen Veranstaltungen und bietet einen integrierten Kalender, der alle wichtigen Termine übersichtlich darstellt.",
			tags: ["UX Design", "Konzeption"],
			semester: "3. Semester",
			date: "Dezember 2024",
			thumbnail: "/Beehelpful.png",
			videoSlug: "BeeHelpful",
			ctaLabel: "Casefilm ansehen",
		},
		{
			number: "04",
			title: "Modelling",
			description:
				"Dieses Projekt soll untersuchen, wie Algorithmen menschliches Verhalten verändern. Mithilfe des selbst erstellten 3D-Kopfmodells soll in einem kurzen Video veranschaulicht werden, wie Menschen durch Datensysteme transformiert werden, die ihr Handeln analysieren und vorhersagen.\n\nDieses Video ist allerdings noch nicht erstellt, aber hier ist ein Einblick in das bereits erstellte Modell.",
			tags: ["Blender"],
			semester: "5. Semester",
			date: "Dezember 2025",
			modelPath: "/sculpture.obj",
			ctaLabel: "3D Modell ansehen",
		},
		{
			number: "05",
			title: "Filmintro",
			description:
				"Die Aufgabe bestand darin, ein Intro mithilfe von Blender zu konzipieren, zu bauen und zu animieren.\n\nIn dem Film geht es um einen Serienmörder, der seine Opfer stets auf dieselbe Weise tötet. Er folgt dabei einem perfiden, immer gleichen Muster: Die Morde geschehen scheinbar beiläufig - „en passant“, wie im Schach, also „beim Vorbeigehen“. Genau dieser Schachzug wurde deshalb als Symbol für das Intro gewählt, da er die Eleganz und Unauffälligkeit seiner Vorgehensweise widerspiegelt.\n\nDie Farbgebung erinnert an eine düstere Abenddämmerung - dunkel und unheimlich. Nebel und punktuelle Lichtquellen verstärken die gruselige, spannungsgeladene Atmosphäre des Films.",
			tags: ["Blender"],
			semester: "4. Semester",
			date: "Juni 2025",
			thumbnail: "/Schachvideo.png",
			videoSlug: "Filmintro_en passant",
			ctaLabel: "Intro ansehen",
		},
		{
			number: "06",
			title: "Branding Museum Langenargen",
			description:
				"Im 5. Semester bot sich uns eine einmalige Gelegenheit: die Entwicklung eines neuen Brandings für ein reales Museum in Langenargen.\n\nZiel unseres Gestaltungskonzepts war es, die starke regionale Verankerung des Museums hervorzuheben. Die unmittelbare Lage am Bodensee diente dabei als zentrale Inspirationsquelle und führte zur Idee, das Museum künftig „Museeum“ zu nennen.\n\nDarüber hinaus standen für uns Werte wie Verbindung und Vertrauen im Fokus - Qualitäten, die ein Museum als kultureller Ort vermitteln sollte. Dieses Leitmotiv des Verbindens, des Brückenbauens spiegelt sich konsequent im visuellen Erscheinungsbild wider. Grafisch wird es durch miteinander verbundene Kreisformen aufgegriffen, die sowohl Nähe als auch Austausch symbolisieren und dem Branding eine klare, einprägsame Identität verleihen.",
			tags: ["Designkonzeption"],
			semester: "5. Semester",
			date: "Dezember 2025",
			thumbnail: "/MuseumLangenargen.png",
			documentUrl: "/Brandbook_MuseumLangenargen.pdf",
			ctaLabel: "Brandbook ansehen",
		},
		{
			number: "07",
			title: "Das ExperTier",
			description:
				"Viele Menschen haben nur ein sehr begrenztes Wissen über die Tierwelt. Sie können viele Arten weder richtig benennen noch grundlegende Fakten einschätzen. Dieses fehlende Basiswissen führt dazu, dass Biodiversität abstrakt wirkt und ihr Wert im Alltag kaum wahrgenommen wird.\n\nHier setzt das Projekt an: Ein Kartenspiel, das Spieler über Schätzen und Vergleichen intuitiv an grundlegende Tierfakten heranführt. Durch den spielerischen Zugang entsteht ein natürlicher Lerneffekt, ohne dass es sich wie klassische Wissensvermittlung anfühlt. Zielgruppe sind sowohl Kinder als auch Erwachsene, die Interesse an Tieren haben.",
			tags: ["Game Design", "Konzeption"],
			semester: "5. Semester",
			date: "Dezember 2025",
			thumbnail: "/Das_Expertier.png",
		},
		{
			number: "08",
			title: "Logo Animation",
			description:
				"Das Logo visualisiert den Verlauf eines typischen Semesters: Anfangs geordnet und ruhig, steigern sich mit der Zeit Arbeitsaufwand und Druck, bis das Logo anwächst und schließlich platzt – als Sinnbild für die Überforderung vieler Studierender. Trotz dieser Entwicklung entsteht am Ende ein individuelles Projekt.\nDie Farbgebung orientiert sich am menschlichen Gehirn und verweist auf Kreativität, Denken und Entwicklung. Ein Retrofilter verleiht der Animation eine passende Ästhetik und knüpft an den Fokus auf das Medium Film im Semester an. Klanglich begleitet ein Aufblasgeräusch den Prozess und macht die visuelle Entwicklung unmittelbar nachvollziehbar.",
			tags: ["Stop Motion"],
			semester: "4. Semester",
			date: "Juni 2025",
			thumbnail: "/MdRV.png",
			videoSrc: "/MdRV%20Logo.mov",
			ctaLabel: "Animation ansehen",
		},

	];

	function openVideo(videoSlug: string | null, videoSrc: string | null, title: string) {
		activeDocumentUrl = null;
		activeDocumentTitle = "";
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

	function openProjectDocument(project: Project) {
		if (!project.documentUrl) return;
		activeVideo = null;
		activeVideoSrc = null;
		activeTitle = "";
		activeDocumentUrl = project.documentUrl;
		activeDocumentTitle = project.title;
	}

	function closeDocument() {
		activeDocumentUrl = null;
		activeDocumentTitle = "";
	}

	function handleProjectAction(project: Project) {
		if (project.videoSlug || project.videoSrc) {
			openProjectVideo(project);
			return;
		}

		if (project.documentUrl) {
			openProjectDocument(project);
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

<!-- PDF Modal -->
{#if activeDocumentUrl}
	<div class="fixed inset-0 z-50 p-4 md:p-8">
		<button
			type="button"
			class="absolute inset-0 appearance-none bg-black/90"
			onclick={closeDocument}
			aria-label="Dokument schließen"
		></button>
		<div
			class="relative mx-auto mt-8 w-full max-w-5xl"
			role="dialog"
			aria-modal="true"
			aria-label={activeDocumentTitle}
		>
			<div class="mb-4 flex items-center justify-between gap-4">
				<h3 class="text-xl font-mono text-white md:text-2xl">{activeDocumentTitle}</h3>
				<button
					type="button"
					onclick={closeDocument}
					class="appearance-none text-3xl text-white transition-opacity hover:opacity-70"
					aria-label="Schließen"
				>
					✕
				</button>
			</div>
			<div class="h-[75vh] w-full overflow-hidden border border-zinc-700 bg-zinc-100">
				<iframe
					src={activeDocumentUrl}
					title={`${activeDocumentTitle} PDF`}
					class="h-full w-full"
					loading="lazy"
				></iframe>
			</div>
		</div>
	</div>
{/if}

<ExpandableSection sectionId="work" title="Studienprojekte" alternateEntries={true}>
	{#each projects as project}
		<article class="grid grid-cols-1 border-b border-zinc-700 last:border-b-0 md:grid-cols-2">
			<div
				class="entry-text order-2 flex flex-col bg-zinc-100 text-zinc-900 md:order-1"
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

					<div class="mt-auto flex flex-col gap-6">
						{#if project.modelPath}
							<button
								type="button"
								onclick={toggleModelSkylight}
								aria-pressed={modelSkylightEnabled}
								aria-label={modelSkylightEnabled
									? "Licht aus"
									: "Licht ein"}
								class="appearance-none inline-flex w-fit items-center border border-zinc-900 px-4 py-2 font-mono text-xl transition-colors hover:bg-zinc-900 hover:text-zinc-100"
							>
								&gt; {modelSkylightEnabled
									? "Licht aus"
									: "Licht ein"}
							</button>
						{:else if project.videoSlug || project.videoSrc || project.documentUrl}
							<button
								type="button"
								onclick={() => handleProjectAction(project)}
								class="appearance-none inline-flex w-fit items-center border border-zinc-900 px-4 py-2 font-mono text-xl transition-colors hover:bg-zinc-900 hover:text-zinc-100"
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
			</div>

			{#if project.modelPath}
				<div
					id={`model-panel-${project.number}`}
					class="entry-media order-1 relative overflow-hidden md:order-2"
					style="--entry-media-bg: #000;"
				>
					<ModelViewer
						modelPath={project.modelPath}
						skylightEnabled={modelSkylightEnabled}
						class="min-h-[460px]"
					/>
				</div>
			{:else if project.videoSlug || project.videoSrc}
				<div class="entry-media order-1 relative overflow-hidden md:order-2">
					<img
						src={project.thumbnail}
						alt={`${project.title} Thumbnail`}
						class="block h-full w-full object-cover"
					/>
				</div>
			{:else}
				<div class="entry-media order-1 relative overflow-hidden md:order-2">
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
