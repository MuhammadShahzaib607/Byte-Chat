"use client";
import ExploreHero from "../../../components/explore-all-bots/ExploreHero";
import BotExplorer from "../../../components/explore-all-bots/BotExplorer";
import Features from "../../../components/explore-all-bots/Features";
import FAQ from "../../../components/explore-all-bots/FAQ";

export default function ExplorePage() {
    return (
        <main className="relative min-h-screen bg-[#070709] px-4 font-sans selection:bg-purple-500/40 selection:text-white overflow-hidden">

            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <ExploreHero />
            <BotExplorer />
            <Features />
            <FAQ />
        </main>
    );
}