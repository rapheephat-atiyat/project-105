<script lang="ts">
    import { Activity, Globe, Compass, Star } from 'lucide-svelte';
</script>

<section class="analytics-section layout-container">
    <div class="analytics-container glass-panel">
        
        <div class="analytics-left">
            <h2>The Lab Report:<br /><span class="text-gradient">Performance Analytics</span></h2>
            <p class="description">
                Our proprietary engine tracks every swap, comparison, and memory allocation in real-time. Gain deep insights into how your code behaves under intensive data pressure.
            </p>
            
            <div class="features">
                <div class="feature-item">
                    <Activity size={20} color="var(--accent-cyan)" />
                    <div>
                        <h5>Precision Metrics</h5>
                        <p>Measure latency down to the nanosecond level.</p>
                    </div>
                </div>
                <div class="feature-item">
                    <Globe size={20} color="var(--accent-cyan)" />
                    <div>
                        <h5>Global Sync</h5>
                        <p>Compare results with the global consensus scale.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="analytics-right">
            <div class="metric-grid">
                <div class="metric-card glass-card">
                    <div class="val">99.8%</div>
                    <div class="lbl">EFFICIENCY</div>
                </div>
                
                <div class="metric-card glass-card span-row">
                    <div class="icon-top"><Compass size={16} color="var(--text-secondary)" /></div>
                    <div class="val text-pink">O(n log n)</div>
                    <div class="lbl text-pink">OPTIMAL TARGET</div>
                </div>
                
                <div class="metric-card glass-card p-large">
                    <div class="icon-top"><Activity size={16} color="var(--text-secondary)" /></div>
                    <div class="val text-cyan">1.2ms</div>
                    <div class="lbl">AVG SORT TIME</div>
                </div>
                
                <div class="metric-card glass-card">
                    <div class="val text-white">#01</div>
                    <div class="lbl">GLOBAL RANK</div>
                </div>
            </div>
        </div>
        
    </div>
    
    <footer class="footer">
        <div class="brand">SORTING MATCH</div>
        <div class="links">
            <a href="/">DOCUMENTATION</a>
            <a href="/">PRIVACY POLICY</a>
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
        padding: 3rem;
        gap: 4rem;
        border-radius: 20px;
        background: rgba(10, 15, 40, 0.4);
    }
    
    .analytics-left {
        flex: 1;
        max-width: 450px;
    }
    
    h2 {
        font-size: 2rem;
        line-height: 1.2;
        margin: 0 0 1.5rem 0;
    }
    
    .description {
        color: var(--text-secondary);
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 2.5rem;
    }
    
    .features {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .feature-item {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }
    
    .feature-item h5 {
        margin: 0 0 0.25rem 0;
        font-size: 0.95rem;
        color: var(--text-primary);
    }
    
    .feature-item p {
        margin: 0;
        font-size: 0.8rem;
        color: var(--text-secondary);
    }
    
    .analytics-right {
        flex: 1;
    }
    
    .metric-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        height: 100%;
    }
    
    .glass-card {
        background: rgba(15, 25, 65, 0.4);
        border: 1px solid rgba(45, 65, 110, 0.3);
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
    }
    
    .span-row {
        grid-row: span 2;
        background: rgba(20, 25, 75, 0.6);
    }
    
    .p-large {
        background: linear-gradient(135deg, rgba(15, 25, 70, 0.8), rgba(5, 15, 40, 0.9));
        border-color: rgba(0, 240, 255, 0.2);
    }
    
    .icon-top {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    
    .val {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
        color: var(--text-primary);
    }
    
    .lbl {
        font-size: 0.6rem;
        letter-spacing: 0.1em;
        color: var(--text-secondary);
        font-weight: 600;
    }
    
    .text-pink { color: #E879F9; }
    .text-cyan { color: var(--accent-cyan); }
    .text-white { color: #fff; }
    
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);
        font-size: 0.65rem;
        color: var(--text-secondary);
        letter-spacing: 0.05em;
    }
    
    .brand {
        color: var(--accent-cyan);
        font-weight: 700;
    }
    
    .links {
        display: flex;
        gap: 2rem;
    }
    
    .links a {
        transition: color var(--transition-smooth);
    }
    
    .links a:hover {
        color: var(--text-primary);
    }
</style>
