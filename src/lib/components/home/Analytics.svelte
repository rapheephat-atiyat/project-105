<script lang="ts">
	import { Activity, Globe, Compass, Zap } from 'lucide-svelte';

	const metrics = [
		{ value: '99.8%', label: 'Efficiency Rating' },
		{ value: 'O(n log n)', label: 'Optimal Target', color: 'indigo', icon: Compass },
		{ value: '1.2ms', label: 'Avg Sort Time', color: 'blue', icon: Zap },
		{ value: '#01', label: 'Global Rank' }
	];
</script>

<section class="relative z-10 flex flex-col items-center w-full px-4 pt-24 pb-12 mx-auto">
	<div class="w-full max-w-[1200px] flex flex-col items-center rounded-[2.5rem] border border-white/10 bg-neutral-950/50 p-8 md:p-16 shadow-2xl backdrop-blur-2xl">
		
		<div class="mb-16 flex w-full max-w-[800px] flex-col items-center text-center">
			<h2 class="mb-6 text-[clamp(2.5rem,5vw,3.5rem)] font-black uppercase leading-[1.1] tracking-tighter text-white">
				The Lab Report:<br class="hidden sm:block" />
				<span class="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Performance Analytics</span>
			</h2>
			<p class="mb-12 max-w-[600px] text-lg font-medium leading-relaxed text-zinc-400">
				Our proprietary engine tracks every swap, comparison, and memory allocation in real-time.<br class="hidden sm:block" />
				Gain deep insights into how your code behaves under intensive data pressure.
			</p>

			<div class="flex w-full flex-col justify-center gap-8 sm:flex-row sm:gap-16">
				<div class="flex flex-col items-center gap-4 max-w-[250px]">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
						<Activity size={20} class="text-blue-400" />
					</div>
					<div>
						<h5 class="mb-2 text-sm font-bold uppercase tracking-widest text-white">Precision Metrics</h5>
						<p class="text-xs leading-relaxed text-zinc-400">Measure latency down to the nanosecond level.</p>
					</div>
				</div>
				<div class="flex flex-col items-center gap-4 max-w-[250px]">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/20">
						<Globe size={20} class="text-indigo-400" />
					</div>
					<div>
						<h5 class="mb-2 text-sm font-bold uppercase tracking-widest text-white">Global Sync</h5>
						<p class="text-xs leading-relaxed text-zinc-400">Compare results with the global consensus scale.</p>
					</div>
				</div>
			</div>
		</div>

		<div class="w-full max-w-[1000px]">
			<div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
				
				{#each metrics as metric}
					{@const isIndigo = metric.color === 'indigo'}
					{@const isBlue = metric.color === 'blue'}
					{@const border = isIndigo ? 'border-indigo-500/20 hover:border-indigo-500/40' : isBlue ? 'border-blue-500/20 hover:border-blue-500/40' : 'border-white/5 hover:border-white/10'}
					{@const bg = isIndigo ? 'bg-indigo-950/20' : isBlue ? 'bg-blue-950/20' : 'bg-white/[0.02]'}
					{@const text = isIndigo ? 'text-indigo-400' : isBlue ? 'text-blue-400' : 'text-white'}
					{@const label = isIndigo ? 'text-indigo-500' : isBlue ? 'text-blue-500' : 'text-zinc-500'}
					{@const iconColor = isIndigo ? 'text-indigo-500/30' : 'text-blue-500/30'}

					<div class={`group relative flex flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border p-8 transition-all hover:-translate-y-1 ${border} ${bg}`}>
						{#if metric.icon}
							<svelte:component this={metric.icon} size={18} class={`absolute right-4 top-4 ${iconColor}`} />
						{/if}
						<div class={`mb-2 text-[clamp(1.2rem,2.5vw,2.25rem)] font-bold z-10 text-center ${text}`}>{metric.value}</div>
						<div class={`text-[10px] font-black uppercase tracking-[0.2em] z-10 text-center ${label}`}>{metric.label}</div>
					</div>
				{/each}

			</div>
		</div>

	</div>
</section>
