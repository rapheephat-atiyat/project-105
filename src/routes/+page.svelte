<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import FeatureCards from '$lib/components/home/FeatureCards.svelte';
	import Analytics from '$lib/components/home/Analytics.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<svelte:head>
	<title>Home - {PUBLIC_APP_NAME || 'Sorting Matching'}</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<Hero />
	<FeatureCards />
	<Analytics />
	<Footer />
</div>
