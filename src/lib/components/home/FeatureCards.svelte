<script lang="ts">
    import { BookOpen, Trophy, FlaskConical, Play, ArrowRight } from 'lucide-svelte';
</script>

<section class="features-section layout-container">
    <div class="cards-grid">
        
        <!-- Education Card -->
        <div class="feature-card glass-panel">
            <div class="icon-wrapper">
                <BookOpen size={24} color="var(--accent-cyan)" />
            </div>
            <h3>EDUCATION</h3>
            <p>Explore the Algorithm Catalog. Learn Big O and logic through interactive visualizers.</p>
            
            <ul class="feature-list">
                <li>Visual Big O Notations</li>
                <li>Step-by-step Execution</li>
            </ul>
            
            <a href="/education" class="btn-block">
                ENTER CLASSROOM <ArrowRight size={16} />
            </a>
        </div>
        
        <!-- Competition Card -->
        <div class="feature-card glass-panel active-highlight">
            <div class="icon-wrapper bg-green">
                <Trophy size={24} color="#10B981" />
            </div>
            <h3>COMPETITION</h3>
            <p>Join live sort-wars. Input codes and rank globally against top-tier architects.</p>
            
            <div class="status-bar">
                <div class="status-header">
                    <span>ACTIVE TOURNAMENT</span>
                    <span>1,048 Players</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: 76%"></div>
                </div>
            </div>
            
            <a href="/lobby" class="btn-block btn-vibrant">
                JOIN BATTLE <Play size={16} />
            </a>
        </div>
        
        <!-- Practice Card -->
        <div class="feature-card glass-panel">
            <div class="icon-wrapper bg-purple">
                <FlaskConical size={24} color="#A855F7" />
            </div>
            <h3>PRACTICE</h3>
            <p>Laboratory workbench. Easy and Hard modes for active experimentation with raw data.</p>
            
            <div class="stats-row">
                <div class="stat-box">
                    <span class="lbl">SETS</span>
                    <span class="val">12 Sets</span>
                </div>
                <div class="stat-box">
                    <span class="lbl">DIFF</span>
                    <span class="val text-purple">Expert</span>
                </div>
            </div>
            
            <a href="/practice" class="btn-block">
                OPEN WORKBENCH <ArrowRight size={16} />
            </a>
        </div>
        
    </div>
</section>

<style>
    .features-section {
        padding-top: 2rem;
        padding-bottom: 4rem;
    }
    
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
    
    .feature-card {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        background: linear-gradient(180deg, rgba(16, 28, 65, 0.4) 0%, rgba(10, 18, 45, 0.6) 100%);
        border: 1px solid rgba(45, 65, 110, 0.4);
    }
    
    .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    .active-highlight {
        border-color: rgba(0, 240, 255, 0.3);
        background: linear-gradient(180deg, rgba(20, 45, 90, 0.5) 0%, rgba(10, 20, 50, 0.7) 100%);
    }
    
    .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: rgba(0, 240, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
    }
    
    .bg-green { background: rgba(16, 185, 129, 0.1); }
    .bg-purple { background: rgba(168, 85, 247, 0.1); }
    
    h3 {
        font-size: 1.125rem;
        margin: 0 0 1rem 0;
        letter-spacing: 0.05em;
    }
    
    p {
        color: var(--text-secondary);
        font-size: 0.875rem;
        line-height: 1.6;
        margin: 0 0 2rem 0;
        flex: 1;
    }
    
    .feature-list {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem 0;
    }
    
    .feature-list li {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        position: relative;
    }
    
    .feature-list li::before {
        content: '•';
        color: var(--accent-cyan);
        position: absolute;
        left: 0;
    }
    
    .btn-block {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.875rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-primary);
        font-size: 0.8rem;
        font-weight: 600;
        transition: all var(--transition-smooth);
    }
    
    .btn-block:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }
    
    .btn-vibrant {
        background: var(--accent-cyan);
        color: #000;
        border: none;
        box-shadow: 0 4px 15px var(--accent-cyan-glow);
    }
    
    .btn-vibrant:hover {
        background: #fff;
        color: #000;
        transform: scale(1.02);
    }
    
    .status-bar {
        margin-bottom: 1.5rem;
    }
    
    .status-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.65rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
    }
    
    .progress-track {
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--accent-cyan);
        border-radius: 2px;
    }
    
    .stats-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .stat-box {
        flex: 1;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 0.75rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }
    
    .stat-box .lbl {
        font-size: 0.6rem;
        color: var(--text-secondary);
        letter-spacing: 0.05em;
    }
    
    .stat-box .val {
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .text-purple {
        color: #C084FC;
    }
</style>
