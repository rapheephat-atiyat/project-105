<script lang="ts">
	import { ArrowRight, Box, CheckCircle, Lightbulb, Split, TrendingUp, Hexagon, Component, Cpu, Activity } from 'lucide-svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	const algorithms = [
		{ 
			name: 'Bubble Sort', 
			type: 'Quadratic', 
			complexity: 'O(n²)', 
			desc: 'เปรียบเทียบเลขคู่ติดกันและสลับที่กันไปเรื่อยๆ จนกว่าเลขที่มากที่สุดจะไปอยู่ท้ายสุด',
			preview: 'bubble' 
		},
		{ 
			name: 'Selection Sort', 
			type: 'Selection-Based', 
			complexity: 'O(n²)', 
			desc: 'ค้นหาตัวเลขที่น้อยที่สุดในส่วนที่ยังไม่เรียงลำดับ แล้วนำมาสลับไว้ข้างหน้าสุด',
			preview: 'selection' 
		},
		{ 
			name: 'Insertion Sort', 
			type: 'Adaptive', 
			complexity: 'O(n²)', 
			desc: 'หยิบตัวเลขออกมาทีละตัวแล้วนำไปแทรกในตำแหน่งที่ถูกต้องในส่วนที่เรียงลำดับแล้ว',
			preview: 'insertion' 
		},
		{ 
			name: 'Quick Sort', 
			type: 'Divide & Conquer', 
			complexity: 'O(n log n)', 
			desc: 'เลือก Pivot แล้วแบ่งข้อมูลเป็นสองฝั่ง (น้อยกว่า/มากกว่า Pivot) แล้วทำซ้ำแบบ Recursive',
			preview: 'quick' 
		},
		{ 
			name: 'Merge Sort', 
			type: 'Stable Sort', 
			complexity: 'O(n log n)', 
			desc: 'แบ่งข้อมูลออกเป็นส่วนย่อยที่สุดแล้วค่อยๆ นำกลับมารวมกัน (Merge) โดยเรียงลำดับไปด้วย',
			preview: 'merge' 
		},
		{ 
			name: 'Heap Sort', 
			type: 'Binary Tree', 
			complexity: 'O(n log n)', 
			desc: 'ใช้โครงสร้างข้อมูลแบบ Heap เพื่อดึงค่าที่มากที่สุดออกไปวางไว้ท้ายสุดของ Array',
			preview: 'heap' 
		}
	];
</script>

<svelte:head>
	<title>Algorithm Catalog — MasTicket</title>
</svelte:head>

<div class="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30">
	<Navbar />

	<div class="fixed inset-0 z-0 pointer-events-none">
		<div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
		<div class="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
	</div>

	<main class="relative z-10 max-w-7xl mx-auto pt-32 pb-24 px-6 md:px-12">
		<header class="mb-24 max-w-3xl">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">
				<Cpu size={12} /> Laboratory Manual
			</div>
			<h1 class="text-[clamp(3rem,8vw,5rem)] font-black tracking-tighter leading-[0.9] mb-8 uppercase">
				Algorithm <br />
				<span class="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Catalog.</span>
			</h1>
			<p class="text-xl text-zinc-500 font-medium leading-relaxed">
				ถอดรหัสตรรกะคอมพิวเตอร์ผ่านภาพจำลอง ค้นพบกลไกเบื้องหลังความเร็วของอัลกอริทึมระดับมาตรฐานโลก
			</p>
		</header>

		<section class="mb-32">
			<div class="flex items-center gap-3 mb-8">
				<div class="h-px flex-1 bg-white/5"></div>
				<h2 class="text-xs font-black uppercase tracking-[0.3em] text-zinc-600">Complexity Matrix</h2>
				<div class="h-px flex-1 bg-white/5"></div>
			</div>

			<div class="overflow-x-auto rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
				<table class="w-full text-left border-collapse min-w-[800px]">
					<thead>
						<tr class="border-b border-white/5 bg-white/[0.02]">
							<th class="py-6 px-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">Algorithm</th>
							<th class="py-6 px-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">Best Case</th>
							<th class="py-6 px-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">Average Case</th>
							<th class="py-6 px-10 text-[10px] font-black uppercase tracking-widest text-zinc-500">Worst Case</th>
							<th class="py-6 px-10 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Space</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5 font-mono">
						{#each [['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)'], ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)'], ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)']] as row}
							<tr class="group hover:bg-white/[0.02] transition-colors">
								<td class="py-6 px-10 text-sm font-bold text-white tracking-tight">{row[0]}</td>
								<td class="py-6 px-10 text-xs text-blue-400 font-bold">{row[1]}</td>
								<td class="py-6 px-10 text-xs text-zinc-400">{row[2]}</td>
								<td class="py-6 px-10 text-xs text-red-500/80">{row[3]}</td>
								<td class="py-6 px-10 text-xs text-zinc-500 text-right">{row[4]}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
			{#each algorithms as algo}
				<a href="/education/{algo.preview}" class="group relative flex flex-col p-8 rounded-[2rem] bg-neutral-950 border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
					<div class="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

					<div class="flex justify-between items-start mb-10">
						<span class="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5 text-zinc-500">{algo.type}</span>
						<span class="font-mono text-sm font-black text-blue-500">{algo.complexity}</span>
					</div>

					<h3 class="text-2xl font-black tracking-tight text-white mb-4 uppercase">{algo.name}</h3>
					<p class="text-sm text-zinc-500 font-medium leading-relaxed mb-10 flex-1">{algo.desc}</p>

					<div class="h-24 bg-black/50 rounded-2xl border border-white/5 flex items-center justify-center relative mb-8 overflow-hidden group-hover:border-blue-500/20">

						<!-- BUBBLE SORT: bars swapping left↔right pairwise -->
						{#if algo.preview === 'bubble'}
							<div class="bubble-scene flex items-end gap-1 px-4 h-14">
								<div class="bar bar-b1"></div>
								<div class="bar bar-b2"></div>
								<div class="bar bar-b3"></div>
								<div class="bar bar-b4"></div>
								<div class="bar bar-b5"></div>
								<div class="bar bar-b6"></div>
							</div>

						<!-- SELECTION SORT: scanner sweeps, picks min, swaps to front -->
						{:else if algo.preview === 'selection'}
							<div class="sel-scene flex items-end gap-1 px-4 h-14 relative">
								<div class="bar bar-s1"></div>
								<div class="bar bar-s2"></div>
								<div class="bar bar-s3"></div>
								<div class="bar bar-s4"></div>
								<div class="bar bar-s5"></div>
								<div class="bar bar-s6"></div>
								<!-- scanner line -->
								<div class="sel-scanner"></div>
							</div>

						<!-- INSERTION SORT: one bar slides left to correct position -->
						{:else if algo.preview === 'insertion'}
							<div class="ins-scene flex items-end gap-1 px-4 h-14 relative">
								<div class="bar bar-i1"></div>
								<div class="bar bar-i2"></div>
								<div class="bar bar-i3"></div>
								<div class="bar bar-i4"></div>
								<div class="bar bar-i5"></div>
								<div class="bar bar-i6 ins-key"></div>
							</div>

						<!-- QUICK SORT: pivot glows, two sides collapse inward -->
						{:else if algo.preview === 'quick'}
							<div class="qk-scene flex items-end gap-1 px-4 h-14 relative">
								<div class="bar bar-q1 qk-left"></div>
								<div class="bar bar-q2 qk-left"></div>
								<div class="bar bar-q3 qk-left"></div>
								<div class="bar bar-q4 qk-pivot"></div>
								<div class="bar bar-q5 qk-right"></div>
								<div class="bar bar-q6 qk-right"></div>
								<div class="bar bar-q7 qk-right"></div>
							</div>

						<!-- MERGE SORT: two groups split apart then merge together -->
						{:else if algo.preview === 'merge'}
							<div class="mg-scene flex items-end gap-1 px-4 h-14 relative">
								<div class="bar bar-m1 mg-left"></div>
								<div class="bar bar-m2 mg-left"></div>
								<div class="bar bar-m3 mg-left"></div>
								<div class="bar bar-m4 mg-right"></div>
								<div class="bar bar-m5 mg-right"></div>
								<div class="bar bar-m6 mg-right"></div>
							</div>

						<!-- HEAP SORT: tree nodes highlight top-down heapify -->
						{:else if algo.preview === 'heap'}
							<div class="hp-scene relative w-full h-full flex items-center justify-center">
								<!-- level 0 -->
								<div class="hp-node hp-n0" style="top:12px;left:50%;transform:translateX(-50%)"></div>
								<!-- level 1 -->
								<div class="hp-node hp-n1" style="top:34px;left:30%"></div>
								<div class="hp-node hp-n2" style="top:34px;left:60%"></div>
								<!-- level 2 -->
								<div class="hp-node hp-n3" style="top:56px;left:18%"></div>
								<div class="hp-node hp-n4" style="top:56px;left:38%"></div>
								<div class="hp-node hp-n5" style="top:56px;left:52%"></div>
								<div class="hp-node hp-n6" style="top:56px;left:70%"></div>
								<!-- edges -->
								<svg class="absolute inset-0 w-full h-full" style="pointer-events:none">
									<line class="hp-edge" x1="50%" y1="20" x2="33%" y2="38"/>
									<line class="hp-edge" x1="50%" y1="20" x2="67%" y2="38"/>
									<line class="hp-edge" x1="33%" y1="38" x2="22%" y2="60"/>
									<line class="hp-edge" x1="33%" y1="38" x2="42%" y2="60"/>
									<line class="hp-edge" x1="67%" y1="38" x2="56%" y2="60"/>
									<line class="hp-edge" x1="67%" y1="38" x2="74%" y2="60"/>
								</svg>
							</div>
						{/if}
					</div>

					<div class="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-zinc-500 group-hover:text-blue-500 transition-colors uppercase">
						Learn Protocol <ArrowRight size={12} class="transition-transform group-hover:translate-x-1" />
					</div>
				</a>
			{/each}
		</section>

		<section class="relative p-12 md:p-20 rounded-[3rem] bg-zinc-950 border border-white/5 overflow-hidden flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-12">
			<div class="absolute top-0 right-0 w-[40%] h-full bg-blue-600/5 blur-[100px] pointer-events-none"></div>
			<div class="relative z-10">
				<h2 class="text-3xl md:text-4xl font-black tracking-tight text-white mb-6 uppercase">Ready for field testing?</h2>
				<p class="text-zinc-500 font-medium max-w-md leading-relaxed">
					นำความรู้ทฤษฎีไปทดสอบในเครื่องจำลอง Benchmark อัลกอริทึมเหล่านี้ด้วยชุดข้อมูลที่คุณสร้างเอง
				</p>
			</div>
			<a href="/practice" class="relative z-10 px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
				Start Simulation
			</a>
		</section>
	</main>

	<Footer />
</div>

<style>
/* ── shared bar base ─────────────────────────────────── */
.bar {
	width: 10px;
	border-radius: 3px 3px 0 0;
	background: #27272a;
	flex-shrink: 0;
}

/* ════════════════════════════════════════════════════════
   BUBBLE SORT
   Adjacent pairs swap — largest bubbles to the right
   bars rise/fall, rightmost turns blue when "settled"
════════════════════════════════════════════════════════ */
.bar-b1 { height: 28px; animation: bub-swap 3.6s ease-in-out infinite 0s; }
.bar-b2 { height: 44px; animation: bub-swap 3.6s ease-in-out infinite 0.15s; }
.bar-b3 { height: 20px; animation: bub-swap 3.6s ease-in-out infinite 0.3s; }
.bar-b4 { height: 36px; animation: bub-swap 3.6s ease-in-out infinite 0.45s; }
.bar-b5 { height: 52px; animation: bub-settle 3.6s ease-in-out infinite 0.6s; }
.bar-b6 { height: 56px; background: #1d4ed8; animation: none; }

@keyframes bub-swap {
	0%, 15%  { transform: translateY(0);   background: #27272a; }
	25%, 35% { transform: translateY(-6px); background: #3b82f6; }
	45%, 100% { transform: translateY(0);   background: #27272a; }
}
@keyframes bub-settle {
	0%, 60%  { background: #27272a; }
	75%, 100% { background: #1d4ed8; }
}

/* ════════════════════════════════════════════════════════
   SELECTION SORT
   Scanner line sweeps right-to-left, flashes on min,
   then the min bar jumps to the sorted left zone
════════════════════════════════════════════════════════ */
.sel-scene { position: relative; }
.bar-s1 { height: 44px; }
.bar-s2 { height: 20px; animation: sel-min 4s ease-in-out infinite; }
.bar-s3 { height: 36px; }
.bar-s4 { height: 52px; }
.bar-s5 { height: 28px; }
.bar-s6 { height: 16px; animation: sel-picked 4s ease-in-out infinite; }

/* scanner */
.sel-scanner {
	position: absolute;
	top: 0; bottom: 0;
	width: 2px;
	background: rgba(59,130,246,0.5);
	border-radius: 2px;
	animation: sel-scan 4s ease-in-out infinite;
}
@keyframes sel-scan {
	0%        { left: 100%; opacity: 0; }
	5%        { left: 96%;  opacity: 1; }
	45%       { left: 4%;   opacity: 1; }
	55%, 70%  { left: 14%;  opacity: 0.8; background: #ef4444; }
	80%, 100% { left: 4%;   opacity: 0; }
}
@keyframes sel-min {
	0%, 40%  { background: #27272a; }
	50%, 65% { background: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,0.6); }
	80%      { background: #1d4ed8; transform: translateX(-44px); }
	90%,100% { background: #27272a; transform: translateX(0); }
}
@keyframes sel-picked {
	0%, 55%  { background: #27272a; }
	65%, 75% { background: #facc15; box-shadow: 0 0 8px rgba(250,204,21,0.5); }
	85%,100% { background: #27272a; }
}

/* ════════════════════════════════════════════════════════
   INSERTION SORT
   "key" bar (rightmost) lifts up, slides left past taller
   bars that shift right to make room, then drops in place
════════════════════════════════════════════════════════ */
.bar-i1 { height: 20px; }
.bar-i2 { height: 32px; animation: ins-shift 3.8s ease-in-out infinite 0.2s; }
.bar-i3 { height: 44px; animation: ins-shift 3.8s ease-in-out infinite 0.1s; }
.bar-i4 { height: 52px; animation: ins-shift 3.8s ease-in-out infinite 0s; }
.bar-i5 { height: 36px; }
.ins-key { height: 24px; }

@keyframes ins-key {
	0%, 10%   { transform: translateY(0) translateX(0); background: #27272a; }
	20%       { transform: translateY(-12px) translateX(0); background: #3b82f6; }
	50%       { transform: translateY(-12px) translateX(-44px); background: #3b82f6; }
	65%       { transform: translateY(0) translateX(-44px); background: #22c55e; }
	85%, 100% { transform: translateY(0) translateX(0); background: #27272a; }
}
@keyframes ins-shift {
	0%, 15%  { transform: translateX(0); }
	35%, 60% { transform: translateX(11px); }
	75%, 100% { transform: translateX(0); }
}
.ins-key { animation: ins-key 3.8s ease-in-out infinite; }

/* ════════════════════════════════════════════════════════
   QUICK SORT
   Center pivot glows amber; left bars compress inward,
   right bars compress inward — partition pulse
════════════════════════════════════════════════════════ */
.bar-q1 { height: 36px; }
.bar-q2 { height: 52px; }
.bar-q3 { height: 20px; }
.bar-q4 { height: 40px; }
.bar-q5 { height: 28px; }
.bar-q6 { height: 48px; }
.bar-q7 { height: 16px; }

.qk-pivot {
	background: #f59e0b !important;
	box-shadow: 0 0 10px rgba(245,158,11,0.5);
	animation: qk-pivot-pulse 2.4s ease-in-out infinite;
}
@keyframes qk-pivot-pulse {
	0%, 100% { box-shadow: 0 0 6px rgba(245,158,11,0.4); background: #f59e0b; }
	50%      { box-shadow: 0 0 18px rgba(245,158,11,0.9); background: #fbbf24; }
}
@keyframes qk-l1 {
	0%,20%   { transform: translateX(0);    background: #27272a; }
	40%,60%  { transform: translateX(8px);  background: #3b82f6; }
	80%,100% { transform: translateX(0);    background: #27272a; }
}
@keyframes qk-l2 {
	0%,20%   { transform: translateX(0);    background: #27272a; }
	50%,65%  { transform: translateX(5px);  background: #3b82f6; }
	80%,100% { transform: translateX(0);    background: #27272a; }
}
@keyframes qk-r1 {
	0%,20%   { transform: translateX(0);    background: #27272a; }
	40%,60%  { transform: translateX(-8px); background: #ef4444; }
	80%,100% { transform: translateX(0);    background: #27272a; }
}
@keyframes qk-r2 {
	0%,20%   { transform: translateX(0);    background: #27272a; }
	50%,65%  { transform: translateX(-5px); background: #ef4444; }
	80%,100% { transform: translateX(0);    background: #27272a; }
}
.bar-q1 { animation: qk-l1 2.4s ease-in-out infinite 0s; }
.bar-q2 { animation: qk-l2 2.4s ease-in-out infinite 0.1s; }
.bar-q3 { animation: qk-l1 2.4s ease-in-out infinite 0.2s; }
.bar-q5 { animation: qk-r1 2.4s ease-in-out infinite 0s; }
.bar-q6 { animation: qk-r2 2.4s ease-in-out infinite 0.1s; }
.bar-q7 { animation: qk-r1 2.4s ease-in-out infinite 0.2s; }

/* ════════════════════════════════════════════════════════
   MERGE SORT
   Two groups slide apart (split), pause, then slide back
   together (merge) — bars turn blue as they merge
════════════════════════════════════════════════════════ */
.bar-m1 { height: 28px; }
.bar-m2 { height: 44px; }
.bar-m3 { height: 20px; }
.bar-m4 { height: 36px; }
.bar-m5 { height: 52px; }
.bar-m6 { height: 24px; }

@keyframes mg-l {
	0%, 10%  { transform: translateX(0);     background: #27272a; }
	25%, 45% { transform: translateX(-10px); background: #3b82f6; }
	65%, 80% { transform: translateX(0);     background: #22c55e; }
	95%,100% { background: #27272a; }
}
@keyframes mg-r {
	0%, 10%  { transform: translateX(0);    background: #27272a; }
	25%, 45% { transform: translateX(10px); background: #3b82f6; }
	65%, 80% { transform: translateX(0);    background: #22c55e; }
	95%,100% { background: #27272a; }
}
.bar-m1 { animation: mg-l 3.2s ease-in-out infinite 0s; }
.bar-m2 { animation: mg-l 3.2s ease-in-out infinite 0.08s; }
.bar-m3 { animation: mg-l 3.2s ease-in-out infinite 0.16s; }
.bar-m4 { animation: mg-r 3.2s ease-in-out infinite 0s; }
.bar-m5 { animation: mg-r 3.2s ease-in-out infinite 0.08s; }
.bar-m6 { animation: mg-r 3.2s ease-in-out infinite 0.16s; }

/* ════════════════════════════════════════════════════════
   HEAP SORT
   Tree nodes light up top-down (heapify), root pops
   out (extracted), then tree re-heapifies
════════════════════════════════════════════════════════ */
.hp-node {
	position: absolute;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: #27272a;
	border: 1px solid #3f3f46;
}
.hp-edge {
	stroke: #27272a;
	stroke-width: 1;
}

/* heapify pulse cascades top → bottom */
.hp-n0 { animation: hp-root 3s ease-in-out infinite 0s; }
.hp-n1 { animation: hp-mid  3s ease-in-out infinite 0.3s; }
.hp-n2 { animation: hp-mid  3s ease-in-out infinite 0.3s; }
.hp-n3 { animation: hp-leaf 3s ease-in-out infinite 0.6s; }
.hp-n4 { animation: hp-leaf 3s ease-in-out infinite 0.6s; }
.hp-n5 { animation: hp-leaf 3s ease-in-out infinite 0.6s; }
.hp-n6 { animation: hp-leaf 3s ease-in-out infinite 0.6s; }

@keyframes hp-root {
	0%, 15%  { background: #27272a; box-shadow: none; transform: translateX(-50%) scale(1); }
	25%, 45% { background: #f59e0b; box-shadow: 0 0 10px rgba(245,158,11,0.8); transform: translateX(-50%) scale(1.4); }
	55%, 65% { background: #ef4444; box-shadow: 0 0 12px rgba(239,68,68,0.8); transform: translateX(-50%) scale(1.2); }
	75%,100% { background: #27272a; box-shadow: none; transform: translateX(-50%) scale(1); }
}
@keyframes hp-mid {
	0%, 25%  { background: #27272a; box-shadow: none; }
	40%, 55% { background: #3b82f6; box-shadow: 0 0 8px rgba(59,130,246,0.7); }
	70%,100% { background: #27272a; box-shadow: none; }
}
@keyframes hp-leaf {
	0%, 45%  { background: #27272a; box-shadow: none; }
	60%, 70% { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.6); }
	85%,100% { background: #27272a; box-shadow: none; }
}
</style>