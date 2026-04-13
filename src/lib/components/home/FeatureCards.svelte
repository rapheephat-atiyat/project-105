<script lang="ts">
	import { BookOpen, Trophy, FlaskConical, Play, ArrowRight } from 'lucide-svelte';
</script>

<section class="py-16 md:py-24 flex flex-col items-center max-w-[1400px] w-full mx-auto px-4 md:px-8">
	<div class="text-center mb-16 flex flex-col items-center">
		<h2 class="text-3xl md:text-4xl tracking-[0.2em] font-bold text-white uppercase m-0">
			CORE <span class="text-transparent bg-clip-text bg-linear-to-r from-accent-cyan to-accent-blue">SYSTEMS</span>
		</h2>
		<div class="w-[60px] h-[2px] bg-accent-cyan mt-6 shadow-[0_0_10px_var(--color-accent-cyan-glow)]"></div>
	</div>

	<div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
		<div class="p-10 flex flex-col items-center text-center rounded-2xl bg-linear-to-b from-[rgba(16,28,65,0.4)] to-[rgba(10,18,45,0.6)] border border-[rgba(45,65,110,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/20">
			<div class="w-14 h-14 rounded-xl flex justify-center items-center mb-6 bg-accent-cyan/10 border border-accent-cyan/20">
				<BookOpen size={24} color="#00F0FF" />
			</div>
			<h3 class="text-xl mb-4 tracking-widest font-bold text-white">EDUCATION</h3>
			<p class="text-[#cbd5e1] text-[0.9rem] leading-relaxed mb-8 flex-1">Explore the Algorithm Catalog. Learn Big O and logic through interactive visualizers.</p>

			<div class="w-full flex justify-center mb-8">
				<ul class="inline-block text-left">
					<li class="text-[0.85rem] text-[#cbd5e1] mb-2 relative pl-5 before:content-['•'] before:text-accent-cyan before:absolute before:left-0 font-medium">Visual Big O Notations</li>
					<li class="text-[0.85rem] text-[#cbd5e1] mb-2 relative pl-5 before:content-['•'] before:text-accent-cyan before:absolute before:left-0 font-medium">Step-by-step Execution</li>
				</ul>
			</div>

			<a href="/education" class="w-full flex items-center justify-center gap-3 p-4 bg-white/5 border border-border-color rounded-lg text-white font-semibold text-[0.85rem] tracking-[0.05em] transition-all hover:bg-white/10 hover:border-white/20">
				ENTER CLASSROOM <ArrowRight size={16} />
			</a>
		</div>

		<div class="p-10 flex flex-col items-center text-center rounded-2xl transition-all duration-300 border border-accent-cyan/30 bg-linear-to-b from-[rgba(20,45,90,0.5)] to-[rgba(10,20,50,0.7)] shadow-[0_10px_40px_var(--color-accent-cyan-glow)] lg:-translate-y-3">
			<div class="w-14 h-14 rounded-xl flex justify-center items-center mb-6 bg-emerald-500/10 border border-emerald-500/20">
				<Trophy size={24} color="#10B981" />
			</div>
			<h3 class="text-xl mb-4 tracking-widest font-bold text-white">COMPETITION</h3>
			<p class="text-[#cbd5e1] text-[0.9rem] leading-relaxed mb-8 flex-1">Join live sort-wars. Input codes and rank globally against top-tier architects.</p>

			<div class="w-full mb-8">
				<div class="flex justify-center gap-4 text-[0.7rem] text-[#cbd5e1] mb-3 font-semibold tracking-widest">
					<span>ACTIVE TOURNAMENT</span>
					<span>1,048 Players</span>
				</div>
				<div class="h-1 bg-white/10 rounded-full w-full overflow-hidden">
					<div class="h-full bg-accent-cyan rounded-full mx-auto" style="width: 50%;"></div>
				</div>
			</div>

			<a href="/lobby" class="w-full flex items-center justify-center gap-3 p-4 rounded-lg font-bold text-[0.85rem] tracking-[0.05em] transition-all bg-accent-cyan text-black shadow-[0_4px_15px_var(--color-accent-cyan-glow)] hover:bg-white hover:scale-[1.02]">
				JOIN BATTLE <Play size={16} />
			</a>
		</div>

		<div class="p-10 flex flex-col items-center text-center rounded-2xl bg-linear-to-b from-[rgba(16,28,65,0.4)] to-[rgba(10,18,45,0.6)] border border-[rgba(45,65,110,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/20">
			<div class="w-14 h-14 rounded-xl flex justify-center items-center mb-6 bg-purple-500/10 border border-purple-500/20">
				<FlaskConical size={24} color="#A855F7" />
			</div>
			<h3 class="text-xl mb-4 tracking-widest font-bold text-white">PRACTICE</h3>
			<p class="text-[#cbd5e1] text-[0.9rem] leading-relaxed mb-8 flex-1">Laboratory workbench. Easy and Hard modes for active experimentation with raw data.</p>

			<div class="flex gap-4 mb-8 w-full justify-center">
				<div class="flex-1 bg-black/20 border border-border-color rounded-lg p-3 flex flex-col items-center gap-1">
					<span class="text-[0.6rem] text-[#cbd5e1] tracking-widest font-semibold uppercase">SETS</span>
					<span class="text-[0.9rem] font-bold text-white">12 Sets</span>
				</div>
				<div class="flex-1 bg-black/20 border border-border-color rounded-lg p-3 flex flex-col items-center gap-1">
					<span class="text-[0.6rem] text-[#cbd5e1] tracking-widest font-semibold uppercase">DIFF</span>
					<span class="text-[0.9rem] font-bold text-[#c084fc]">Expert</span>
				</div>
			</div>

			<a href="/practice" class="w-full flex items-center justify-center gap-3 p-4 bg-white/5 border border-border-color rounded-lg text-white font-semibold text-[0.85rem] tracking-[0.05em] transition-all hover:bg-white/10 hover:border-white/20">
				OPEN WORKBENCH <ArrowRight size={16} />
			</a>
		</div>
	</div>
</section>
