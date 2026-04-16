<script lang="ts">
	import { Play, Code2, Activity, Cpu, ArrowRight } from 'lucide-svelte';
	const bars = [30, 45, 65, 90, 100, 90, 65, 45, 30];

	const matrix = [
		{ name: 'Bubble Sort', best: 'O(n)', avg: 'Θ(n²)', worst: 'O(n²)', space: 'O(1)' },
		{ name: 'Quick Sort', best: 'O(n log n)', avg: 'Θ(n log n)', worst: 'O(n²)', space: 'O(log n)' },
		{ name: 'Merge Sort', best: 'O(n log n)', avg: 'Θ(n log n)', worst: 'O(n log n)', space: 'O(n)' }
	];
</script>

<section class="relative flex flex-col items-center overflow-hidden pt-24 pb-32">

	<div class="relative z-10 flex w-full max-w-[800px] flex-col items-center px-4 text-center">
		<div class="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 backdrop-blur-md">
			<span class="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></span>
			System Ready
		</div>
		
		<h1 class="mb-6 text-[clamp(2.5rem,8vw,3.5rem)] font-black uppercase leading-[1.1] tracking-tighter text-white md:text-[clamp(3.5rem,6vw,5.5rem)]">
			<span class="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Sorting</span> Match
		</h1>
		
		<p class="mb-10 max-w-[600px] text-lg font-medium leading-relaxed text-zinc-400 md:text-xl">
			Master the Sequence. Solve the Experiment.<br />
			<span class="text-white/60">A high-performance algorithm simulation for competitive developers.</span>
		</p>

		<div class="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
			<a href="/lobby" class="flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:bg-zinc-200 active:scale-95">
				START MATCH
				<Play size={16} fill="currentColor" />
			</a>
			<a href="/docs" class="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 active:scale-95">
				<Code2 size={16} />
				INITIALIZE
			</a>
		</div>
	</div>

	<div class="animate-float relative z-10 mt-20 w-full max-w-[850px] px-4">
		<div class="absolute -inset-1 rounded-[2.1rem] bg-blue-500/10 blur-2xl"></div>
		<div class="relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/50 shadow-2xl backdrop-blur-2xl">
			<div class="relative flex items-center border-b border-white/5 bg-white/[0.02] px-8 py-5">
				<div class="flex flex-1 gap-2.5">
					<span class="h-3 w-3 rounded-full bg-red-500"></span>
					<span class="h-3 w-3 rounded-full bg-yellow-500"></span>
					<span class="h-3 w-3 rounded-full bg-green-500"></span>
				</div>
				<div class="flex flex-1 items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
					<Cpu size={12} /> visualizer.exe
				</div>
				<div class="flex-1 text-right text-[10px] font-bold tracking-widest text-zinc-600">TRACE_ID: VALMG</div>
			</div>

			<div class="relative flex h-[200px] items-end px-10 py-8 md:h-[300px] md:px-20 md:py-12">
				<div class="pointer-events-none absolute inset-x-0 inset-y-0 z-0 flex flex-col justify-between py-12 opacity-50">
					<div class="h-px w-full bg-white/5"></div>
					<div class="h-px w-full bg-white/5"></div>
					<div class="h-px w-full bg-white/5"></div>
				</div>
				<div class="relative z-10 flex h-full w-full flex-row items-end justify-center gap-2 md:gap-4">
					{#each bars as height, i}
						<div class="flex h-full flex-1 flex-col items-center justify-end overflow-hidden rounded-t-lg bg-white/[0.03] max-w-[50px]">
							<div class="sort-bar relative w-full origin-bottom rounded-t-lg bg-gradient-to-t from-blue-600 via-blue-400 to-white" style="height: {height}%; animation-delay: {Math.abs(4 - i) * 0.15}s;">
								<div class="absolute inset-0 blur-[2px] bg-white/20"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-8 py-5">
				<div class="flex items-center gap-4">
					<div class="flex items-center gap-2">
						<Activity size={14} class="text-blue-500" />
						<span class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status: Online</span>
					</div>
				</div>
				<div class="flex items-center gap-6">
					<span class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">60 FPS</span>
					<span class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">V-Sync On</span>
				</div>
			</div>
		</div>
	</div>


</section>

<style>
	.animate-float { animation: float 8s ease-in-out infinite; }
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotateX(0deg); }
		50% { transform: translateY(-15px) rotateX(2deg); }
	}
	.sort-bar { animation: sort-bounce 3s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate; }
	@keyframes sort-bounce {
		0%, 100% { transform: scaleY(1); filter: brightness(1); }
		50% { transform: scaleY(0.6); filter: brightness(1.3); }
	}
	@keyframes sort-bounce {
		0%, 100% { transform: scaleY(1); filter: brightness(1); }
		50% { transform: scaleY(0.6); filter: brightness(1.3); }
	}
</style>