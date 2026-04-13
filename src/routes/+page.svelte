<script>
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Navbar from '$lib/components/layout/Navbar.svelte';
</script>

<svelte:head>
	<title>Home - {PUBLIC_APP_NAME || 'Sorting Matching'}</title>
</svelte:head>

<Navbar />
