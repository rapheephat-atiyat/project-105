<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client/auth';
	import { LogIn, GitBranch, Mail, Lock, Loader2 } from 'lucide-svelte';

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');

	async function handleEmailLogin(e: Event) {
		e.preventDefault();
		isLoading = true;
		errorMessage = '';

		const { data, error } = await authClient.signIn.email({
			email,
			password
		});

		if (error) {
			errorMessage = error.message || 'รหัสผ่านไม่ถูกต้อง หรือไม่พบผู้ใช้งานนี้';
			isLoading = false;
		} else {
			// ล็อกอินสำเร็จ ไปที่หน้า Lobby
			goto('/lobby');
		}
	}

	// ฟังก์ชันล็อกอินด้วย GitHub
	async function handleGithubLogin() {
		isLoading = true;
		await authClient.signIn.social({
			provider: 'github',
			callbackURL: '/lobby' // ล็อกอินผ่าน GitHub เสร็จให้เด้งไปที่นี่
		});
	}
</script>

<div class="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
	<div class="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative">
		
		{#if isLoading}
			<div class="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl">
				<Loader2 class="w-10 h-10 text-blue-500 animate-spin" />
			</div>
		{/if}

		<div class="text-center mb-8">
			<div class="inline-flex p-3 bg-blue-600/20 rounded-2xl mb-4">
				<LogIn class="w-8 h-8 text-blue-500" />
			</div>
			<h1 class="text-2xl font-bold tracking-tight">เข้าสู่ระบบ</h1>
			<p class="text-neutral-400 text-sm mt-2">ล็อกอินเพื่อบันทึกคะแนนสะสมและอันดับของคุณ</p>
		</div>

		{#if errorMessage}
			<div class="bg-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm text-center border border-red-500/20">
				{errorMessage}
			</div>
		{/if}

		<div class="space-y-6">
			<button
				onclick={handleGithubLogin}
				class="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-3.5 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 border border-white/10"
			>
				<GitBranch class="w-5 h-5" /> ล็อกอินด้วย GitHub
			</button>

			<div class="relative py-2 flex items-center">
				<div class="flex-grow border-t border-white/5"></div>
				<span class="flex-shrink mx-4 text-neutral-600 text-xs uppercase tracking-widest font-bold">หรือ</span>
				<div class="flex-grow border-t border-white/5"></div>
			</div>

			<form onsubmit={handleEmailLogin} class="space-y-4">
				<div class="space-y-1">
					<label for="email" class="text-sm font-medium text-neutral-400 ml-1">อีเมล</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Mail class="h-5 w-5 text-neutral-500" />
						</div>
						<input
							id="email"
							type="email"
							required
							bind:value={email}
							placeholder="name@example.com"
							class="w-full bg-neutral-900 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
						/>
					</div>
				</div>

				<div class="space-y-1">
					<label for="password" class="text-sm font-medium text-neutral-400 ml-1">รหัสผ่าน</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Lock class="h-5 w-5 text-neutral-500" />
						</div>
						<input
							id="password"
							type="password"
							required
							bind:value={password}
							placeholder="••••••••"
							class="w-full bg-neutral-900 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
						/>
					</div>
				</div>

				<button
					type="submit"
					class="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all mt-4 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
				>
					เข้าสู่ระบบ
				</button>
			</form>
		</div>

		<p class="text-center text-sm text-neutral-500 mt-8">
			ยังไม่มีบัญชีใช่ไหม? <a href="/register" class="text-blue-400 hover:text-blue-300 hover:underline">สมัครสมาชิกที่นี่</a>
		</p>
	</div>
</div>

<style>
	:global(body) {
		background-image: radial-gradient(circle at 50% -20%, #1e1b4b 0%, #0a0a0a 100%);
	}
</style>