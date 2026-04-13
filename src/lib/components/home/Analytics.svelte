<script lang="ts">
	import { Activity, Globe, Compass, Zap } from 'lucide-svelte';
</script>

<section class="analytics-section layout-container">
	<div class="analytics-container glass-panel">
		<div class="analytics-top">
			<h2 class="centered-title">
				The Lab Report:<br /><span class="text-gradient">Performance Analytics</span>
			</h2>
			<p class="description">
				Our proprietary engine tracks every swap, comparison, and memory allocation in real-time.<br
				/>
				Gain deep insights into how your code behaves under intensive data pressure.
			</p>

			<div class="features">
				<div class="feature-item">
					<div class="icon-circle"><Activity size={20} color="var(--accent-cyan)" /></div>
					<div>
						<h5>Precision Metrics</h5>
						<p>Measure latency down to the nanosecond level.</p>
					</div>
				</div>
				<div class="feature-item">
					<div class="icon-circle"><Globe size={20} color="var(--accent-cyan)" /></div>
					<div>
						<h5>Global Sync</h5>
						<p>Compare results with the global consensus scale.</p>
					</div>
				</div>
			</div>
		</div>

		<div class="analytics-bottom">
			<div class="metric-grid">
				<div class="metric-card glass-card">
					<div class="val">99.8%</div>
					<div class="lbl">EFFICIENCY RATING</div>
				</div>

				<div class="metric-card glass-card p-large">
					<div class="icon-top"><Compass size={18} color="rgba(255,255,255,0.2)" /></div>
					<div class="val text-pink">O(n log n)</div>
					<div class="lbl text-pink">OPTIMAL TARGET</div>
				</div>

				<div class="metric-card glass-card p-large p-alt">
					<div class="icon-top"><Zap size={18} color="rgba(255,255,255,0.2)" /></div>
					<div class="val text-cyan">1.2ms</div>
					<div class="lbl text-cyan">AVG SORT TIME</div>
				</div>
				<div class="metric-card glass-card">
					<div class="val text-white">#01</div>
					<div class="lbl">GLOBAL RANK</div>
				</div>
			</div>
		</div>
	</div>

	<footer class="footer">
		<div class="brand">SORTING <span class="text-gradient">MATCH</span></div>
		<div class="links">
			<a href="/">DOCUMENTATION</a>
			<div class="dot-sep"></div>
			<a href="/">PRIVACY POLICY</a>
			<div class="dot-sep"></div>
			<a href="/">CONTACT SUPPORT</a>
		</div>
		<div class="copyright">© 2026 SORTING MATCH. A DATA LAB PROJECT.</div>
	</footer>
</section>

<style>
	.analytics-section {
		padding-top: 4rem;
		padding-bottom: 2rem;
	}

	.analytics-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 4rem;
		gap: 3.5rem;
		border-radius: 20px;
		background: rgba(10, 15, 40, 0.4);
	}

	.analytics-top {
		max-width: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.centered-title {
		font-size: clamp(2rem, 4vw, 2.75rem);
		line-height: 1.2;
		margin: 0 0 1.5rem 0;
		letter-spacing: -0.02em;
	}

	.description {
		color: var(--text-secondary);
		font-size: 1rem;
		line-height: 1.6;
		margin-bottom: 3rem;
		max-width: 600px;
	}

	.features {
		display: flex;
		justify-content: center;
		gap: 4rem;
		width: 100%;
	}

	.feature-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 250px;
	}

	.icon-circle {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: rgba(0, 240, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(0, 240, 255, 0.2);
	}

	.feature-item h5 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
		color: var(--text-primary);
		letter-spacing: 0.05em;
	}

	.feature-item p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.analytics-bottom {
		width: 100%;
		max-width: 1000px;
	}

	.metric-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		height: 160px;
	}

	.glass-card {
		background: rgba(15, 25, 65, 0.4);
		border: 1px solid rgba(45, 65, 110, 0.3);
		border-radius: 12px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.glass-card:hover {
		transform: translateY(-5px);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.p-large {
		background: linear-gradient(135deg, rgba(15, 25, 70, 0.8), rgba(5, 15, 40, 0.9));
		border-color: rgba(232, 121, 249, 0.3);
		box-shadow: 0 10px 30px rgba(232, 121, 249, 0.1);
	}

	.p-alt {
		border-color: rgba(0, 240, 255, 0.3);
		box-shadow: 0 10px 30px rgba(0, 240, 255, 0.1);
	}

	.icon-top {
		position: absolute;
		top: 1rem;
		right: 1rem;
		opacity: 0.5;
	}

	.val {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
		z-index: 1;
	}

	.lbl {
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		color: var(--text-secondary);
		font-weight: 700;
		z-index: 1;
	}

	.text-pink {
		color: #e879f9;
	}
	.text-cyan {
		color: var(--accent-cyan);
	}
	.text-white {
		color: #fff;
	}

	.footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
		margin-top: 4rem;
		padding-top: 3rem;
		border-top: 1px solid var(--border-color);
		font-size: 0.75rem;
		color: var(--text-secondary);
		letter-spacing: 0.05em;
	}

	.brand {
		font-weight: 800;
		letter-spacing: 0.2em;
		font-size: 0.9rem;
	}

	.links {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.dot-sep {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--border-color);
	}

	.links a {
		transition: color var(--transition-smooth);
		font-weight: 600;
	}

	.links a:hover {
		color: var(--text-primary);
	}

	.copyright {
		opacity: 0.6;
		font-size: 0.65rem;
	}

	@media (max-width: 992px) {
		.metric-grid {
			grid-template-columns: repeat(2, 1fr);
			height: auto;
			grid-auto-rows: 140px;
		}

		.features {
			flex-direction: column;
			gap: 2rem;
			align-items: center;
		}

		.links {
			flex-direction: column;
			gap: 1rem;
		}
		.dot-sep {
			display: none;
		}
	}
</style>
