<script lang="ts">
    import { onMount } from 'svelte';
    import { io, type Socket } from 'socket.io-client';
    import { CheckCircle2, Circle, Activity, Server, Users } from 'lucide-svelte';

    let { data } = $props();
    let { room, currentPlayer, participantsData } = data;

    let socket: Socket;
    let participants = $state(participantsData);
    let gameStatus = $state(room.status); 

    let isReady = $derived(participants.find((p: any) => p.playerId === currentPlayer.id)?.isReady || false);

    onMount(() => {
        socket = io();

        // Join room and map our physical socket locally
        socket.emit('join-game', { roomCode: room.joinCode, playerId: currentPlayer.id });
        socket.emit('sync-participants', room.joinCode);

        // Listen to participant updates broadcasted by the DB
        socket.on('update-participants', (updatedParticipants) => {
            // DB returns raw roomParticipant rows, ensure names merge properly
            const merged = updatedParticipants.map((up: any) => {
                const existing = participants.find((p: any) => p.playerId === up.playerId);
                return {
                    ...up,
                    guestName: existing?.guestName || up.guestName || `Player_${up.playerId.substring(0,4)}`,
                    avatar: existing?.avatar || up.avatar
                };
            });
            participants = merged;
        });

        socket.on('game-start', () => {
            gameStatus = 'playing';
        });

        return () => {
            socket.disconnect();
        };
    });

    function toggleReady() {
        if (!socket) return;
        socket.emit('player-ready', { roomId: room.id, playerId: currentPlayer.id });
    }
</script>

<svelte:head>
    <title>Arena {room.joinCode} - Sorting Match</title>
</svelte:head>

<div class="relative z-10 flex min-h-[85vh] flex-col items-center justify-center p-6 mx-auto w-full max-w-[1000px]">
    
    {#if gameStatus === 'waiting'}
        <div class="flex w-full flex-col items-center gap-8 text-center mt-[-3rem]">
            <div class="mb-4">
                <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-blue-400 uppercase">
                    <Activity size={14} class="animate-pulse" />
                    Awaiting Challengers
                </div>
                <h1 class="mt-6 text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl">
                    Arena <span class="text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text">{room.joinCode}</span>
                </h1>
                <p class="mt-4 text-sm font-medium tracking-wide text-zinc-400">Match Algorithm: <span class="text-blue-300 font-bold">{room.algorithm}</span></p>
            </div>

            <!-- Real-Time Participants List -->
            <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-[800px]">
                {#each participants as p}
                    <div class="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.03] {p.playerId === currentPlayer.id ? 'ring-1 ring-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-blue-950/10' : ''}">
                        <div class="flex items-center gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-950 font-black text-white shadow-inner uppercase border border-white/5">
                                {p.guestName?.substring(0,2).toUpperCase() || 'GS'}
                            </div>
                            <div class="flex flex-col items-start gap-1">
                                <span class="text-sm font-bold text-white tracking-wide">{p.guestName}</span>
                                {#if p.playerId === currentPlayer.id}
                                    <span class="text-[9px] uppercase font-bold tracking-widest text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Local Trace</span>
                                {/if}
                            </div>
                        </div>

                        <div>
                            {#if p.isReady}
                                <div class="flex items-center gap-2 rounded-md bg-green-500/10 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                                    <CheckCircle2 size={14} /> Armed
                                </div>
                            {:else}
                                <div class="flex items-center gap-2 rounded-md bg-zinc-800/50 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-zinc-500 border border-white/5">
                                    <Circle size={14} /> Pending
                                </div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Ready Action -->
            <div class="mt-8">
                {#if isReady}
                    <div class="text-xs font-bold tracking-widest uppercase text-green-400/90 flex items-center gap-2 animate-pulse border border-green-500/20 bg-green-500/5 px-6 py-3 rounded-full">
                        <CheckCircle2 size={16} /> Protocol Armed. Waiting for cluster synchronization...
                    </div>
                {:else}
                    <button onclick={toggleReady} class="relative overflow-hidden rounded-2xl bg-blue-600/90 border border-blue-400/50 px-16 py-5 text-sm font-black tracking-[0.2em] uppercase text-white shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-105 hover:bg-blue-500 active:scale-95 group">
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s]"></div>
                        Arm Protocol (Ready)
                    </button>
                    <div class="mt-5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                        Requires all {room.mode === 'Hard' ? 8 : (room.mode === 'Normal' ? 4 : 2)} nodes to synchronize
                    </div>
                {/if}
            </div>
        </div>

    {:else}
        <!-- Real DB Game Board (playing mode) -->
        <div class="flex w-full flex-col items-center gap-12 mt-4">
            <div class="text-center">
                <div class="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-6 py-2 rounded-full text-xs font-black tracking-[0.2em] text-red-500 uppercase shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <Activity size={16} class="animate-pulse" /> PROTOCOL ENGAGED
                </div>
                <h2 class="mt-6 text-4xl font-black uppercase text-white tracking-widest">
                    {room.algorithm}
                </h2>
                <div class="mt-3 text-zinc-500 font-bold uppercase tracking-widest flex justify-center gap-5 text-[10px]">
                    <span class="flex items-center gap-1.5"><Server size={12}/> Node: {room.joinCode}</span>
                    <span class="flex items-center gap-1.5"><Users size={12}/> Entities: {participants.length}</span>
                </div>
            </div>

            <!-- Data parsed securely from Postgres room.initialArray -->
            <div class="flex flex-wrap items-end justify-center gap-3 rounded-[2rem] border border-white/5 bg-black/40 p-12 shadow-2xl backdrop-blur-md w-full max-w-4xl">
                {#each room.initialArray as value}
                    <!-- Dynamic Visualizer mapped closely from initial array -->
                    <div class="flex flex-col items-center gap-3 w-10 sm:w-12">
                        <div class="text-[10px] font-bold text-zinc-400">{value}</div>
                        <!-- Values are normalized strictly for UI representation -->
                        <div class="w-full rounded-t-[4px] bg-indigo-500/80 border border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.8)]" style="height: {Math.max(10, (value / Math.max(...room.initialArray)) * 250)}px"></div>
                    </div>
                {/each}
            </div>

            <!-- Future Implementation Target -->
            <div class="flex gap-4">
                <button class="rounded-xl border border-blue-500/30 bg-blue-950/20 px-8 py-3 text-[10px] font-bold tracking-widest text-blue-400 uppercase transition-all hover:bg-blue-600 hover:border-blue-500/0 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    Engage Sort Step
                </button>
            </div>
        </div>
    {/if}
</div>
