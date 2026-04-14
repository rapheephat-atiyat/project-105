<script lang="ts">
	import type { Snippet } from 'svelte';

	let { 
		windowName, 
		modId, 
		dotClasses = "bg-white/20 group-hover:bg-white/50", 
		hoverOffset = false,
		glowColor = null,
		children 
	} = $props<{
		windowName: string;
		modId: string;
		dotClasses?: string;
		hoverOffset?: boolean;
		glowColor?: string | null;
		children?: Snippet;
	}>();
</script>

<div class={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/50 shadow-2xl backdrop-blur-2xl transition-all hover:-translate-y-1 hover:border-white/20 ${hoverOffset ? 'md:-translate-y-4 md:hover:-translate-y-5' : ''}`}>
	{#if glowColor}
		<div class={`absolute -inset-1 z-0 rounded-[2.1rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity ${glowColor}`}></div>
	{/if}
	
	<div class="relative z-10 flex flex-col h-full bg-neutral-950/50 backdrop-blur-2xl rounded-[2rem]">
		<div class="flex items-center border-b border-white/5 bg-white/[0.02] px-6 py-4">
			<div class="flex flex-1 gap-2">
				<span class={`h-2.5 w-2.5 rounded-full transition-colors ${dotClasses}`}></span>
			</div>
			<div class="flex flex-1 items-center justify-center gap-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
				{windowName}
			</div>
			<div class="flex-1 text-right text-[10px] font-bold tracking-widest text-zinc-600">{modId}</div>
		</div>

		<div class="flex flex-col flex-1 p-8">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</div>
