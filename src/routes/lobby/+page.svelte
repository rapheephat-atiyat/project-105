<script lang="ts">
	import { Search, Plus, Play, Users, Wifi, Shield, Server, Terminal } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { io, type Socket } from 'socket.io-client';

    let { data } = $props();
    let rooms = $state(data.initialRooms || []);
    let socket: Socket;

    onMount(() => {
        socket = io();

        // Listen for real-time room updates if server broadcasts them
        socket.on('new-room', (newRoom) => {
            rooms = [{
                id: newRoom.joinCode,
                name: `${newRoom.algorithm} Match`,
                host: newRoom.hostPlayer?.guestName || 'Anonymous',
                players: 1,
                maxPlayers: newRoom.mode === 'Hard' ? 8 : 4,
                ping: `${Math.floor(10 + Math.random() * 40)}ms`,
                difficult: newRoom.mode
            }, ...rooms];
        });
    });

    const logs = [
        "[09:41:22] System connected to matchmaking network...",
        "[09:41:25] API Handshake Complete",
        "[09:42:01] Fetched Active Sessions...",
        "[09:45:12] Waiting for user deployment..."
    ];

    async function createArena() {
        try {
            const res = await fetch('/api/rooms', {
                method: 'POST',
                body: JSON.stringify({ mode: 'Normal', algorithm: 'Quick Sort' }),
                headers: { 'Content-Type': 'application/json' }
            });
            const d = await res.json();
            if (d.success) {
                // If supported by backend socket
                if (socket) socket.emit('room-created', d.room);
                goto(`/competition/${d.room.joinCode}`);
            }
        } catch (e) {
            console.error('Failed to create arena', e);
        }
    }
</script>

<svelte:head>
	<title>Lobby - Sorting Match</title>
</svelte:head>

<div class="relative z-10 mx-auto w-full max-w-[1300px] px-6 py-16 lg:py-24">
    <!-- Header -->
	<div class="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
		<div>
			<h1 class="text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-300">
				Central <span class="text-transparent bg-gradient-to-b from-blue-400 to-indigo-600 bg-clip-text">Lobby</span>
			</h1>
			<p class="mt-3 text-sm tracking-wide text-zinc-400/80 font-medium">Connect to the matchmaking subroutines or initialize an arena.</p>
		</div>
		
        <!-- Subtle Animated Ping Indicator -->
        <div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 backdrop-blur-md">
			<span class="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Network</span>
            <div class="flex h-3 items-end gap-[2px]">
                <div class="w-1 rounded-sm bg-blue-500/50 ping-bar-1 origin-bottom"></div>
                <div class="w-1 rounded-sm bg-blue-500/50 ping-bar-2 origin-bottom"></div>
                <div class="w-1.5 rounded-sm bg-blue-400 ping-bar-3 origin-bottom drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                <div class="w-1 rounded-sm bg-blue-500/50 ping-bar-4 origin-bottom"></div>
            </div>
            <span class="text-xs font-bold text-blue-400 tracking-wider w-10 text-right">24ms</span>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <!-- Main Column -->
		<div class="flex flex-col gap-10 lg:col-span-8">
            
            <!-- Hero Actions -->
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Quick Match -->
				<button class="group relative flex flex-col items-start gap-4 overflow-hidden rounded-[2rem] border border-blue-500/20 bg-blue-950/20 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-900/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] opacity-90 hover:opacity-100">
                    <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-600/20 blur-3xl transition-all duration-300 group-hover:bg-blue-500/40"></div>
					<div class="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 transition-transform duration-300 group-hover:scale-110 shadow-inner">
						<Play size={24} fill="currentColor" class="ml-1" />
					</div>
					<div class="relative z-10 mt-2">
						<div class="text-xl font-bold tracking-widest text-white">QUICK MATCH</div>
						<div class="mt-1 text-sm text-blue-200/60 font-medium">Join an active optimal protocol</div>
					</div>
				</button>
                
                <!-- Create Arena -->
				<button onclick={createArena} class="group relative flex flex-col items-start gap-4 overflow-hidden rounded-[2rem] border border-indigo-500/20 bg-indigo-950/20 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-indigo-900/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] opacity-90 hover:opacity-100">
                    <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-600/20 blur-3xl transition-all duration-300 group-hover:bg-indigo-500/40"></div>
					<div class="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 transition-transform duration-300 group-hover:rotate-90">
						<Plus size={24} />
					</div>
					<div class="relative z-10 mt-2">
						<div class="text-xl font-bold tracking-widest text-white">CREATE ARENA</div>
						<div class="mt-1 text-sm text-indigo-200/60 font-medium">Host a custom local connection</div>
					</div>
				</button>
			</div>

            <!-- Enhanced Session List -->
			<div class="rounded-[2rem] border border-white/5 bg-neutral-950/50 p-1.5 shadow-2xl backdrop-blur-3xl">
                <!-- Inner Panel for Glass Effect -->
                <div class="flex flex-col rounded-[1.8rem] bg-white/[0.01]">
                    <div class="flex items-center justify-between border-b border-white/5 px-8 py-6">
                        <h2 class="text-sm font-bold tracking-widest text-white/80">ACTIVE SESSIONS</h2>
                        <div class="flex items-center gap-3">
                            <Search size={16} class="text-zinc-500" />
                            <input type="text" placeholder="Search Trace ID..." class="w-32 bg-transparent text-sm text-white/90 placeholder:text-zinc-600 outline-none transition-all focus:w-48" />
                        </div>
                    </div>

                    <div class="flex flex-col px-4 py-4 gap-2">
                        {#each rooms as room}
                            <div class="group flex flex-col items-center justify-between gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-white/5 hover:bg-white/[0.03] sm:flex-row">
                                <div class="flex w-full items-center gap-6 sm:w-auto">
                                    <div class="flex h-12 w-16 shrink-0 items-center justify-center rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-500 transition-colors group-hover:text-blue-400 group-hover:border-blue-500/30">
                                        {room.id.split('-')[1]}
                                    </div>
                                    <div class="flex flex-col">
                                        <div class="text-base font-bold text-white/90">{room.name}</div>
                                        <div class="mt-1 flex items-center gap-5 text-xs text-zinc-500/80 font-medium">
                                            <span class="flex items-center gap-1.5"><Server size={14} class="text-zinc-600"/> {room.host}</span>
                                            <span class="flex items-center gap-1.5"><Users size={14} class="text-zinc-600"/> {room.players}/{room.maxPlayers}</span>
                                            <span class="flex items-center gap-1.5 text-blue-500/70"><Wifi size={14} /> {room.ping}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onclick={() => goto(`/competition/${room.id}`)} class="w-full shrink-0 rounded-xl bg-blue-600/10 border border-blue-500/20 px-8 py-3 text-xs font-bold tracking-widest text-blue-400 transition-all hover:bg-blue-600 hover:border-blue-500/0 hover:text-white sm:w-auto active:scale-95 shadow-[0_0_15px_rgba(59,130,246,0)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                    JOIN
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
		</div>

        <!-- Sidebar -->
		<div class="flex flex-col gap-8 lg:col-span-4">
            
            <!-- Sleek Profile -->
			<div class="relative overflow-hidden rounded-[2rem] border border-white/5 bg-neutral-950/50 p-8 shadow-2xl backdrop-blur-3xl transition-all hover:border-white/10 opacity-90 hover:opacity-100">
                <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-600/10 blur-[80px]"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-[2px] shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <div class="flex h-full w-full items-center justify-center rounded-full bg-neutral-950/90 text-3xl font-black text-white">
                            RM
                        </div>
                    </div>
                    <h3 class="text-xl font-bold tracking-wide text-white">Rapheephat</h3>
                    <div class="mt-2 flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-bold tracking-wider text-blue-400">
                        <Shield size={14} /> O(n log n)
                    </div>

                    <div class="mt-8 flex w-full flex-col gap-1">
                        <div class="flex items-center justify-between rounded-xl p-3 hover:bg-white/[0.02] transition-colors">
                            <span class="text-sm text-zinc-500 font-medium tracking-wide">Matches</span>
                            <span class="text-sm font-bold text-white/90">1,204</span>
                        </div>
                        <div class="flex items-center justify-between rounded-xl p-3 hover:bg-white/[0.02] transition-colors">
                            <span class="text-sm text-zinc-500 font-medium tracking-wide">Win Rate</span>
                            <span class="text-sm font-bold text-indigo-400">68.5%</span>
                        </div>
                        <div class="flex items-center justify-between rounded-xl p-3 hover:bg-white/[0.02] transition-colors">
                            <span class="text-sm text-zinc-500 font-medium tracking-wide">Avg Speed</span>
                            <span class="text-sm font-bold text-blue-400">1.2ms</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hacker Mini Terminal -->
			<div class="flex h-64 flex-col rounded-[2rem] border border-white/5 bg-[#050505] p-6 shadow-2xl">
                <div class="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                    <span class="flex items-center gap-2 text-xs font-bold tracking-widest text-zinc-500/80"><Terminal size={14} /> SYS_FEED</span>
                    <div class="flex gap-1.5">
                        <div class="h-2 w-2 rounded-full bg-zinc-800"></div>
                        <div class="h-2 w-2 rounded-full bg-green-500/60 shadow-[0_0_5px_rgba(34,197,94,0.3)]"></div>
                    </div>
                </div>
                <div class="flex flex-col gap-3 overflow-y-auto font-mono text-[11px] font-medium leading-relaxed tracking-wide text-zinc-500">
                    {#each logs as log}
                        <div class="hover:text-zinc-300 transition-colors">
                            <span class="text-blue-500/50">></span> <span class="text-zinc-600">{log.substring(0, 10)}</span>
                            {log.substring(10)}
                        </div>
                    {/each}
                    <div class="mt-2 text-zinc-600 flex items-center gap-1.5">
                        <span class="block h-3 w-1.5 bg-blue-500/50 animate-pulse"></span>
                    </div>
                </div>
            </div>

		</div>
	</div>
</div>

<style>
	@keyframes ping-bounce {
		0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
		50% { transform: scaleY(1); opacity: 1; filter: drop-shadow(0 0 5px rgba(96,165,250,0.6)); }
	}
	.ping-bar-1 { height: 100%; transform: scaleY(0.4); animation: ping-bounce 1.5s ease-in-out infinite 0.0s; }
	.ping-bar-2 { height: 100%; transform: scaleY(0.5); animation: ping-bounce 1.4s ease-in-out infinite 0.3s; }
	.ping-bar-3 { height: 100%; transform: scaleY(0.8); animation: ping-bounce 1.6s ease-in-out infinite 0.6s; }
	.ping-bar-4 { height: 100%; transform: scaleY(0.4); animation: ping-bounce 1.3s ease-in-out infinite 0.2s; }
</style>
