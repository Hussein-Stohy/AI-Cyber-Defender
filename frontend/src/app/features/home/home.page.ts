import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-primary font-sans overflow-x-hidden">
      
      <!-- Premium Background: Tactical Grid + Glows -->
      <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute inset-0 opacity-20" 
             style="background-image: linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px); background-size: 40px 40px;">
        </div>
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      </div>

      <!-- Navigation -->
      <nav class="relative z-50 flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div class="flex items-center gap-3 group cursor-pointer" routerLink="/">
           <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
           <span class="text-xl font-black uppercase tracking-tighter text-white">Defender<span class="text-primary">.AI</span></span>
        </div>
        
        <div class="flex items-center gap-4">
           <button routerLink="/login" class="group relative px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest transition-all overflow-hidden">
             <span class="relative z-10">{{ (isLoggedIn$ | async) ? 'Dashboard' : 'Sign In' }}</span>
             <div class="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
           </button>
           <button *ngIf="!(isLoggedIn$ | async)" routerLink="/register" class="group relative px-6 py-2 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 overflow-hidden hover:scale-105 active:scale-95">
             <span class="relative z-10">Register</span>
             <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
           </button>
        </div>
      </nav>

      <!-- 1. HERO SECTION -->
      <section class="relative z-10 pt-20 md:pt-32 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
           <span class="relative flex h-2 w-2">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
             <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
           </span>
           <span class="text-[10px] font-black uppercase tracking-widest text-primary">v2.0 Neural Engine Live</span>
        </div>
        
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          AI CYBERSECURITY <br class="hidden md:block"> COMMAND CENTER
        </h1>
        
        <p class="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-12">
          Autonomous threat detection and forensic reconstruction. Secure your network infrastructure with next-generation neural analysis.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 items-center">
          <button (click)="handlePrimaryCTA()" 
                  class="group relative px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(12,132,149,0.5)] active:scale-95 w-full sm:w-auto">
            <span class="relative z-10">{{ (isLoggedIn$ | async) ? 'Enter Dashboard' : 'Initialize Session' }}</span>
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>

          <button routerLink="/live" 
                  class="group relative px-10 py-4 bg-neutral-900 border border-neutral-800 text-white font-bold uppercase tracking-widest rounded-xl overflow-hidden hover:bg-neutral-800 transition-all hover:border-neutral-700 active:scale-95 w-full sm:w-auto">
            <span class="relative z-10">Live Monitoring</span>
            <div class="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </section>

      <!-- 2. FEATURES SECTION -->
      <section class="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Advanced Defense Matrix</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Feature Card 1 -->
          <div class="bg-neutral-900/50 border border-white/5 p-8 rounded-3xl hover:bg-neutral-800/50 hover:border-primary/30 transition-all duration-300 group cursor-default">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">🧠</div>
            <h3 class="text-xl font-bold text-white mb-3">AI Threat Detection</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">Deep-learning neural networks that identify zero-day vulnerabilities in real-time.</p>
          </div>

          <!-- Feature Card 2 -->
          <div class="bg-neutral-900/50 border border-white/5 p-8 rounded-3xl hover:bg-neutral-800/50 hover:border-primary/30 transition-all duration-300 group cursor-default">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">📡</div>
            <h3 class="text-xl font-bold text-white mb-3">Real-time Monitoring</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">Continuous situational awareness across all endpoints with sub-millisecond latency.</p>
          </div>

          <!-- Feature Card 3 -->
          <div class="bg-neutral-900/50 border border-white/5 p-8 rounded-3xl hover:bg-neutral-800/50 hover:border-primary/30 transition-all duration-300 group cursor-default">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">⚔️</div>
            <h3 class="text-xl font-bold text-white mb-3">Attack Forensics</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">Automated reconstruction of attack timelines to visualize how threats entered your system.</p>
          </div>

          <!-- Feature Card 4 -->
          <div class="bg-neutral-900/50 border border-white/5 p-8 rounded-3xl hover:bg-neutral-800/50 hover:border-primary/30 transition-all duration-300 group cursor-default">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">📊</div>
            <h3 class="text-xl font-bold text-white mb-3">Analytics Dashboard</h3>
            <p class="text-neutral-500 text-sm leading-relaxed">Comprehensive security metrics and high-fidelity visualizations for your entire infrastructure.</p>
          </div>
        </div>
      </section>

      <!-- 3. LIVE PREVIEW SECTION -->
      <section class="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div class="bg-neutral-900/40 border border-neutral-800 rounded-[2rem] overflow-hidden backdrop-blur-sm">
           <div class="p-6 border-b border-neutral-800 bg-neutral-800/20 flex justify-between items-center">
              <div class="flex gap-2">
                 <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                 <div class="w-3 h-3 rounded-full bg-amber-500/50"></div>
                 <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span class="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Tactical Live Preview</span>
           </div>
           
           <div class="p-8 md:p-12">
              <div class="space-y-4">
                 <div *ngFor="let item of previewAttacks" class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-black/40 border border-white/5 rounded-xl animate-slide-up hover:border-primary/20 transition-all group cursor-pointer">
                    <div class="flex items-center gap-4">
                       <span class="text-lg group-hover:scale-125 transition-transform">{{ item.icon }}</span>
                       <div>
                          <h4 class="text-white font-bold text-sm">{{ item.type }}</h4>
                          <p class="text-neutral-500 text-xs font-mono">{{ item.ip }}</p>
                       </div>
                    </div>
                    <div class="mt-2 md:mt-0 flex items-center gap-4">
                       <span [ngClass]="item.color" class="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10 group-hover:border-primary/30 transition-all">
                          {{ item.severity }}
                       </span>
                       <span class="text-[10px] text-neutral-600 font-mono">{{ item.time }}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <!-- 4. STATS SECTION -->
      <section class="relative z-10 py-24 px-6 max-w-7xl mx-auto">
         <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div class="flex flex-col gap-2 group">
               <span class="text-5xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{{ stats.attacks.toLocaleString() }}+</span>
               <span class="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Attacks Detected</span>
            </div>
            <div class="flex flex-col gap-2 group">
               <span class="text-5xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{{ stats.accuracy }}%</span>
               <span class="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Accuracy Rate</span>
            </div>
            <div class="flex flex-col gap-2 group">
               <span class="text-5xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">{{ stats.uptime }}%</span>
               <span class="text-[10px] font-black text-primary uppercase tracking-[0.4em]">System Uptime</span>
            </div>
         </div>
      </section>

      <!-- 5. CALL TO ACTION (FINAL) -->
      <section class="relative z-10 py-32 px-6 max-w-7xl mx-auto text-center border-t border-white/5">
         <h2 class="text-4xl md:text-6xl font-black text-white mb-12 uppercase tracking-tighter">
            Secure your system with <br> AI intelligence
         </h2>
         <button (click)="handlePrimaryCTA()" 
                 class="group relative px-12 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
            <span class="relative z-10">Go to Dashboard</span>
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
         </button>
      </section>

      <!-- 6. FOOTER -->
      <footer class="relative z-10 py-16 px-6 border-t border-white/5 bg-black/80">
         <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex flex-col items-center md:items-start">
               <div class="flex items-center gap-3 mb-4">
                  <div class="w-8 h-8 bg-primary rounded flex items-center justify-center text-xs font-black text-white">AI</div>
                  <span class="text-sm font-black uppercase tracking-widest text-white">Cyber Defender</span>
               </div>
               <p class="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">© 2024 Neural Tactical Core. All rights secured.</p>
            </div>

            <div class="flex gap-8">
               <a href="#" class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
               <a href="#" class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Terms</a>
               <a href="#" class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">API Docs</a>
            </div>
         </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    
    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }

    .animate-slide-up {
      animation: slideUp 0.8s ease-out both;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Staggered animation for preview items */
    .animate-slide-up:nth-child(1) { animation-delay: 0.1s; }
    .animate-slide-up:nth-child(2) { animation-delay: 0.2s; }
    .animate-slide-up:nth-child(3) { animation-delay: 0.3s; }
    .animate-slide-up:nth-child(4) { animation-delay: 0.4s; }
  `]
})
export class HomePage implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  previewAttacks = [
    { type: 'Brute Force Attempt', ip: '192.168.1.42', severity: 'high', color: 'text-red-500 bg-red-500/10', icon: '🚨', time: '12ms ago' },
    { type: 'SQL Injection Blocked', ip: '45.12.89.2', severity: 'medium', color: 'text-amber-500 bg-amber-500/10', icon: '⚠️', time: '45ms ago' },
    { type: 'Port Scan Detected', ip: '10.0.0.15', severity: 'low', color: 'text-primary bg-primary/10', icon: '🔍', time: '1.2s ago' },
    { type: 'Neural Pattern Match', ip: '172.16.0.4', severity: 'high', color: 'text-red-500 bg-red-500/10', icon: '🧠', time: '3.4s ago' }
  ];

  stats = {
    attacks: 0,
    accuracy: 0,
    uptime: 0
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getAuthState();
    this.animateStats();
  }

  private animateStats(): void {
    const targets = { attacks: 1420580, accuracy: 99.8, uptime: 100 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      this.stats.attacks = Math.floor((targets.attacks / steps) * currentStep);
      this.stats.accuracy = Number(((targets.accuracy / steps) * currentStep).toFixed(1));
      this.stats.uptime = Math.floor((targets.uptime / steps) * currentStep);

      if (currentStep >= steps) {
        this.stats = targets;
        clearInterval(timer);
      }
    }, interval);
  }

  handlePrimaryCTA(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
