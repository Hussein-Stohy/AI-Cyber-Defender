import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../core/services/statistics.service';
import { StatisticsData } from '../../core/models/api-response.model';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8 pb-12">
      <header>
        <h1 class="text-3xl font-bold">Security Statistics</h1>
        <p class="text-neutral-400 mt-1">Deep dive into historical data and trends.</p>
      </header>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="h-96 flex flex-col items-center justify-center gap-4 text-neutral-500">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="font-bold uppercase tracking-widest text-xs">Loading statistics...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="errorMessage" class="h-96 flex flex-col items-center justify-center gap-4 text-neutral-500">
        <div class="text-5xl opacity-30">⚠️</div>
        <p class="text-red-400 font-bold text-sm">{{ errorMessage }}</p>
        <button (click)="loadStats()" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg uppercase tracking-widest">Retry</button>
      </div>

      <!-- Data Content -->
      <ng-container *ngIf="!isLoading && !errorMessage && stats">

        <!-- Top Attacking IPs -->
        <div class="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
          <div class="px-6 py-4 border-b border-neutral-800 bg-neutral-800/20">
            <h3 class="text-sm font-black text-white uppercase tracking-widest">Top Attacking IPs</h3>
          </div>
          <div class="divide-y divide-neutral-800/50">
            <div *ngFor="let item of stats.topIps; let i = index" class="px-6 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
              <div class="flex items-center gap-4">
                <span class="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-xs font-black text-neutral-400">{{ i + 1 }}</span>
                <span class="font-mono text-white font-bold tracking-wider">{{ item.ip }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div class="h-full bg-primary rounded-full" [style.width]="getBarWidth(item.count, stats.topIps[0].count) + '%'"></div>
                </div>
                <span class="text-primary font-bold text-sm font-mono w-10 text-right">{{ item.count }}</span>
              </div>
            </div>
            <div *ngIf="stats.topIps.length === 0" class="px-6 py-12 text-center text-neutral-600 italic">
              No IP data available.
            </div>
          </div>
        </div>

        <!-- Attack Types & Daily Trends Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Attack Types Distribution -->
          <div class="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
            <div class="px-6 py-4 border-b border-neutral-800 bg-neutral-800/20">
              <h3 class="text-sm font-black text-white uppercase tracking-widest">Attack Types Distribution</h3>
            </div>
            <div class="p-6 space-y-4">
              <div *ngFor="let item of stats.attackTypes" class="flex items-center justify-between">
                <span class="text-neutral-300 text-sm font-medium truncate flex-1 mr-4">{{ item.type }}</span>
                <div class="flex items-center gap-3 flex-shrink-0">
                  <div class="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div class="h-full rounded-full" 
                         [style.width]="getBarWidth(item.count, stats.attackTypes[0].count) + '%'"
                         [style.background]="getTypeColor(item.type)"></div>
                  </div>
                  <span class="text-white font-bold text-xs font-mono w-8 text-right">{{ item.count }}</span>
                </div>
              </div>
              <div *ngIf="stats.attackTypes.length === 0" class="py-8 text-center text-neutral-600 italic">
                No attack type data available.
              </div>
            </div>
          </div>

          <!-- Daily Trends -->
          <div class="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
            <div class="px-6 py-4 border-b border-neutral-800 bg-neutral-800/20">
              <h3 class="text-sm font-black text-white uppercase tracking-widest">Daily Trend (Last 30 Days)</h3>
            </div>
            <div class="p-6">
              <!-- Simple bar chart -->
              <div class="flex items-end gap-1 h-48">
                <div *ngFor="let item of stats.dailyTrends" 
                     class="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t relative group cursor-pointer"
                     [style.height]="getTrendBarHeight(item.count) + '%'"
                     [title]="item.date + ': ' + item.count + ' attacks'">
                  <!-- Tooltip -->
                  <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[9px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {{ item.count }}
                  </div>
                </div>
              </div>
              <!-- Date labels (show first and last) -->
              <div class="flex justify-between mt-3 text-[10px] text-neutral-500 font-mono" *ngIf="stats.dailyTrends.length > 0">
                <span>{{ stats.dailyTrends[0].date }}</span>
                <span>{{ stats.dailyTrends[stats.dailyTrends.length - 1].date }}</span>
              </div>
              <div *ngIf="stats.dailyTrends.length === 0" class="h-48 flex items-center justify-center text-neutral-600 italic">
                No trend data available.
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class StatisticsPage implements OnInit {
  stats: StatisticsData | null = null;
  isLoading = false;
  errorMessage = '';

  private typeColors: Record<string, string> = {};
  private palette = ['#0C8495', '#ef4444', '#f59e0b', '#22c55e', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.statisticsService.getStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
        // Assign colors to attack types
        (data.attackTypes || []).forEach((t, i) => {
          this.typeColors[t.type] = this.palette[i % this.palette.length];
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load statistics. Please try again.';
        this.isLoading = false;
      }
    });
  }

  getBarWidth(value: number, max: number): number {
    if (!max || max === 0) return 0;
    return Math.round((Number(value) / Number(max)) * 100);
  }

  getTypeColor(type: string): string {
    return this.typeColors[type] || '#0C8495';
  }

  getTrendBarHeight(count: number): number {
    if (!this.stats || !this.stats.dailyTrends.length) return 0;
    const max = Math.max(...this.stats.dailyTrends.map(t => Number(t.count)));
    if (max === 0) return 5;
    return Math.max(5, Math.round((Number(count) / max) * 100));
  }
}
