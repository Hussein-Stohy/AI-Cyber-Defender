import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-primary font-sans overflow-x-hidden">
      
      <!-- Tactical Grid Overlay -->
      <div class="fixed inset-0 pointer-events-none z-0 opacity-20" 
           style="background-image: linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px); background-size: 40px 40px;">
      </div>
      
      <!-- Ambient Glows -->
      <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
      </div>

      <!-- Header / Nav -->
      <nav class="relative z-50 flex justify-between items-center px-10 py-8 max-w-7xl mx-auto backdrop-blur-sm border-b border-white/5">
        <div class="flex items-center gap-4 group cursor-pointer">
           <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
           <div class="flex flex-col">
             <span class="text-sm font-black uppercase tracking-[0.3em] text-white leading-none">Cyber Defender</span>
             <span class="text-[8px] font-bold text-primary uppercase tracking-[0.4em] mt-1 ml-0.5">Neural Tactical Unit</span>
           </div>
        </div>
        
        <div class="flex items-center gap-8">
           <div class="hidden md:flex items-center gap-6">
              <span class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors cursor-pointer uppercase tracking-widest">Protocol</span>
              <span class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors cursor-pointer uppercase tracking-widest">Neural Net</span>
              <span class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors cursor-pointer uppercase tracking-widest">API Status</span>
           </div>
           <button routerLink="/login" class="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all hover:text-primary">
             {{ (isLoggedIn$ | async) ? 'Account' : 'Analyst Access' }}
           </button>
        </div>
      </nav>

      <!-- Main Hero Section -->
      <section class="relative z-10 pt-28 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <!-- Live Status Badge -->
        <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/20 mb-10 overflow-hidden relative group">
           <div class="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
           <span class="relative flex h-2 w-2">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
             <span class="relative inline-flex rounded-full h-2 w-2 bg-primary text-primary shadow-[0_0_8px_currentColor]"></span>
           </span>
           <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Neural Defense System Active</span>
        </div>
        
        <h1 class="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent max-w-5xl">
          COMMAND THE <br class="hidden md:block"> <span class="italic font-serif">FORENSIC</span> FRONTIER.
        </h1>
        
        <p class="mt-12 text-lg md:text-xl text-neutral-500 max-w-3xl leading-relaxed font-light italic">
          High-fidelity autonomous incident reconstruction. <br class="hidden md:block"> Witness the future of predictive cybersecurity through neural-link monitoring.
        </p>

        <div class="mt-16 flex flex-col sm:flex-row gap-6 items-center">
          <button (click)="handlePrimaryCTA()" 
                  class="group relative px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-2xl overflow-hidden active:scale-95 transition-all shadow-2xl shadow-primary/30 min-w-[280px]">
            <span class="relative z-10 font-bold block">{{ (isLoggedIn$ | async) ? 'Resume Command' : 'Initialize Session' }}</span>
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          
          <div class="flex flex-col items-start px-4 text-left border-l border-white/10">
             <span class="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Current Latency</span>
             <span class="text-sm font-mono font-bold text-green-500">1.42ms <span class="bg-green-500 w-1.5 h-1.5 rounded-full inline-block mb-0.5 ml-1 animate-pulse"></span></span>
          </div>
        </div>
      </section>

      <!-- Bento Capabilities Grid -->
      <section class="relative z-10 py-24 px-6 max-w-7xl mx-auto">
         <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
           <!-- Large Card: AI Forensics -->
           <div class="md:col-span-2 md:row-span-2 bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between hover:bg-neutral-900/60 transition-all group overflow-hidden relative">
              <div class="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 blur-[100px] group-hover:bg-primary/10 transition-all"></div>
              <div>
                <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-primary/20 shadow-inner">🧠</div>
                <h3 class="text-4xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-4">Neural <br> Forensics <br> Engine.</h3>
                <p class="text-neutral-500 text-sm max-w-sm leading-relaxed">Autonomous incident reconstruction using deep-behavioral analysis. Trace every packet back to its origin with 99.8% AI confidence.</p>
              </div>
              <div class="flex items-center gap-4 mt-12 bg-black/40 p-4 rounded-2xl border border-white/5">
                 <div class="flex -space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800"></div>
                    <div class="w-8 h-8 rounded-full border-2 border-neutral-900 bg-primary/40"></div>
                    <div class="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-700"></div>
                 </div>
                 <span class="text-[10px] font-black text-neutral-500 uppercase tracking-widest">12 Analysts Active</span>
              </div>
           </div>

           <!-- Multi-Card: Realtime Feed -->
           <div class="md:col-span-2 bg-primary/10 border border-primary/20 rounded-[2.5rem] p-10 relative overflow-hidden group">
              <div class="flex justify-between items-start">
                 <div>
                    <h4 class="text-xl font-black text-white uppercase tracking-tighter mb-2">Live Tactical Feed</h4>
                    <p class="text-primary/70 text-xs font-bold font-mono">ENCRYPTED_SIGNAL_STR_1.0</p>
                 </div>
                 <div class="text-3xl text-primary animate-pulse">📡</div>
              </div>
              <!-- Mock Feed -->
              <div class="mt-8 space-y-3 opacity-50 group-hover:opacity-100 transition-opacity">
                 <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div class="h-full bg-primary w-2/3 animate-progress-glow"></div>
                 </div>
                 <div class="flex justify-between text-[8px] font-mono text-primary font-bold uppercase tracking-widest">
                    <span>Brute_Force_Intercepted</span>
                    <span>192.168.1.1</span>
                 </div>
              </div>
           </div>

           <!-- Small Card: Global Map -->
           <div class="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group cursor-pointer hover:border-primary/30 transition-all">
              <div class="text-4xl mb-4 group-hover:rotate-12 transition-transform">🌍</div>
              <h5 class="text-xs font-black uppercase tracking-widest text-white">Global Nodes</h5>
              <p class="text-[10px] text-neutral-500 mt-2">126 Tactical Centers</p>
           </div>

           <!-- Small Card: Security Score -->
           <div class="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group cursor-pointer hover:border-primary/30 transition-all">
              <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">💯</div>
              <h5 class="text-xs font-black uppercase tracking-widest text-white">Confidence</h5>
              <p class="text-[10px] text-neutral-500 mt-2">Neural Accuracy 99.8%</p>
           </div>
         </div>
      </section>

      <!-- Advanced System Stats Section -->
      <section class="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div class="max-w-4xl">
           <span class="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block">System Integrity</span>
           <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 italic">Zero Compromise Security.</h2>
           <p class="text-neutral-500 text-lg leading-relaxed max-w-2xl">We don't just detect threats; we neutralize them before they reach your gateway. Our autonomous neural engines work in the shadows, 24/7/365.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mt-20">
           <div class="flex flex-col gap-2">
              <span class="text-sm font-mono text-neutral-600 font-bold uppercase tracking-widest">Attacks/Day</span>
              <span class="text-5xl font-black text-white tracking-tighter">1.2M+</span>
           </div>
           <div class="flex flex-col gap-2">
              <span class="text-sm font-mono text-neutral-600 font-bold uppercase tracking-widest">Response</span>
              <span class="text-5xl font-black text-white tracking-tighter">0.4<span class="text-primary text-xl">ms</span></span>
           </div>
           <div class="flex flex-col gap-2">
              <span class="text-sm font-mono text-neutral-600 font-bold uppercase tracking-widest">Nodes</span>
              <span class="text-5xl font-black text-white tracking-tighter">4,096</span>
           </div>
           <div class="flex flex-col gap-2">
              <span class="text-sm font-mono text-neutral-600 font-bold uppercase tracking-widest">Confidence</span>
              <span class="text-5xl font-black text-primary tracking-tighter">99.9%</span>
           </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="relative z-10 py-20 px-10 border-t border-white/5 bg-black/50 backdrop-blur-md">
         <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div class="flex flex-col items-center md:items-start">
               <div class="flex items-center gap-3 mb-4">
                  <div class="w-6 h-6 bg-primary rounded flex items-center justify-center text-[10px] font-black text-white">AI</div>
                  <span class="text-xs font-black uppercase tracking-widest text-white">Cyber Defender</span>
               </div>
               <p class="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Protocol Version 2.4.0-Neural</p>
            </div>

            <div class="flex items-center gap-12">
               <div class="flex flex-col gap-2">
                  <span class="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em] mb-2">Legal Access</span>
                  <a href="#" class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors">System Terms</a>
               </div>
               <div class="flex flex-col gap-2">
                  <span class="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em] mb-2">Technical</span>
                  <a href="#" class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors">API Docs</a>
                  <a href="#" class="text-[10px] font-bold text-neutral-500 hover:text-white transition-colors">Status Board</a>
               </div>
            </div>
            
            <div class="text-neutral-800 text-[10px] font-black uppercase tracking-[0.5em] hidden lg:block">
               NeuralTacticalCore_Secure
            </div>
         </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    
    .animate-progress-glow {
      animation: progress-glow 2s ease-in-out infinite;
    }

    @keyframes progress-glow {
      0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px #0C8495); }
      50% { opacity: 1; filter: drop-shadow(0 0 10px #0C8495); }
    }

    @font-face {
      font-family: 'GeistVF';
      src: url('https://vercel.com/font/geist-sans-vf.woff2') format('woff2');
      font-weight: 100 900;
      font-display: swap;
      font-style: normal;
    }

    body {
      font-family: 'GeistVF', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
  `]
})
export class HomePage implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getAuthState();
  }

  handlePrimaryCTA(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      // Small "Verifying" transition feel can be added here if needed
      // But for now, direct redirect to login is cleaner
      this.router.navigate(['/login']);
    }
  }
}
