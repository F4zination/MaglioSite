<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

	let activeDocumentUrl = $state<string | null>(null);
	let activeDocumentTitle = $state<string>("");

	interface Education {
		number: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		thumbnail: string;
		documentUrl?: string;
		ctaLabel?: string;
	}

	const educations: Education[] = [
		{
			number: "01",
			title: "Abschlussprüfung",
			description:
				"Für die Agrargenossenschaft Finow sollte ich einen Flyer mit Kreuzbruchfalz entwickeln, um auf die neu eingeführten Produkte aufmerksam zu machen. Das fiktive Unternehmen legte großen Wert auf ein ressourcenschonendes Werbemittel. Das Ergebnis ist ein Flyer in Form eines Briefumschlags, der alle relevanten Informationen übersichtlich und klar präsentiert. Während Format, Logo, Text und Bilder vorgegeben waren, konnte ich das Farbkonzept, die Typografie, das Raster sowie Grafikelemente und Bildbearbeitungen eigenständig gestalten.",
			tags: ["Abschlussprüfung Mediengestalter/in", "Gestaltung eines Flyers"],
			date: "Dezember 2022",
			thumbnail: "/AP.png",
			documentUrl: "/Dokumentation_AP.pdf",
			ctaLabel: "Dokumentation ansehen",
		},
		{
			number: "02",
			title: "Biogemüse Ravensburg",
			description:
				"Für dieses Projekt erhielten wir lediglich den Namen und das Tätigkeitsfeld eines fiktiven Unternehmens. Auf dieser Grundlage habe ich ein durchgängiges Corporate Design entwickelt, inklusive Logo, Visitenkarten (in klassischer und in extravaganter Ausführung), Stoffbeuteln, Briefpapier und einer Samentüte. Die Stoffbeutel haben wir abschließend mithilfe des Siebdruckverfahrens produziert.",
			tags: ["Branding", "Corporate Design"],
			date: "Dezember 2022",
			thumbnail: "/Biogemüse RV.png",
		},
	];

	function openEducationDocument(education: Education) {
		if (!education.documentUrl) return;
		activeDocumentUrl = education.documentUrl;
		activeDocumentTitle = education.title;
	}

	function closeDocument() {
		activeDocumentUrl = null;
		activeDocumentTitle = "";
	}
</script>

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

<ExpandableSection title="Ausbildung" alternateEntries={true}>
	{#each educations as education}
		<article class="grid grid-cols-1 border-b border-zinc-700 last:border-b-0 md:grid-cols-2">
			<div
				class="entry-text order-2 flex flex-col bg-zinc-100 text-zinc-900 md:order-1"
			>
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3 class="font-mono text-2xl underline decoration-1 underline-offset-4">
						{education.number} {education.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-xl leading-[1.06] md:text-2xl">
						{#each education.description.split("\n\n") as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>

					<div class="mt-auto flex flex-col gap-6">
						{#if education.documentUrl}
							<button
								type="button"
								onclick={() => openEducationDocument(education)}
								class="appearance-none inline-flex w-fit items-center border border-zinc-900 px-4 py-2 font-mono text-xl transition-colors hover:bg-zinc-900 hover:text-zinc-100"
							>
								&gt; {education.ctaLabel ?? "Dokumentation ansehen"}
							</button>
						{/if}

						<div class="border-t border-zinc-700 pt-4 font-mono text-2xl">
							<p>{education.tags.join(", ")}</p>
							<p>{education.date}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="entry-media order-1 overflow-hidden md:order-2">
				<img
					src={education.thumbnail}
					alt={`${education.title} Thumbnail`}
					class="block h-full w-full object-cover"
				/>
			</div>
		</article>
	{/each}
</ExpandableSection>
