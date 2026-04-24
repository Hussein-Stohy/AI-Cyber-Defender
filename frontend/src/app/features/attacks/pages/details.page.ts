import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AttackService } from '../../../core/services/attack.service';
import { Attack } from '../../../core/models/attack.model';
import { Observable, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-attack-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-8 pb-20" *ngIf="attack$ | async as attack; else loading">
      <!-- Forensic Header -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div class="flex items-center gap-4">
          <a routerLink="/attacks" class="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-3xl font-black text-white tracking-tight">{{ attack.type }}</h1>
              <span class="text-neutral-600 font-mono text-lg font-bold">#{{ attack.id }}</span>
            </div>
            <p class="text-neutral-400 mt-1 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Detected on {{ (attack.created_at || attack.timestamp) | date:'MMM d, yyyy @ HH:mm:ss' }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span [ngClass]="getSeverityClasses(attack.severity)" class="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border-2">
            {{ attack.severity }} Severity
          </span>
          <span [ngClass]="getStatusClasses(attack.status)" class="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
            {{ attack.status }}
          </span>
        </div>
      </header>

      <!-- Forensic Core Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Source IP Address</p>
          <p class="text-lg font-mono font-bold text-white tracking-wider">{{ attack.ip }}</p>
        </div>
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">AI Confidence Score</p>
          <div class="flex items-center gap-3 mt-1">
             <div class="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div class="h-full bg-primary shadow-[0_0_10px_rgba(12,132,149,0.5)]" [style.width]="(attack.confidence || 0) * 100 + '%'"></div>
             </div>
             <span class="text-primary font-bold">{{ (attack.confidence || 0) * 100 }}%</span>
          </div>
        </div>
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Detection Method</p>
          <p class="text-lg font-bold text-white">Neural Pattern Matching</p>
        </div>
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
          <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Attack Category</p>
          <p class="text-lg font-bold text-white">Application Layer</p>
        </div>
      </div>

      <!-- AI Insight & Timeline Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- AI Explanation (Forensic Insight) -->
        <div class="lg:col-span-2 space-y-8">
          <section class="bg-neutral-900 border-2 border-primary/30 p-8 rounded-2xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <span class="text-8xl">💡</span>
            </div>
            <h3 class="text-xl font-bold text-white flex items-center gap-2 mb-6 uppercase tracking-tighter">
              <span class="w-1.5 h-6 bg-primary rounded-full"></span>
              AI Forensics Explanation
            </h3>
            <p class="text-lg text-neutral-300 leading-relaxed font-medium">
              {{ attack.explanation || 'Detailed AI analysis for this specific incident is currently being processed by the security engine.' }}
            </p>
          </section>

          <!-- Raw Logs Section -->
          <section class="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
            <div class="px-6 py-4 border-b border-neutral-800 bg-neutral-800/20 flex justify-between items-center">
               <h3 class="text-sm font-black text-white uppercase tracking-widest">Forensic Raw Logs</h3>
               <span class="text-[10px] text-neutral-500 font-mono">ENCRYPTED STREAM</span>
            </div>
            <div class="p-6 bg-black/40 font-mono text-sm overflow-x-auto max-h-80 custom-scrollbar">
              <div *ngFor="let log of attack.logs" class="py-1 flex gap-4 group">
                 <span class="text-neutral-700 select-none group-hover:text-primary transition-colors">></span>
                 <span class="text-neutral-400 whitespace-nowrap">{{ log }}</span>
              </div>
              <div *ngIf="!attack.logs || attack.logs.length === 0" class="py-4 text-neutral-600 italic">
                 No raw logs captured for this incident.
              </div>
            </div>
          </section>
        </div>

        <!-- Vertical Incident Timeline -->
        <section class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
           <h3 class="text-xl font-bold text-white uppercase tracking-tighter mb-8 bg-gradient-to-r from-white to-neutral-700 bg-clip-text text-transparent">
             Incident Timeline
           </h3>
           <div class="space-y-0 relative">
              <!-- Timeline vertical line -->
              <div class="absolute left-1 top-2 bottom-2 w-0.5 bg-neutral-800"></div>

              <div *ngFor="let step of attack.timeline; let last = last" class="relative pl-8 pb-10">
                 <!-- Dot -->
                 <div class="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-neutral-900 z-10"></div>
                 
                 <p class="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{{ step.timestamp }}</p>
                 <h4 class="text-white font-bold leading-tight">{{ step.description }}</h4>
                 
                 <!-- Connector line extension if not last -->
                 <div *ngIf="!last" class="absolute left-1 top-4 bottom-0 w-0.5 bg-primary/20"></div>
              </div>

              <div *ngIf="!attack.timeline || attack.timeline.length === 0" class="py-8 text-neutral-600 text-center italic">
                 Timeline data unavailable.
              </div>
           </div>
        </section>
      </div>
    </div>

    <!-- Loading Placeholder -->
    <ng-template #loading>
      <div class="h-96 flex flex-col items-center justify-center gap-4 text-neutral-500">
         <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
         <p class="font-bold uppercase tracking-widest text-xs">Analyzing Incident # forensic data...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0,0,0,0.1);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #0C8495;
    }
  `]
})
export class AttackDetailsPage implements OnInit {
  attack$!: Observable<Attack | null | undefined>;

  constructor(
    private route: ActivatedRoute,
    private attackService: AttackService
  ) {}

  ngOnInit(): void {
    this.attack$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') || '';
        return this.attackService.getAttackById(id).pipe(
          catchError(() => of(null))
        );
      })
    );
  }

  getSeverityClasses(severity: string) {
    switch(severity) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  }

  getStatusClasses(status: string) {
    switch(status) {
      case 'active': return 'bg-red-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      default: return 'bg-primary text-white';
    }
  }
}
