<script lang="ts">
    let expanded = $state(true);

    function toggleExpanded() {
        expanded = !expanded;
    }
</script>

<section id="about" class="w-full border-x border-electric-blue">
    <!-- Header -->
    <button
        onclick={toggleExpanded}
        class="w-full bg-black text-white py-4 px-6 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-900 transition-colors border-b border-electric-blue"
    >
        <h2 class="text-2xl font-bold tracking-[0.3em] uppercase">
            WER BIN ICH?
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
        <div class="bg-black border-b border-electric-blue">
            <div class="grid grid-cols-[1fr_1fr]">
                <div class="border-r border-electric-blue">
                    <div class="border-b border-electric-blue p-6">
                        <p class="font-mono text-sm text-white">Hey :)</p>
                    </div>

                    <div class="border-b border-electric-blue p-6">
                        <p class="font-mono text-sm leading-relaxed text-white">
                            Ich bin Elisa Maglio, bin 23 Jahre alt und<br />
                            studiere derzeit Mediendesign an der DHBW<br />
                            in Ravensburg.
                        </p>
                        <p
                            class="font-mono text-sm leading-relaxed mt-4 text-white"
                        >
                            Willkommen auf meinem Portfolio!
                        </p>
                    </div>

                    <div class="border-b border-electric-blue p-6">
                        <p class="font-mono text-sm text-white">
                            Volleyball spielen
                        </p>
                        <p
                            class="font-mono text-sm text-white underline decoration-electric-blue"
                        >
                            Zeichnen
                        </p>
                        <p
                            class="font-mono text-sm text-white underline decoration-electric-blue"
                        >
                            Lesen
                        </p>
                        <p class="font-mono text-sm text-white">
                            Brettspiele spielen
                        </p>
                    </div>

                    <div class="border-b border-electric-blue p-6">
                        <p class="font-mono text-sm text-white">offen</p>
                        <p
                            class="font-mono text-sm text-white underline decoration-electric-blue"
                        >
                            etwas_stur
                        </p>
                        <p
                            class="font-mono text-sm text-white underline decoration-electric-blue"
                        >
                            ehrgeizig
                        </p>
                        <p
                            class="font-mono text-sm text-white underline decoration-electric-blue"
                        >
                            interessiert
                        </p>
                        <p
                            class="font-mono text-sm text-white underline decoration-electric-blue"
                        >
                            hilfsbereit
                        </p>
                    </div>

                    <div class="p-6">
                        <p class="font-mono text-sm text-white">
                            email: <a
                                href="mailto:elisa.maglio@web.de"
                                class="text-white underline decoration-electric-blue hover:opacity-70"
                                >elisa.maglio@web.de</a
                            >
                        </p>
                        <p class="font-mono text-sm text-white">
                            linkedIn: <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-white underline decoration-electric-blue hover:opacity-70"
                                >Elisa Maglio</a
                            >
                        </p>
                    </div>
                </div>

                <div
                    class="flex items-end justify-center bg-gradient-to-b from-amber-100 to-amber-200 min-h-[500px]"
                >
                    <img
                        src="/profile-avatar.png"
                        alt="Elisa Maglio - 3D Avatar"
                        class="max-h-[480px] object-contain"
                    />
                </div>
            </div>
        </div>
    {/if}
</section>
