<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	let user = $derived($page.data.user);
</script>

<nav class="navbar glass-panel">
	<div class="layout-container nav-container">
		<div class="nav-left">
			<a href="/" class="brand text-gradient">{PUBLIC_APP_NAME || 'Sorting Match'}</a>
		</div>

		<div class="nav-center">
			<a href="/" class="nav-link active">Home</a>
			<a href="/education" class="nav-link">Education</a>
			<a href="/competition" class="nav-link">Competition</a>
			<a href="/practice" class="nav-link">Practice</a>
		</div>

		<div class="nav-right">
			{#if user}
				<div class="profile-widget">
					<div class="avatar">
                        <img src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id || user.guestName}`} alt="Profile" />
					</div>
					<div class="user-info">
						<span class="user-name">{user.guestName || user.email || 'Player'}</span>
						<span class="rank-score">Score: {user.rankScore || 0}</span>
					</div>
				</div>
			{:else}
				<a href="/login" class="btn-outline">Login / Guest</a>
			{/if}
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: sticky;
		top: 0;
		z-index: 50;
		border-radius: 0;
		border-left: none;
		border-right: none;
		border-top: none;
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        background: rgba(4, 8, 22, 0.85);
        border-bottom: 1px solid var(--border-color);
	}

	.nav-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 4.5rem;
	}

	.brand {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.nav-center {
		display: flex;
		gap: 2rem;
	}

	.nav-link {
		color: var(--text-secondary);
		font-weight: 500;
		font-size: 0.95rem;
		transition: color var(--transition-smooth);
		padding: 0.5rem 0;
		position: relative;
	}

	.nav-link:hover, .nav-link.active {
		color: var(--accent-cyan);
	}

	.nav-link.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: var(--accent-cyan);
		box-shadow: 0 -2px 10px var(--accent-cyan-glow);
	}

	.nav-right {
		display: flex;
		align-items: center;
		min-width: 150px;
		justify-content: flex-end;
	}

	.profile-widget {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.25rem 0.75rem 0.25rem 0.25rem;
		border: 1px solid var(--border-color);
		border-radius: 2rem;
		background: rgba(255, 255, 255, 0.03);
		cursor: pointer;
		transition: all var(--transition-smooth);
	}

	.profile-widget:hover {
		border-color: rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
	}

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		overflow: hidden;
		background: var(--bg-core);
		border: 2px solid var(--border-color);
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}

	.user-name {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.rank-score {
		font-size: 0.7rem;
		color: var(--text-secondary);
	}
</style>
