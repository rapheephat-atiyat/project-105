<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { authClient } from '$lib/client/auth';
	import {
		Trophy,
		BookOpen,
		Gamepad2,
		LogOut,
		ChevronDown,
		Menu,
		X,
		Settings,
		User as UserIcon,
		LayoutGrid
	} from 'lucide-svelte';

	let user = $derived($page.data.user);
	let isMenuOpen = $state(false);
	let y = $state(0);
	let scrolled = $derived(y > 60);

	async function handleLogout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					window.location.href = '/login';
				}
			}
		});
	}

	const links = [
		{ name: 'หน้าหลัก', href: '/', icon: LayoutGrid },
		{ name: 'บทเรียน', href: '/education', icon: BookOpen },
		{ name: 'แข่งขัน', href: '/lobby', icon: Trophy },
		{ name: 'ฝึกซ้อม', href: '/practice', icon: Gamepad2 }
	];
</script>

<svelte:window bind:scrollY={y} />

<nav
	class="fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out {scrolled ? 'top-3' : 'top-0'}"
>
	<div
		class="mx-auto w-full transition-all duration-500 ease-in-out {scrolled ? 'max-w-185 rounded-full border border-white/10 bg-zinc-900/90 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]' : 'max-w-[1280px] px-6 backdrop-blur-2xl'}"
	>
		<div
			class="flex items-center justify-between transition-all duration-500 {scrolled ? 'h-11' : 'h-14'}"
		>
			<div class="flex items-center gap-6">
				<a
					href="/"
					class="whitespace-nowrap font-black tracking-tighter text-white transition-all hover:opacity-80 {scrolled ? 'text-sm' : 'text-lg'}"
				>
					{PUBLIC_APP_NAME || 'MasTicket'}
				</a>

				<div class="hidden items-center gap-0.5 md:flex">
					{#each links as link}
						<a
							href={link.href}
							class="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-all duration-200 {scrolled ? 'text-[11px]' : 'text-xs'} {$page.url.pathname === link.href ? 'bg-white/10 text-white' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}"
						>
							<link.icon size={scrolled ? 12 : 14} />
							<span class="whitespace-nowrap">{link.name}</span>
						</a>
					{/each}
				</div>
			</div>

			<div class="hidden items-center gap-2.5 md:flex">
				{#if user}
					{#if user.role === 'Admin'}
						<a
							href="/admin"
							class="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-bold text-red-400 transition-colors hover:bg-red-500/20"
						>
							<Settings size={12} />
							<span>Admin</span>
						</a>
						<div class="h-5 w-px bg-white/10"></div>
					{/if}

					<div
						class="flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 transition-all {scrolled ? 'px-2 py-1' : 'px-3 py-1.5'}"
					>
						{#if !scrolled}
							<span class="text-[9px] font-extrabold uppercase tracking-widest text-zinc-500">Score</span>
						{/if}
						<span class="font-black tracking-tighter text-blue-400 {scrolled ? 'text-xs' : 'text-sm'}">
							{user.rankScore?.toLocaleString() || 0}
						</span>
					</div>

					<div class="group relative">
						<button
							class="flex items-center gap-2 rounded-full border border-white/5 bg-zinc-900/50 p-1 pr-3 transition-all hover:border-white/20 hover:bg-zinc-800"
						>
							<div
								class="shrink-0 overflow-hidden rounded-full border border-white/10 bg-zinc-800 transition-all {scrolled ? 'h-6.5 w-6.5' : 'h-7.5 w-7.5'}"
							>
								<img
									src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
									alt="avatar"
									class="h-full w-full object-cover"
								/>
							</div>
							{#if !scrolled}
								<div class="flex flex-col items-start leading-none">
									<span class="max-w-[80px] truncate text-xs font-bold text-zinc-200">{user.name || 'Player'}</span>
									<span class="mt-0.5 text-[8px] font-bold uppercase tracking-tighter text-zinc-600">Level 1</span>
								</div>
							{/if}
							<ChevronDown size={13} class="text-zinc-600 transition-transform group-hover:rotate-180" />
						</button>

						<div
							class="invisible absolute right-0 top-[calc(100%+8px)] z-50 w-48 origin-top-right scale-95 rounded-2xl border border-white/5 bg-black/95 p-1.5 opacity-0 shadow-2xl backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100"
						>
							<a
								href="/profile"
								class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
							>
								<UserIcon size={14} />
								โปรไฟล์ของฉัน
							</a>
							<div class="my-1 h-px bg-white/5"></div>
							<button
								onclick={handleLogout}
								class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
							>
								<LogOut size={14} />
								ออกจากระบบ
							</button>
						</div>
					</div>
				{:else}
					<a
						href="/login"
						class="flex items-center rounded-xl bg-white px-5 py-1.5 text-xs font-black text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
					>
						Get Started
					</a>
				{/if}
			</div>

			<button
				class="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition-all hover:bg-white/5 hover:text-white md:hidden"
				onclick={() => (isMenuOpen = !isMenuOpen)}
			>
				{#if isMenuOpen}
					<X size={20} />
				{:else}
					<Menu size={20} />
				{/if}
			</button>
		</div>
	</div>
</nav>

{#if isMenuOpen}
	<div
		class="fixed left-0 right-0 z-[49] flex flex-col gap-1 bg-black/98 p-4 pt-20 backdrop-blur-2xl transition-all md:hidden {scrolled ? 'top-14' : 'top-0'}"
	>
		{#each links as link}
			<a
				href={link.href}
				class="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
				onclick={() => (isMenuOpen = false)}
			>
				<link.icon size={18} />
				{link.name}
			</a>
		{/each}

		{#if user}
			<div class="mt-2 flex items-center gap-3 border-t border-white/5 p-4">
				<img
					src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
					alt="avatar"
					class="h-10 w-10 rounded-xl object-cover"
				/>
				<div>
					<p class="text-sm font-bold text-white">{user.name}</p>
					<p class="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
						{user.rankScore?.toLocaleString() || 0} PTS
					</p>
				</div>
			</div>
			<button
				onclick={handleLogout}
				class="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10"
			>
				<LogOut size={16} />
				ออกจากระบบ
			</button>
		{:else}
			<a
				href="/login"
				class="mt-2 flex items-center justify-center rounded-xl bg-white p-3.5 text-sm font-bold text-black"
			>
				Get Started
			</a>
		{/if}
	</div>
{/if}