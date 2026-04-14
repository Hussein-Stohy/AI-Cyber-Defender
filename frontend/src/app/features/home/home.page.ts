import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-black text-white selection:bg-primary/30">
      <!-- Gradient Background -->
      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[0%] right-[0%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full"></div>
      </div>

      <!-- Navigation Header -->
      <nav class="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div class="flex items-center gap-3">
           <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black">AI</div>
           <span class="text-sm font-black uppercase tracking-widest text-white">Cyber Defender</span>
        </div>
        <button routerLink="/login" class="px-5 py-2 rounded-full border border-neutral-800 hover:border-primary/50 text-xs font-bold uppercase tracking-widest transition-all hover:text-primary">
          Sign In
        </button>
      </nav>

      <!-- Hero Section -->
      <section class="relative pt-20 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
           <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
           <span class="text-[10px] font-black uppercase tracking-widest text-primary">v2.4 Powered by Neural Defense</span>
        </div>
        
        <h1 class="text-5xl md:text-8xl font-black tracking-tight leading-tight md:leading-none bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent max-w-4xl">
          AI Cybersecurity Command Center
        </h1>
        
        <p class="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
          The next generation of autonomous threat detection. Monitor, analyze, and neutralize sophisticated cyber attacks with real-time AI-powered forensics.
        </p>

        <div class="mt-12 flex flex-col sm:flex-row gap-4 items-center">
          <button routerLink="/dashboard" 
                  class="group relative px-8 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-xl overflow-hidden active:scale-95 transition-all shadow-lg shadow-primary/20">
            <span class="relative z-10 font-bold">Start Investigation</span>
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          <button routerLink="/login" 
                  class="px-8 py-4 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 font-bold uppercase tracking-widest rounded-xl transition-all active:scale-95">
            Analyst Login
          </button>
        </div>
      </section>

      <!-- Security Highlights Stats -->
      <section class="relative py-20 px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div class="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 p-8 rounded-3xl group hover:border-primary/30 transition-all">
              <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Attacks Blocked Today</p>
              <h3 class="text-4xl font-black text-white group-hover:text-primary transition-colors">12,842</h3>
           </div>
           <div class="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 p-8 rounded-3xl group hover:border-primary/30 transition-all">
              <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Active Strategic Threats</p>
              <h3 class="text-4xl font-black text-red-500">14</h3>
           </div>
           <div class="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 p-8 rounded-3xl group hover:border-primary/30 transition-all">
              <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Neural Link Uptime</p>
              <h3 class="text-4xl font-black text-white group-hover:text-primary transition-colors">99.99%</h3>
           </div>
        </div>
      </section>

      <!-- System Overview Features -->
      <section class="relative py-20 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Command Capabilities</h2>
          <p class="text-neutral-500 max-w-xl mx-auto italic">Engineered for sub-millisecond detection and autonomous forensic reconstruction.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div *ngFor="let feat of features" class="p-8 rounded-3xl bg-neutral-900/30 border border-neutral-800 hover:bg-neutral-800/50 transition-all group">
            <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
               {{ feat.icon }}
            </div>
            <h4 class="text-lg font-bold text-white mb-3 tracking-tight">{{ feat.title }}</h4>
            <p class="text-sm text-neutral-500 leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Live Preview Fragment -->
      <section class="relative py-20 px-6 max-w-7xl mx-auto">
         <div class="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl relative group">
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all"></div>
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
               <div>
                  <h2 class="text-3xl font-black text-white uppercase tracking-tighter">Live Neural Stream</h2>
                  <p class="text-neutral-500 mt-2">Observing current system-wide incident logs...</p>
               </div>
               <button routerLink="/live" class="text-xs font-bold text-primary border-b border-primary/30 hover:border-primary pb-1 transition-all uppercase tracking-widest">Connect to Full Feed</button>
            </div>

            <div class="space-y-4">
               <div *ngFor="let attack of sampleAttacks" class="flex items-center justify-between p-4 bg-black/40 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
                  <div class="flex items-center gap-4">
                     <div [ngClass]="getSeverityClass(attack.severity)" class="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"></div>
                     <span class="text-xs font-bold text-neutral-300 uppercase tracking-widest font-mono">{{ attack.type }}</span>
                  </div>
                  <div class="flex items-center gap-6">
                     <span class="text-[10px] font-mono text-neutral-600 hidden md:inline">{{ attack.ip }}</span>
                     <span class="text-[10px] font-black uppercase text-primary tracking-widest">Intercepted</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- Footer Footer -->
      <footer class="relative py-20 px-6 border-t border-neutral-900 text-center">
         <div class="text-neutral-700 text-[10px] font-black uppercase tracking-[0.3em]">
           AI Cyber Defender © 2024 Advanced Security Protocol
         </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in {
      animation: fadeIn 1s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class HomePage {
  features = [
    { icon: '📡', title: 'Real-Time Detection', desc: 'Identify sophisticated threats as they emerge with sub-millisecond latency using edge analytics.' },
    { icon: '🧠', title: 'AI-Powered Analysis', desc: 'Neural engines analyze behavioral patterns to classify zero-day exploits and brute force vectors.' },
    { icon: '🛡️', title: 'SOC Monitoring', desc: 'Command-center ready interface for high-density strategic network observation and control.' },
    { icon: '🔍', title: 'Forensics Engine', desc: 'Automatic incident reconstruction with detailed timelines and raw log forensic integrity.' }
  ];

  sampleAttacks = [
    { type: 'SQL Injection', ip: '192.168.1.42', severity: 'high' },
    { type: 'Brute Force', ip: '45.12.33.11', severity: 'medium' },
    { type: 'Port Scan', ip: '172.20.10.5', severity: 'low' }
  ];

  getSeverityClass(severity: string) {
    switch(severity) {
      case 'high': return 'bg-red-500 text-red-500';
      case 'medium': return 'bg-amber-500 text-amber-500';
      default: return 'bg-green-500 text-green-500';
    }
  }
}
