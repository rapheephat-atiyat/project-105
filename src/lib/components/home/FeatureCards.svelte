<script lang="ts">
	import { BookOpen, Trophy, FlaskConical, Play, ArrowRight } from 'lucide-svelte';
	import GlassWindow from '$lib/components/ui/GlassWindow.svelte';
</script>

<section class="relative z-10 flex w-full max-w-[1200px] flex-col items-center px-4 py-24 mx-auto">
	<div class="mb-16 flex flex-col items-center text-center">
		<h2 class="mb-6 text-[clamp(2.5rem,6vw,3.5rem)] font-black uppercase leading-[1.1] tracking-tighter text-white">
			Core <span class="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Systems</span>
		</h2>
		<p class="max-w-[600px] text-lg font-medium leading-relaxed text-zinc-400">
			Choose your path. Train, compete, or analyze.
		</p>
	</div>

	<div class="grid w-full grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
		<GlassWindow 
			windowName="edu.module" 
			modId="MOD_01" 
			dotClasses="bg-blue-500/20 group-hover:bg-blue-500/50"
		>
			<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
				<BookOpen size={24} class="text-blue-400" />
			</div>
			
			<h3 class="mb-4 text-xl font-bold tracking-widest text-white uppercase">Education</h3>
			<p class="mb-8 flex-1 text-sm leading-relaxed text-zinc-400">
				Explore the Algorithm Catalog. Learn Big O and logic through interactive visualizers.
			</p>

			<div class="mb-8 w-full border border-white/5 bg-white/[0.02] rounded-xl p-4">
				<ul class="flex flex-col gap-2">
					<li class="flex items-center gap-3 text-sm text-zinc-400">
						<span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
						Visual Big O Notations
					</li>
					<li class="flex items-center gap-3 text-sm text-zinc-400">
						<span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
						Step-by-step Execution
					</li>
				</ul>
			</div>

			<a href="/education" class="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 mt-auto">
				ENTER CLASSROOM <ArrowRight size={16} />
			</a>
		</GlassWindow>

		<!-- Competition -->
		<GlassWindow 
			windowName="arena.exe" 
			modId="MOD_02" 
			dotClasses="bg-indigo-500/20 group-hover:bg-indigo-500/50"
			hoverOffset={true}
			glowColor="bg-indigo-500/10"
		>
			<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
				<Trophy size={24} class="text-indigo-400" />
			</div>
			
			<h3 class="mb-4 text-xl font-bold tracking-widest text-white uppercase">Competition</h3>
			<p class="mb-8 flex-1 text-sm leading-relaxed text-zinc-400">
				Join live sort-wars. Input codes and rank globally against top-tier architects.
			</p>

			<div class="mb-8 w-full">
				<div class="mb-3 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
					<span>Active Tournament</span>
					<span class="text-indigo-400">1,048 Players</span>
				</div>
				<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
					<div class="h-full w-1/2 rounded-full bg-indigo-400"></div>
				</div>
			</div>

			<a href="/lobby" class="flex w-full mt-auto items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:bg-zinc-200 active:scale-95">
				JOIN BATTLE <Play size={16} fill="currentColor" />
			</a>
		</GlassWindow>

		<!-- Practice -->
		<GlassWindow 
			windowName="lab.sys" 
			modId="MOD_03" 
			dotClasses="bg-purple-500/20 group-hover:bg-purple-500/50"
		>
			<div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
				<FlaskConical size={24} class="text-purple-400" />
			</div>
			
			<h3 class="mb-4 text-xl font-bold tracking-widest text-white uppercase">Practice</h3>
			<p class="mb-8 flex-1 text-sm leading-relaxed text-zinc-400">
				Laboratory workbench. Easy and Hard modes for active experimentation with raw data.
			</p>

			<div class="mb-8 flex w-full gap-4">
				<div class="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
					<span class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Sets</span>
					<span class="text-sm font-bold text-white">12 Sets</span>
				</div>
				<div class="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
					<span class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Diff</span>
					<span class="text-sm font-bold text-purple-400">Expert</span>
				</div>
			</div>

			<a href="/practice" class="flex w-full mt-auto items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
				OPEN WORKBENCH <ArrowRight size={16} />
			</a>
		</GlassWindow>
	</div>
</section>
