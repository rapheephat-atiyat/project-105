<script lang="ts">
	import { Play, Code2 } from 'lucide-svelte';
	const bars = [30, 45, 65, 90, 100, 90, 65, 45, 30];
</script>

<section class="flex flex-col items-center text-center pt-24 pb-24 min-h-[calc(100vh-4.5rem)] gap-20 max-w-[1400px] mx-auto px-4">
	<div class="w-full max-w-[800px] flex flex-col items-center relative z-2">
		<div class="inline-flex items-center px-3 py-1 border border-accent-blue text-accent-cyan bg-blue-700/10 text-[0.7rem] font-bold tracking-widest rounded shadow-[0_0_10px_var(--color-accent-cyan-glow)] mb-8 uppercase">SYSTEM READY</div>
		
		<h1 class="text-[clamp(2.5rem,8vw,3.5rem)] md:text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.1] mb-6 tracking-tight uppercase font-bold text-white">
			<span class="text-transparent bg-clip-text bg-linear-to-r from-accent-cyan to-accent-blue">SORTING</span> MATCH
		</h1>
		
		<p class="text-[#cbd5e1] text-xl leading-relaxed mb-10 max-w-[600px]">
			Master the Sequence. Solve the Experiment.<br />
			A high-performance algorithm simulation for competitive developers.
		</p>

		<div class="flex flex-col sm:flex-row w-full sm:w-auto gap-4 justify-center">
			<a href="/lobby" class="flex items-center justify-center gap-2 px-8 py-4 rounded text-base font-bold tracking-widest text-bg-core bg-accent-cyan hover:bg-[#00d0e0] transition-colors shadow-[0_0_20px_var(--color-accent-cyan-glow)] w-full sm:w-auto uppercase">
				START MATCH
				<Play size={16} />
			</a>
			<a href="/docs" class="flex items-center justify-center gap-2 px-8 py-4 rounded text-base font-bold tracking-widest text-[#cbd5e1] bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors w-full sm:w-auto uppercase">
				<Code2 size={16} />
				INITIALIZE
			</a>
		</div>
	</div>

	<div class="animate-float w-full max-w-[800px] relative before:absolute before:-top-[10%] before:-left-[10%] before:w-[120%] before:h-[120%] before:bg-[radial-gradient(circle_at_center,var(--color-accent-cyan-glow)_0%,transparent_60%)] before:opacity-40 before:z-0 before:pointer-events-none">
		<div class="w-full rounded-2xl bg-[rgba(8,14,30,0.8)] border border-border-color shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,240,255,0.05)] flex flex-col overflow-hidden relative z-10">
			<div class="flex items-center px-6 py-4 bg-black/30 border-b border-border-color relative">
				<div class="flex gap-2 flex-1">
					<span class="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
					<span class="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
					<span class="w-3 h-3 rounded-full bg-[#27c93f]"></span>
				</div>
				<div class="font-mono text-[#cbd5e1] text-[0.85rem] tracking-wider text-center flex-1">visualizer.exe</div>
                <div class="flex-1"></div>
			</div>

			<div class="h-[200px] md:h-[300px] relative px-8 md:px-16 py-8 md:py-12 flex items-end">
				<div class="absolute inset-x-0 inset-y-0 z-1 flex flex-col justify-between py-12 pointer-events-none">
					<div class="h-px w-full bg-white/5"></div>
					<div class="h-px w-full bg-white/5"></div>
					<div class="h-px w-full bg-white/5"></div>
					<div class="h-px w-full bg-white/5"></div>
				</div>

				<div class="w-full h-full flex flex-row items-end justify-center gap-2 md:gap-4 relative z-2">
					{#each bars as height, i}
						<div class="flex-1 max-w-[60px] h-full flex flex-col justify-end items-center bg-white/5 rounded-[6px] overflow-hidden">
							<div
								class="sort-bar w-full bg-linear-to-b from-accent-cyan to-accent-blue rounded-t-[6px] relative origin-bottom"
								style="height: {height}%; animation-delay: {Math.abs(4 - i) * 0.15}s;"
							>
								<div class="absolute inset-0 bg-linear-to-b from-white/40 to-transparent h-[40%]"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="px-8 py-5 bg-black/40 border-t border-border-color flex justify-between items-center">
				<div class="flex items-center gap-3">
					<span class="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--color-accent-cyan)] animate-pulse"></span>
					<span class="text-[0.75rem] font-bold text-[#cbd5e1] tracking-widest">CALIBRATING DATA</span>
				</div>
				<div class="flex items-center gap-4">
					<span class="text-[0.75rem] font-bold text-[#cbd5e1] tracking-widest">60 FPS</span>
					<span class="w-px h-3 bg-border-color"></span>
					<span class="text-[0.75rem] font-bold text-accent-cyan tracking-widest">V-SYNC ON</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	@keyframes float {
		0% { transform: translateY(0px); }
		50% { transform: translateY(-10px); }
		100% { transform: translateY(0px); }
	}

	.sort-bar {
		animation: sort-bounce 3s ease-in-out infinite alternate;
	}

	@keyframes sort-bounce {
		0%,
		20% {
			transform: scaleY(1);
		}
		40% {
			transform: scaleY(0.4);
			background: #FFFFFF;
		}
		60% {
			transform: scaleY(1.2);
			background: #00F0FF;
		}
		80%,
		100% {
			transform: scaleY(1);
		}
	}
</style>
