<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

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
				"Im hektischen Alltag verliert man schnell den Überblick über Einnahmen, Ausgaben und finanzielle Prioritäten. Aus diesem Grund habe ich gemeinsam mit einem App-Entwickler eine moderne, übersichtliche und intuitiv bedienbare Finanz-App konzipiert und gestaltet, die Nutzerinnen und Nutzern eine klare Struktur für ihre persönlichen Finanzen bietet.\nZiel des Projekts war es, komplexe Finanzdaten visuell verständlich aufzubereiten und eine einfache, schnelle Interaktion zu ermöglichen. Die App arbeitet mit dynamischen Graphen, anschaulichen Diagrammen und individuell anpassbaren Kategorien, um Einnahmen und Ausgaben transparent darzustellen. Durch eine visuelle Aufbereitung in Form von Kreisdiagrammen, Liniendiagrammen und kategoriebasierten Übersichten wird das monatliche Budget auf einen Blick nachvollziehbar.",
			tags: ["UX Design"],
			date: "August 2024",
			thumbnail: "/ET.png",
		},
		{
			number: "02",
			title: "DUO",
			description:
				"Im Rahmen einer Studienarbeit an der DHBW Friedrichshafen wurde ein digitales Kartenspiel für die Nutzung auf einem Tablet entwickelt. Für das dafür benötigte Kartendeck habe ich das visuelle Konzept und die Gestaltung übernommen.\n\nDas Spiel orientiert sich am bekannten Prinzip von Uno, wurde jedoch für den digitalen Einsatz neu interpretiert. Ziel war ein modernes, freies und zugleich funktionales Design. Klare Farbkontraste, reduzierte Gestaltungselemente und großzügige Zahlen- und Symbolflächen sorgen für eine hohe Lesbarkeit auf dem Display.\n\nDie organisch wirkenden Farbflächen verleihen den Karten eine dynamische, zeitgemäße Anmutung und heben sie bewusst von klassischen, analogen Kartendesigns ab. So entsteht ein eigenständiger visueller Auftritt, der die digitale Spielumgebung unterstützt und gleichzeitig den vertrauten Spielcharakter bewahrt.",
			tags: ["Game Design"],
			date: "September 2024",
			thumbnail: "/Duo.png",
		},
	];
</script>

<ExpandableSection title="Eigene Projekte" alternateEntries={true}>
	{#each projects as project}
		<article class="grid grid-cols-1 border-b border-zinc-700 last:border-b-0 md:grid-cols-2">
			<div
				class="entry-text order-2 flex flex-col bg-zinc-100 text-zinc-900 md:order-1"
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

			<div class="entry-media order-1 overflow-hidden md:order-2">
				<img
					src={project.thumbnail}
					alt={`${project.title} Thumbnail`}
					class="block h-full w-full object-cover"
				/>
			</div>
		</article>
	{/each}
</ExpandableSection>
