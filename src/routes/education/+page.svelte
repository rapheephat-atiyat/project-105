<script lang="ts">
	import { ArrowRight, Box, CheckCircle, Lightbulb, Split, TrendingUp, Hexagon, Component } from 'lucide-svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
</script>

<svelte:head>
	<title>Education - Sorting Match</title>
</svelte:head>

<Navbar />

<div class="max-w-[1400px] mx-auto pt-16 pb-8 px-4 sm:px-8">
	<!-- Header Section -->
	<header class="mb-16 max-w-[800px]">
		<div class="inline-block px-3 py-1.5 bg-[#1C4ED8]/40 text-accent-cyan text-[0.65rem] font-bold tracking-[0.15em] rounded mb-6 border border-accent-cyan/20">LAB MANUAL V1.0.4</div>
		<h1 class="text-[clamp(2.5rem,5vw,4rem)] mb-4 font-bold tracking-tight leading-tight">
			Algorithm <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Catalog</span>
		</h1>
		<p class="text-[1.1rem] text-[var(--text-secondary)] leading-relaxed max-w-[650px]">Deconstructing computational logic into visual insights. Explore the fundamental mechanisms of sorting efficiency through our laboratory-grade technical documentation.</p>
	</header>

	<!-- Complexity Matrix Section -->
	<section class="mb-20">
		<h4 class="text-[0.65rem] text-[var(--text-secondary)] tracking-[0.15em] mb-2 uppercase">Reference Material</h4>
		<h2 class="text-2xl mb-8 font-semibold text-white">Complexity Matrix</h2>

		<div class="w-full overflow-x-auto rounded-xl bg-[rgba(10,15,40,0.5)] border border-[rgba(45,65,110,0.4)] backdrop-blur-md">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr>
						<th class="text-xs tracking-widest text-white py-6 px-8 border-b border-white/5 font-semibold">ALGORITHM</th>
						<th class="text-xs tracking-widest text-white py-6 px-8 border-b border-white/5 font-semibold">BEST CASE</th>
						<th class="text-xs tracking-widest text-white py-6 px-8 border-b border-white/5 font-semibold">AVERAGE CASE</th>
						<th class="text-xs tracking-widest text-white py-6 px-8 border-b border-white/5 font-semibold">WORST CASE</th>
						<th class="text-xs tracking-widest text-white py-6 px-8 border-b border-white/5 font-semibold">SPACE</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="py-6 px-8 border-b border-white/5 font-sans font-medium text-base text-white">Bubble Sort</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-[#00F0FF]">O(n)</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-white/80">Θ(n²)</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-red-500">O(n²)</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-[var(--text-secondary)]">O(1)</td>
					</tr>
					<tr>
						<td class="py-6 px-8 border-b border-white/5 font-sans font-medium text-base text-white">Quick Sort</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-[#00F0FF]">O(n log n)</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-white/80">Θ(n log n)</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-red-500">O(n²)</td>
						<td class="py-6 px-8 border-b border-white/5 font-mono text-sm text-[var(--text-secondary)]">O(log n)</td>
					</tr>
					<tr>
						<td class="py-6 px-8 font-sans font-medium text-base text-white">Merge Sort</td>
						<td class="py-6 px-8 font-mono text-sm text-[#00F0FF]">O(n log n)</td>
						<td class="py-6 px-8 font-mono text-sm text-white/80">Θ(n log n)</td>
						<td class="py-6 px-8 font-mono text-sm text-[#00F0FF]">O(n log n)</td>
						<td class="py-6 px-8 font-mono text-sm text-[var(--text-secondary)]">O(n)</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Algorithm Cards Section -->
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
		<!-- Bubble Sort -->
		<a href="/education/bubble-sort" class="group relative flex flex-col p-8 rounded-2xl bg-[rgba(12,18,48,0.6)] border border-[rgba(45,65,110,0.3)] hover:border-[#00F0FF]/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.05)] transition-all duration-300 overflow-hidden text-white">
			<!-- Glow effect -->
			<div class="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

			<div class="flex justify-between items-start mb-6">
				<span class="text-[0.6rem] bg-white/5 px-2 py-1 rounded font-semibold tracking-widest border border-white/10 uppercase">Quadratic</span>
				<span class="font-mono text-[1.1rem] font-bold text-[var(--text-secondary)]">O(n²)</span>
			</div>

			<h3 class="text-2xl mb-4 font-semibold text-white">Bubble Sort</h3>
			<p class="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>

			<div class="h-10 bg-black/20 rounded-lg flex items-center justify-center gap-2 mb-8 border border-white/5">
				<div class="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.3)]"></div>
				<div class="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.3)]"></div>
				<div class="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)]"></div>
				<div class="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)]"></div>
			</div>

			<div class="flex items-center gap-2 text-xs font-bold tracking-widest text-[#cbd5e1] group-hover:text-[#00F0FF] transition-colors">
				LEARN MORE <ArrowRight size={14} />
			</div>
		</a>

		<!-- Selection Sort -->
		<a href="/education/selection-sort" class="group relative flex flex-col p-8 rounded-2xl bg-[rgba(12,18,48,0.6)] border border-[rgba(45,65,110,0.3)] hover:border-[#00F0FF]/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.05)] transition-all duration-300 overflow-hidden text-white">
			<div class="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

			<div class="flex justify-between items-start mb-6">
				<span class="text-[0.6rem] bg-white/5 px-2 py-1 rounded font-semibold tracking-widest border border-white/10 uppercase">Selection-Based</span>
				<span class="font-mono text-[1.1rem] font-bold text-[var(--text-secondary)]">O(n²)</span>
			</div>

			<h3 class="text-2xl mb-4 font-semibold text-white">Selection Sort</h3>
			<p class="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">In-place comparison sort that divides the input into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region.</p>

			<div class="h-10 bg-black/20 rounded-lg flex items-end justify-center gap-1.5 pb-2.5 mb-8 border border-white/5">
				<div class="w-1.5 h-5 bg-[#00F0FF] rounded-sm shadow-[0_0_8px_rgba(0,240,255,0.3)]"></div>
				<div class="w-1.5 h-4 bg-[#E879F9] rounded-sm"></div>
				<div class="w-1.5 h-3 bg-[var(--text-secondary)] rounded-sm"></div>
				<div class="w-1.5 h-3 bg-[var(--text-secondary)] rounded-sm"></div>
			</div>

			<div class="flex items-center gap-2 text-xs font-bold tracking-widest text-[#cbd5e1] group-hover:text-[#00F0FF] transition-colors">
				LEARN MORE <ArrowRight size={14} />
			</div>
		</a>

		<!-- Insertion Sort -->
		<a href="/education/insertion-sort" class="group relative flex flex-col p-8 rounded-2xl bg-[rgba(12,18,48,0.6)] border border-[rgba(45,65,110,0.3)] hover:border-[#00F0FF]/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.05)] transition-all duration-300 overflow-hidden text-white">
			<div class="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

			<div class="flex justify-between items-start mb-6">
				<span class="text-[0.6rem] bg-white/5 px-2 py-1 rounded font-semibold tracking-widest border border-white/10 uppercase">Adaptive</span>
				<span class="font-mono text-[1.1rem] font-bold text-[var(--text-secondary)]">O(n²)</span>
			</div>

			<h3 class="text-2xl mb-4 font-semibold text-white">Insertion Sort</h3>
			<p class="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">Iteratively consumes one input element each repetition and grows a sorted output list. At each iteration, insertion sort removes one element.</p>

			<div class="h-10 bg-black/20 rounded-lg flex items-center justify-center gap-0.5 mb-8 border border-white/5 font-mono text-xs tracking-[0.2em] text-[var(--text-secondary)]">[ 3 | 9 | 5 | 8 ] &larr; ( 4 )</div>

			<div class="flex items-center gap-2 text-xs font-bold tracking-widest text-[#cbd5e1] group-hover:text-[#00F0FF] transition-colors">
				LEARN MORE <ArrowRight size={14} />
			</div>
		</a>

		<!-- Quick Sort -->
		<a href="/education/quick-sort" class="group relative flex flex-col p-8 rounded-2xl bg-[rgba(12,18,48,0.6)] border border-[rgba(45,65,110,0.3)] hover:border-[#00F0FF]/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.05)] transition-all duration-300 overflow-hidden text-white">
			<div class="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

			<div class="flex justify-between items-start mb-6">
				<span class="text-[0.6rem] bg-white/5 px-2 py-1 rounded font-semibold tracking-widest border border-white/10 uppercase">Divide & Conquer</span>
				<span class="font-mono text-[1.1rem] font-bold text-[var(--text-secondary)]">O(n log n)</span>
			</div>

			<h3 class="text-2xl mb-4 font-semibold text-white">Quick Sort</h3>
			<p class="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">A highly efficient sorting algorithm based on partitioning of array of data into smaller arrays. A large array is partitioned into two sub-arrays around a pivot.</p>

			<div class="h-10 bg-black/20 rounded-lg flex items-center justify-center mb-8 border border-white/5">
				<div class="bg-blue-700/40 border border-[#1C4ED8] text-[#00F0FF] text-[0.6rem] px-6 py-1.5 rounded tracking-widest">PIVOT ELEMENT</div>
			</div>

			<div class="flex items-center gap-2 text-xs font-bold tracking-widest text-[#cbd5e1] group-hover:text-[#00F0FF] transition-colors">
				LEARN MORE <ArrowRight size={14} />
			</div>
		</a>

		<!-- Merge Sort -->
		<a href="/education/merge-sort" class="group relative flex flex-col p-8 rounded-2xl bg-[rgba(12,18,48,0.6)] border border-[rgba(45,65,110,0.3)] hover:border-[#00F0FF]/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.05)] transition-all duration-300 overflow-hidden text-white">
			<div class="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

			<div class="flex justify-between items-start mb-6">
				<span class="text-[0.6rem] bg-white/5 px-2 py-1 rounded font-semibold tracking-widest border border-white/10 uppercase">Stable Sort</span>
				<span class="font-mono text-[1.1rem] font-bold text-[var(--text-secondary)]">O(n log n)</span>
			</div>

			<h3 class="text-2xl mb-4 font-semibold text-white">Merge Sort</h3>
			<p class="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">An external algorithm based on divide and conquer strategy. It divides the input array into two halves, calls itself for the two halves, and merges them.</p>

			<div class="h-10 bg-black/20 rounded-lg flex items-center justify-center gap-2 mb-8 border border-white/5">
				<div class="w-6 h-6 border border-[rgba(45,65,110,0.5)] flex items-center justify-center text-[0.7rem] rounded text-[var(--text-secondary)]">L</div>
				<ArrowRight size={14} color="var(--text-secondary)" />
				<div class="w-6 h-6 border border-[rgba(45,65,110,0.5)] flex items-center justify-center text-[0.7rem] rounded text-[var(--text-secondary)]">R</div>
			</div>

			<div class="flex items-center gap-2 text-xs font-bold tracking-widest text-[#cbd5e1] group-hover:text-[#00F0FF] transition-colors">
				LEARN MORE <ArrowRight size={14} />
			</div>
		</a>

		<!-- Heap Sort -->
		<a href="/education/heap-sort" class="group relative flex flex-col p-8 rounded-2xl bg-[rgba(12,18,48,0.6)] border border-[rgba(45,65,110,0.3)] hover:border-[#00F0FF]/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.05)] transition-all duration-300 overflow-hidden text-white">
			<div class="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

			<div class="flex justify-between items-start mb-6">
				<span class="text-[0.6rem] bg-white/5 px-2 py-1 rounded font-semibold tracking-widest border border-white/10 uppercase">Binary Tree</span>
				<span class="font-mono text-[1.1rem] font-bold text-[var(--text-secondary)]">O(n log n)</span>
			</div>

			<h3 class="text-2xl mb-4 font-semibold text-white">Heap Sort</h3>
			<p class="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed mb-8 flex-1">Comparison-based sorting technique based on Binary Heap data structure. It isolates the maximum element and places it at the end successively.</p>

			<div class="h-10 bg-black/20 rounded-lg flex items-center justify-center mb-8 border border-white/5">
				<div class="w-8 h-8 border border-[#00F0FF] text-[#00F0FF] rounded-full flex items-center justify-center text-[0.6rem] font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]">MAX</div>
			</div>

			<div class="flex items-center gap-2 text-xs font-bold tracking-widest text-[#cbd5e1] group-hover:text-[#00F0FF] transition-colors">
				LEARN MORE <ArrowRight size={14} />
			</div>
		</a>
	</section>

	<!-- Field Testing CTA -->
	<section class="flex flex-col md:flex-row items-center justify-between p-12 md:p-16 rounded-2xl bg-gradient-to-r from-[rgba(12,20,50,0.8)] to-[rgba(15,30,80,0.6)] border border-[#00F0FF]/20 mb-16 text-center md:text-left">
		<div>
			<h2 class="text-3xl mb-4 font-semibold text-white">Ready for Field Testing?</h2>
			<p class="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed max-w-[500px] mb-8 md:mb-0">Apply your newfound theoretical knowledge in our simulation environment. Benchmark these algorithms against custom datasets.</p>
		</div>
		<a href="/practice" class="px-8 py-4 text-base font-bold text-black bg-[#00F0FF] hover:bg-[#00d0e0] rounded transition-colors shadow-[0_0_20px_var(--color-accent-cyan-glow)]">Start Simulation</a>
	</section>

	<!-- Internal Footer -->
	<footer class="flex flex-col md:flex-row justify-between items-center py-8 border-t border-[rgba(45,65,110,0.5)] gap-6 md:gap-0">
		<div class="text-[0.8rem] font-bold text-[#00F0FF]">Sorting Match Laboratory</div>
		<div class="flex flex-wrap justify-center gap-8">
			<a href="/" class="text-[0.65rem] tracking-widest text-[var(--text-secondary)] font-semibold hover:text-white transition-colors">SYSTEM STATUS</a>
			<a href="/" class="text-[0.65rem] tracking-widest text-[var(--text-secondary)] font-semibold hover:text-white transition-colors">DOCUMENTATION</a>
			<a href="/" class="text-[0.65rem] tracking-widest text-[var(--text-secondary)] font-semibold hover:text-white transition-colors">PRIVACY POLICY</a>
			<a href="/" class="text-[0.65rem] tracking-widest text-[var(--text-secondary)] font-semibold hover:text-white transition-colors">API DOCS</a>
		</div>
		<div class="text-[0.65rem] text-[var(--text-secondary)] tracking-widest text-center md:text-right">© 2026 SORTING MATCH LABORATORY</div>
	</footer>
</div>
