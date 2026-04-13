<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - Error System</title>
</svelte:head>

<div class="flex items-center justify-center min-h-[calc(100vh-100px)] p-8 max-w-[1400px] mx-auto w-full">
	<div class="relative w-full max-w-[600px] px-6 py-12 sm:px-12 sm:py-16 text-center flex flex-col items-center gap-8 overflow-hidden rounded-2xl bg-[rgba(10,15,40,0.5)] border border-border-color backdrop-blur-xl">
		<div class="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-accent-cyan to-transparent"></div>

		<div class="relative">
			<h1 class="text-[6rem] sm:text-[8rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-accent-cyan to-accent-blue drop-shadow-[0_0_40px_var(--color-accent-cyan-glow)]">
				{$page.status}
			</h1>
		</div>

		<div class="flex flex-col items-center">
			<h2 class="text-xl sm:text-2xl text-white font-semibold tracking-wider uppercase mb-4">System Malfunction Detected</h2>
			<p class="text-(--text-secondary)text-[1.1rem] leading-relaxed max-w-[400px]">
				{$page.error?.message || 'An unexpected error occurred in the core matrix. Our engineering units have been notified.'}
			</p>
		</div>

		<div class="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
			<a href="/" class="flex items-center justify-center gap-2 px-6 py-3 rounded text-sm font-bold tracking-widest text-bg-core bg-accent-cyan hover:bg-[#00d0e0] transition-colors shadow-[0_0_20px_var(--color-accent-cyan-glow)] w-full sm:w-auto">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="m15 18-6-6 6-6" />
				</svg>
				Return to Base
			</a>
			<button class="group flex items-center justify-center gap-2 px-6 py-3 rounded text-sm font-bold tracking-widest text-(--text-secondary)bg-transparent border border-border-color hover:bg-white/5 hover:text-white transition-colors w-full sm:w-auto" onclick={() => window.history.back()}>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:animate-spin">
					<path d="M21 2v6h-6" />
					<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
					<path d="M3 3v5h5" />
				</svg>
				Retry Connection
			</button>
		</div>
	</div>
</div>
