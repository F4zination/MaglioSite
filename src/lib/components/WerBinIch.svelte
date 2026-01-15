<script lang="ts">
    let expanded = $state(true);

    function toggleExpanded() {
        expanded = !expanded;
    }
</script>

<section id="about" class="w-full">
    <!-- Header -->
    <button
        onclick={toggleExpanded}
        class="w-full bg-black text-white py-4 px-6 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors"
    >
        <h2 class="text-2xl font-bold tracking-[0.3em] uppercase">
            Wer bin ich?
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
        <div class="bg-white">
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div
                    class="border-b border-gray-300 md:border-b-0 md:border-r md:border-gray-300 border-r-0"
                >
                    <div class="border-b border-gray-300 p-6">
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            Hey :)
                        </p>
                    </div>

                    <div
                        class="border-b border-gray-300 p-6 min-h-[200px] flex flex-col justify-center"
                    >
                        <p class="font-mono text-sm leading-relaxed">
                            Ich bin Elisa Maglio, bin 23 Jahre alt und<br />
                            studiere derzeit Mediendesign an der DHBW<br />
                            in Ravensburg.
                        </p>
                        <p class="font-mono text-sm leading-relaxed mt-4">
                            Willkommen auf meinem Portfolio!
                        </p>
                    </div>

                    <div class="border-b border-gray-300 p-6">
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            Volleyball spielen
                        </p>
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            Zeichnen
                        </p>
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            Lesen
                        </p>
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            Brettspiele spielen
                        </p>
                    </div>

                    <div class="border-b border-gray-300 p-6">
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            offen
                        </p>
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            etwas stur
                        </p>
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            ehrgeizig
                        </p>
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            interessiert
                        </p>
                        <p
                            class="font-mono text-sm underline underline-offset-2"
                        >
                            hilfsbereit
                        </p>
                    </div>

                    <div class="p-6">
                        <p class="font-mono text-sm">
                            email. <a
                                href="mailto:elisa.maglio@web.de"
                                class="underline underline-offset-2 hover:opacity-70"
                                >elisa.maglio@web.de</a
                            >
                        </p>
                        <p class="font-mono text-sm">
                            linkedIn <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="underline underline-offset-2 hover:opacity-70"
                                >Elisa Maglio</a
                            >
                        </p>
                    </div>
                </div>

                <div
                    class="flex items-center justify-center bg-gray-100 min-h-[500px]"
                >
                    <div class="text-center text-gray-400 font-mono">
                        <p class="text-8xl mb-4">👤</p>
                        <p>Profilbild</p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</section>
