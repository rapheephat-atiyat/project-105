<script lang="ts">
    import { Play, FileText } from 'lucide-svelte';
</script>

<section class="hero-section layout-container">
    <div class="hero-content">
        <div class="badge">SYSTEM READY</div>
        <h1 class="hero-title">
            SORTING<br />
            <span class="text-gradient">MATCH</span>
        </h1>
        <p class="hero-subtitle">
            Master the Algorithm. Solve the Experiment.<br />
            A high-performance simulation for<br /> competitive sorters.
        </p>
        
        <div class="hero-actions">
            <a href="/lobby" class="btn-primary">
                GET STARTED
                <Play size={16} />
            </a>
            <a href="/docs" class="btn-outline">
                View Documentation
            </a>
        </div>
    </div>
    
    <div class="hero-visual animate-float">
        <div class="module-card glass-panel">
            <div class="module-visual">
                <div class="pulse-ring"></div>
                <div class="core"></div>
            </div>
            <div class="module-info">
                <span class="label">ACTIVE MODULE</span>
                <h4>Quicksort Optimized</h4>
            </div>
        </div>
    </div>
</section>

<style>
    .hero-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 4rem;
        padding-bottom: 4rem;
        min-height: calc(100vh - 4.5rem - 400px);
    }
    
    .hero-content {
        flex: 1;
        max-width: 600px;
    }
    
    .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border: 1px solid var(--accent-blue);
        color: var(--accent-cyan);
        background: rgba(28, 78, 216, 0.1);
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        border-radius: 4px;
        margin-bottom: 1.5rem;
    }
    
    .hero-title {
        font-size: 4.5rem;
        line-height: 1.1;
        margin: 0 0 1.5rem 0;
        letter-spacing: -0.02em;
        text-transform: uppercase;
    }
    
    .hero-subtitle {
        color: var(--text-secondary);
        font-size: 1.125rem;
        line-height: 1.6;
        margin-bottom: 2.5rem;
    }
    
    .hero-actions {
        display: flex;
        gap: 1rem;
    }
    
    .hero-visual {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }
    
    .module-card {
        width: 100%;
        max-width: 450px;
        padding: 0;
        overflow: hidden;
        border-radius: 16px;
    }
    
    .module-visual {
        height: 250px;
        background: radial-gradient(circle at center, rgba(0, 240, 255, 0.1) 0%, transparent 70%), url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSIvPjwvc3ZnPg==');
        background-color: #070D21;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    
    .pulse-ring {
        position: absolute;
        width: 120px;
        height: 120px;
        border: 1px solid var(--accent-cyan);
        border-radius: 50%;
        animation: pulse 3s infinite cubic-bezier(0.2, 0.8, 0.2, 1);
        opacity: 0;
    }
    
    .core {
        width: 60px;
        height: 60px;
        border: 2px solid var(--accent-cyan);
        background: var(--accent-cyan-glow);
        box-shadow: 0 0 20px var(--accent-cyan);
        transform: rotate(45deg);
    }
    
    .module-info {
        padding: 1.5rem;
        background: linear-gradient(to bottom, transparent, rgba(0, 10, 40, 0.8));
    }
    
    .label {
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--text-secondary);
        letter-spacing: 0.1em;
        display: block;
        margin-bottom: 0.25rem;
    }
    
    .module-info h4 {
        margin: 0;
        font-size: 1.25rem;
        color: #fff;
    }
    
    @keyframes pulse {
        0% { transform: scale(0.5); opacity: 0.8; }
        100% { transform: scale(3); opacity: 0; }
    }
</style>
