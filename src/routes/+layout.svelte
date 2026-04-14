<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Background from '$lib/components/ui/Background.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-root relative min-h-screen text-white">
	<Background />
	{@render children()}
</div>
