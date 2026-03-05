<script lang="ts">
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';

	interface Experience {
		number: string;
		title: string;
		description: string;
		tags: string[];
		date: string;
		thumbnail: string;
		customerLinks?: {
			label: string;
			url: string;
		}[];
		inlineImage?: {
			src: string;
			alt: string;
		};
	}

	const experiences: Experience[] = [
		{
			number: "01",
			title: "Vektorgrafiken Duschkabine",
			description:
				"Kunde: Duka\n\nFür die Erstellung der Montageanleitungen der Duschkabinen von Duka erhält unser Team präzise Informationen zur Montage direkt vom Kunden. Als Grafikerin fertige ich auf Basis eines 3D-Modells und unter strikter Beachtung des verbindlichen Grafikleitfadens die entsprechenden Illustrationen an.\n\nMithilfe von SolidWorks werden die 3D-Daten erstellt, die ich anschließend in Adobe Illustrator für die weitere Aufbereitung nutze.\n\nDie finale Gestaltung und Layoutentwicklung erfolgt in Adobe InDesign,um eine klare und ansprechende Darstellung sicherzustellen.",
			tags: ["Technische Grafiken"],
			date: "Tanner GmbH Lindau",
			thumbnail: "/Duka.png",
			customerLinks: [
				{
					label: "Montageanleitung ansehen",
					url: "https://www.duka.it/media/MA_C6_FPN.pdf",
				},
			],
		},
		{
			number: "02",
			title: "Vektorgrafiken Wohnwagen",
			description:
				"Kunde: Dethleffs\n\nFür die Erstellung der Bedienungsanleitungen bei Dethleffs habe ich die Grafiken auf Basis von Originalfotos angefertigt. Dabei nutze ich Adobe Illustrator, um die Vorlagen detailgetreu nachzuzeichnen und gleichzeitig die wesentlichen Elemente hervorzuheben, damit sie leicht verständlich bleiben. Mein Anspruch ist es, klare und übersichtliche Illustrationen zu schaffen, die den Anwenderinnen und Anwendern einen schnellen und intuitiven Zugang zu den Informationen ermöglichen.",
			tags: ["Technische Grafiken"],
			date: "Tanner GmbH Lindau",
			thumbnail: "/Detthlefs.png",
			customerLinks: [
				{
					label: "Bedienungsanleitung ansehen",
					url: "https://www.dethleffs.de/dethleffs/01_DE/02_pdfs/06_bedienungsanleitungn/2025/x1513.08.230_motorcaravan_2025_de-web.pdf"
				}
			],
		},
		{
			number: "03",
			title: "Marketingunterstützung Baumarkt",
			description:
				"Kunde: Building Material Suisse\n\nFür die Erstellung von Broschüren, Katalogen, kurze Werbevideos und Aktionsflyern für den Schweizer Baumarkt BMS setze ich die Dokumente konsequent im Corporate Design des Unternehmens um und halte die Daten regelmäßig auf dem neuesten Stand. Die Gestaltung erfolgt hauptsächlich mit Adobe InDesign und wird aktuell mithilfe von EasyCatalog automatisiert, in das ich mich derzeit einarbeite. Zusätzlich werden Icons in Illustrator erstellt oder Bilder in Photoshop bearbeitet, um ein einheitliches und ansprechendes Gesamtbild zu gewährleisten.",
			tags: ["Technisches Marketing"],
			date: "Tanner GmbH Lindau",
			thumbnail: "/BMS.png",
			customerLinks: [
				{
					label: "Kataloge ansehen",
					url: "https://www.baubedarf-richner-miauton.ch/de/kataloge/",
				},
				{
					label: "Aktionsbroschüren ansehen",
					url: "https://online.flippingbook.com/view/493319494/",
				},
			],
		},
	];
</script>

<ExpandableSection title="Berufliche Erfahrungen" alternateEntries={true}>
	{#each experiences as experience}
		<article class="grid grid-cols-1 border-b border-zinc-700 last:border-b-0 md:grid-cols-2">
			<div
				class="entry-text order-2 flex flex-col bg-zinc-100 text-zinc-900 md:order-1"
			>
				<div class="border-b border-zinc-700 px-6 py-4">
					<h3 class="font-mono text-2xl underline decoration-1 underline-offset-4">
						{experience.number} {experience.title}
					</h3>
				</div>
				<div class="flex flex-1 flex-col gap-6 p-6 md:p-8">
					<div class="space-y-4 font-mono text-xl leading-[1.06] md:text-2xl">
						{#each experience.description.split("\n\n") as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>

					{#if experience.inlineImage}
						<div class="overflow-hidden">
							<img
								src={experience.inlineImage.src}
								alt={experience.inlineImage.alt}
								class="block w-full object-cover"
							/>
						</div>
					{/if}

					<div class="mt-auto flex flex-col gap-6">
						{#if experience.customerLinks?.length}
							<div class="flex flex-col gap-3">
								{#each experience.customerLinks as link}
									<a
										href={link.url}
										target="_blank"
										rel="noreferrer"
										class="inline-flex w-fit items-center border border-zinc-900 px-4 py-2 font-mono text-xl transition-colors hover:bg-zinc-900 hover:text-zinc-100"
									>
										&gt; {link.label}
									</a>
								{/each}
							</div>
						{/if}

						<div class="border-t border-zinc-700 pt-4 font-mono text-2xl">
							<p>{experience.tags.join(", ")}</p>
							<p>{experience.date}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="entry-media order-1 overflow-hidden md:order-2">
				<img
					src={experience.thumbnail}
					alt={`${experience.title} Thumbnail`}
					class="block h-full w-full object-cover"
				/>
			</div>
		</article>
	{/each}
</ExpandableSection>
