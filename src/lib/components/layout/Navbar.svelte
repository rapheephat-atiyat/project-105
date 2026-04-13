<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	let user = $derived($page.data.user);
</script>

<nav class="sticky top-0 z-50 backdrop-blur-2xl bg-[rgba(4,8,22,0.85)] border-b border-border-color">
	<div class="max-w-[1400px] mx-auto px-4 md:px-8 w-full flex justify-between items-center h-18">
		<div class="shrink-0">
			<a href="/" class="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-accent-cyan to-accent-blue">{PUBLIC_APP_NAME || 'Sorting Match'}</a>
		</div>

		<div class="flex gap-8">
			<a href="/" class="text-white/60 hover:text-accent-cyan font-medium text-[0.95rem] transition-colors py-2 relative {$page.url.pathname === '/' ? 'text-accent-cyan after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent-cyan after:shadow-[0_-2px_10px_var(--color-accent-cyan-glow)]' : ''}">Home</a>
			<a
				href="/education"
				class="text-white/60 hover:text-accent-cyan font-medium text-[0.95rem] transition-colors py-2 relative {$page.url.pathname.startsWith(
					'/education'
				)
					? 'text-accent-cyan after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent-cyan after:shadow-[0_-2px_10px_var(--color-accent-cyan-glow)]'
					: ''}">Education</a
			>
			<a
				href="/competition"
				class="text-white/60 hover:text-accent-cyan font-medium text-[0.95rem] transition-colors py-2 relative {$page.url.pathname.startsWith(
					'/competition'
				)
					? 'text-accent-cyan after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent-cyan after:shadow-[0_-2px_10px_var(--color-accent-cyan-glow)]'
					: ''}">Competition</a
			>
			<a
				href="/practice"
				class="text-white/60 hover:text-accent-cyan font-medium text-[0.95rem] transition-colors py-2 relative {$page.url.pathname.startsWith(
					'/practice'
				)
					? 'text-accent-cyan after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent-cyan after:shadow-[0_-2px_10px_var(--color-accent-cyan-glow)]'
					: ''}">Practice</a
			>
		</div>

		<div class="flex items-center justify-end min-w-[150px]">
			{#if user}
				<div
					class="flex items-center gap-3 p-1 pr-3 border border-border-color rounded-full bg-white/5 cursor-pointer hover:border-white/20 hover:bg-white/10 transition-all"
				>
					<div class="w-9 h-9 rounded-full overflow-hidden bg-bg-core border-2 border-border-color">
						<img
							src={user.image ||
								`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id || user.guestName}`}
							alt="Profile"
							class="w-full h-full object-cover"
						/>
					</div>
					<div class="flex flex-col leading-tight">
						<span class="text-[0.85rem] font-semibold text-white"
							>{user.guestName || user.email || 'Player'}</span
						>
						<span class="text-[0.7rem] text-white/60">Score: {user.rankScore || 0}</span>
					</div>
				</div>
			{:else}
				<a
					href="/login"
					class="px-6 py-2 rounded-full font-bold text-[0.85rem] tracking-wider border border-border-color bg-transparent text-white/80 hover:bg-white/5 transition-colors uppercase whitespace-nowrap"
					>Login / Guest</a
				>
			{/if}
		</div>
	</div>
</nav>
