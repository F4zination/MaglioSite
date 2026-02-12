<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ExpandableSection from '$lib/components/ExpandableSection.svelte';
</script>

<div class="min-h-screen border border-zinc-700 bg-white text-black">
	<Header />

	<main class="border-b border-zinc-700">
		<ExpandableSection
			sectionId="impressum"
			title="Impressum"
			initialExpanded={true}
			class="bg-white text-black"
			contentClass="bg-white text-black"
			titleClass="text-black"
			buttonClass="bg-white text-black hover:bg-zinc-100"
			iconClass="invert"
		>
			<div class="border-t border-zinc-700 px-6 py-10 lg:px-12">
				<div class="grid gap-6 font-mono text-xl leading-relaxed md:text-2xl">
					<p>
						Elisa Maglio<br />
						Lindauerstraße 92<br />
						88046 Friedrichshafen
					</p>

					<p>
						E-Mail: <a
							href="mailto:elisa.maglio@web.de"
							class="underline decoration-zinc-500 underline-offset-4 hover:opacity-70"
							>contact@elisamaglio.de</a
						>
					</p>

					<p>
						Inhaltlich verantwortlich gemäß § 55 Abs. 2 RStV: Elisa Maglio
					</p>
				</div>
			</div>
		</ExpandableSection>

		<ExpandableSection
			sectionId="datenschutz"
			title="Datenschutz"
			initialExpanded={false}
			class="bg-white text-black"
			contentClass="bg-white text-black"
			titleClass="text-black"
			buttonClass="bg-white text-black hover:bg-zinc-100"
			iconClass="invert"
		>
			<div class="border-t border-zinc-700 px-6 py-10 lg:px-12">
				<div class="grid gap-6 font-mono text-xl leading-relaxed md:text-2xl">
					<p>
						1. Datenschutz auf einen Blick Der Schutz Ihrer persönlichen Daten ist mir ein wichtiges Anliegen. Diese Website ist so konzipiert, dass sie keine personenbezogenen Daten durch Formulare, Cookies oder Tracking-Tools erhebt.
					</p>

					<p>
						2. Hosting und Server-Log-Files Beim Aufruf dieser Website werden durch den Webspace-Provider automatisch Informationen erhoben und in sogenannten Server-Log-Files gespeichert. Diese Informationen werden von Ihrem Browser automatisch übermittelt. Dies umfasst:

						Browsertyp und Browserversion

						Verwendetes Betriebssystem

						Referrer URL (die zuvor besuchte Seite)

						Hostname des zugreifenden Rechners

						Uhrzeit der Serveranfrage

						IP-Adresse

						Diese Daten sind technisch erforderlich, um die Website korrekt auszuliefern und die Sicherheit des Servers zu gewährleisten. Die Rechtsgrundlage für diese Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.

					</p>

					<p>
						3. Keine Cookies und Analysetools Diese Website verwendet keine Cookies und verzichtet vollständig auf Webanalyse-Dienste (wie Google Analytics) oder Werbe-Tracking.

					</p>

					<p>
						4. Ihre Rechte Sie haben das Recht, jederzeit Auskunft über die bei uns eventuell kurzzeitig gespeicherten Daten zu erhalten. Da wir keine Daten dauerhaft speichern oder Profile erstellen, beschränkt sich dies in der Regel auf die oben genannten Log-Files. Bei Fragen zum Datenschutz können Sie sich jederzeit an die im Impressum angegebene E-Mail-Adresse wenden.
					</p>

					<p>
						Bei Fragen zum Datenschutz wenden Sie sich bitte an:
						<a
							href="mailto:contact@elisamaglio.de"
							class="underline decoration-zinc-500 underline-offset-4 hover:opacity-70"
						>
							contact@elisamaglio.de
						</a>
					</p>
				</div>
			</div>
		</ExpandableSection>
	</main>

	<Footer />
</div>
