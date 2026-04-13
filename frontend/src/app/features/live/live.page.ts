import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveStreamService } from '../../core/services/live-stream.service';
import { LiveEvent, LiveStats } from '../../core/models/live-event.model';
import { Observable, Subscription, scan, BehaviorSubject, map, combineLatest } from 'rxjs';
import { Severity } from '../../core/models/attack.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-live-monitoring',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px) scale(0.95)' }),
          stagger(100, [
            animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <div class="space-y-8 pb-20">
      <!-- SOC Header -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div class="flex items-center gap-3">
             <h1 class="text-3xl font-black text-white tracking-tight">SOC Command Center</h1>
             <div class="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20">
               <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <span class="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Feed</span>
             </div>
          </div>
          <p class="text-neutral-400 mt-1">Real-time tactical situational awareness across all network endpoints.</p>
        </div>

        <div class="flex items-center gap-6">
           <div class="flex flex-col items-end">
              <span class="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">System Status</span>
              <span class="text-sm font-bold text-green-500">WebSocket: Connected</span>
           </div>
           <button (click)="togglePause()" 
                   [ngClass]="(isPaused$ | async) ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'"
                   class="px-6 py-2 rounded-lg text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95">
             {{ (isPaused$ | async) ? '▶ Resume Stream' : '⏸ Pause Stream' }}
           </button>
        </div>
      </header>

      <!-- Tactical Statistics Widget Bar -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" *ngIf="stats$ | async as stats">
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between">
           <div>
              <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Events / Min</p>
              <h2 class="text-3xl font-black text-primary">{{ stats.eventsPerMinute }}</h2>
           </div>
           <div class="text-4xl opacity-20">⚡</div>
        </div>
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between">
           <div>
              <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Active Threats</p>
              <h2 class="text-3xl font-black text-red-500">{{ stats.activeThreats }}</h2>
           </div>
           <div class="text-4xl opacity-20">🎯</div>
        </div>
        <div class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between">
           <div>
              <p class="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Total Detected Today</p>
              <h2 class="text-3xl font-black text-white">{{ stats.totalToday }}</h2>
           </div>
           <div class="text-4xl opacity-20">🏢</div>
        </div>
      </div>

      <!-- Control Toolbar & Monitoring Feed -->
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center">
           <h3 class="text-xl font-bold text-white uppercase tracking-tighter">Tactical Stream Feed</h3>
           <div class="flex items-center gap-2">
              <span class="text-[10px] text-neutral-500 font-bold mr-2 uppercase">Filter Severity:</span>
              <button *ngFor="let s of ['all', 'high', 'medium', 'low']" 
                      (click)="setFilter(s)"
                      [ngClass]="activeFilter === s ? 'bg-primary text-white' : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:text-white'"
                      class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                {{ s }}
              </button>
           </div>
        </div>

        <div class="space-y-4 min-h-[500px]" [@listAnimation]="filteredEvents.length">
          <div *ngFor="let event of filteredEvents" 
               [ngClass]="getEventGlowClass(event.severity)"
               class="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl transition-all hover:scale-[1.01] hover:bg-neutral-800/50 group relative overflow-hidden">
            
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div class="flex items-center gap-5">
                  <div class="w-12 h-12 rounded-xl bg-black/40 border border-neutral-700 flex items-center justify-center text-xl shadow-inner">
                     {{ event.severity === 'high' ? '🛑' : (event.severity === 'medium' ? '⚠️' : 'ℹ️') }}
                  </div>
                  <div>
                    <div class="flex items-center gap-3">
                       <h4 class="text-lg font-black text-white leading-none">{{ event.type }}</h4>
                       <span [ngClass]="getSeverityBadgeClass(event.severity)" class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border">
                         {{ event.severity }}
                       </span>
                    </div>
                    <p class="text-neutral-400 mt-1 text-sm font-medium">{{ event.message }}</p>
                  </div>
               </div>

               <div class="flex flex-col items-end gap-1">
                  <p class="text-xs font-mono font-bold text-white tracking-widest truncate">{{ event.ip }}</p>
                  <p class="text-[10px] text-neutral-500 font-bold tabular-nums">REC: {{ event.timestamp | date:'HH:mm:ss:SSS' }}</p>
               </div>
            </div>
            
            <!-- Terminal-style ID Overlay -->
            <div class="absolute bottom-1 right-3 opacity-5 text-[8px] font-mono font-bold text-white group-hover:opacity-20 transition-opacity">
               INC_ID_{{ event.id }}
            </div>
          </div>

          <!-- Connection Lost / Pause Placeholder -->
          <div *ngIf="filteredEvents.length === 0" class="h-96 flex flex-col items-center justify-center text-neutral-600 gap-4">
             <div class="w-16 h-16 border-2 border-dashed border-neutral-800 rounded-full flex items-center justify-center text-3xl opacity-20">📡</div>
             <p class="font-bold uppercase tracking-widest text-xs">Awaiting signal from neural sensor array...</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .glow-high { box-shadow: 0 0 15px -5px rgba(239, 68, 68, 0.4); border-color: rgba(239, 68, 68, 0.3) !important; }
    .glow-medium { box-shadow: 0 0 15px -5px rgba(245, 158, 11, 0.3); border-color: rgba(245, 158, 11, 0.2) !important; }
    .glow-low { box-shadow: 0 0 15px -5px rgba(12, 132, 149, 0.3); border-color: rgba(12, 132, 149, 0.2) !important; }
  `]
})
export class LiveMonitoringPage implements OnInit, OnDestroy {
  allEvents: LiveEvent[] = [];
  filteredEvents: LiveEvent[] = [];
  stats$!: Observable<LiveStats>;
  isPaused$!: Observable<boolean>;
  activeFilter: string = 'all';

  private subscription: Subscription = new Subscription();

  constructor(private liveStreamService: LiveStreamService) {}

  ngOnInit(): void {
    this.stats$ = this.liveStreamService.getStats();
    this.isPaused$ = this.liveStreamService.getPauseState();

    // Handle incoming events and maintain a buffer of last 50
    this.subscription.add(
      this.liveStreamService.getLiveEvents().subscribe(event => {
        this.allEvents = [event, ...this.allEvents].slice(0, 50);
        this.applyFilter();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  togglePause() {
    this.liveStreamService.togglePause();
  }

  setFilter(severity: string) {
    this.activeFilter = severity;
    this.applyFilter();
  }

  private applyFilter() {
    if (this.activeFilter === 'all') {
      this.filteredEvents = [...this.allEvents];
    } else {
      this.filteredEvents = this.allEvents.filter(e => e.severity === this.activeFilter);
    }
  }

  getEventGlowClass(severity: string) {
    return `glow-${severity}`;
  }

  getSeverityBadgeClass(severity: string) {
    switch(severity) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  }
}
