import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardData } from '../../core/models/dashboard.model';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Loading State -->
    <div *ngIf="isLoading" class="h-96 flex flex-col items-center justify-center gap-4 text-neutral-500">
      <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p class="font-bold uppercase tracking-widest text-xs">Loading command center data...</p>
    </div>

    <!-- Error State -->
    <div *ngIf="errorMessage" class="h-96 flex flex-col items-center justify-center gap-4 text-neutral-500">
      <div class="text-5xl opacity-30">⚠️</div>
      <p class="text-red-400 font-bold text-sm">{{ errorMessage }}</p>
      <button (click)="retry()" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg uppercase tracking-widest">Retry</button>
    </div>

    <div class="space-y-8 pb-12" *ngIf="data$ | async as data">
      <!-- Header -->
      <header>
        <h1 class="text-3xl font-bold tracking-tight text-white">Security Command Center</h1>
        <p class="text-neutral-400 mt-1">Real-time monitoring and threat intelligence overview.</p>
      </header>

      <!-- Summary Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div *ngFor="let card of data.summary" 
             class="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 group">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-neutral-400 text-sm font-medium">{{ card.title }}</p>
              <h2 class="text-3xl font-bold mt-2 text-white">{{ card.value }}</h2>
            </div>
            <div class="p-3 bg-neutral-800 rounded-xl group-hover:bg-primary/10 transition-colors">
              <span class="text-2xl">{{ card.icon }}</span>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-2">
            <span [ngClass]="getTrendColor(card)" class="flex items-center text-xs font-bold">
              <span *ngIf="card.trend >= 0">↑</span>
              <span *ngIf="card.trend < 0">↓</span>
              {{ card.trend > 0 ? '+' : '' }}{{ card.trend }}%
            </span>
            <span class="text-neutral-500 text-xs">{{ card.trendLabel }}</span>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Line Chart: Attack Intensity -->
        <div class="lg:col-span-2 bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden">
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-lg font-bold text-white">Attack Intensity (24h)</h3>
            <div class="flex gap-2 text-xs">
              <span class="flex items-center gap-1 text-neutral-400">
                <span class="w-3 h-3 bg-primary rounded-full"></span> Incoming
              </span>
            </div>
          </div>
          
          <!-- Simple SVG Line Chart -->
          <div class="h-64 w-full relative group">
            <svg viewBox="0 0 700 200" class="w-full h-full preserve-3d">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0C8495" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="#0C8495" stop-opacity="0" />
                </linearGradient>
              </defs>
              <!-- Path area -->
              <path [attr.d]="linePathArea" fill="url(#chartGradient)" />
              <!-- Border line -->
              <path [attr.d]="linePathBorder" fill="none" class="stroke-primary" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              
              <!-- Data Points (Glow) -->
              <circle *ngFor="let point of points" [attr.cx]="point.x" [attr.cy]="point.y" r="4" class="fill-primary shadow-lg" />
            </svg>
            
            <!-- Grid Lines Overlay -->
            <div class="absolute inset-x-0 bottom-0 h-full border-b border-neutral-800 flex justify-between px-0">
               <div *ngFor="let t of data.trends" class="border-l border-neutral-800/30 h-full"></div>
            </div>
          </div>
          
          <div class="flex justify-between px-2 mt-4">
             <span *ngFor="let t of data.trends" class="text-[10px] text-neutral-500 font-mono">{{ t.label }}</span>
          </div>
        </div>

        <!-- Donut Chart: Severity Distribution -->
        <div class="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl flex flex-col">
          <h3 class="text-lg font-bold text-white mb-8">Severity Distribution</h3>
          <div class="flex-1 flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 100 100" class="w-48 h-48 -rotate-90">
               <!-- Background circle -->
               <circle cx="50" cy="50" r="40" stroke="#1f1f1f" stroke-width="12" fill="none" />
               <ng-container *ngFor="let segment of donutSegments">
                 <circle
                   cx="50"
                   cy="50"
                   r="40"
                   [attr.stroke]="segment.color"
                   stroke-width="12"
                   fill="none"
                   [attr.stroke-dasharray]="segment.dasharray"
                   [attr.stroke-dashoffset]="segment.dashoffset"
                 />
               </ng-container>
            </svg>
            <div class="absolute flex flex-col items-center">
              <span class="text-3xl font-black text-white">{{ totalAttacks }}</span>
              <span class="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Attacks</span>
            </div>
          </div>
          
          <div class="mt-8 space-y-3">
             <div *ngFor="let d of data.distributions" class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                   <span class="w-2 h-2 rounded-full" [ngClass]="getSeverityColorClass(d.label)"></span>
                   <span class="text-neutral-400">{{ d.label }}</span>
                </div>
                <span class="text-white font-mono">{{ d.value }}%</span>
             </div>
          </div>
        </div>
      </div>

      <!-- Live Activity Feed -->
      <div class="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
        <div class="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h3 class="font-bold text-white flex items-center gap-2">
            <span class="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            Live Threat Activity
          </h3>
          <button class="text-xs text-primary hover:underline font-bold uppercase tracking-wider">View All Logs</button>
        </div>
        <div class="divide-y divide-neutral-800/50">
          <div *ngFor="let activity of data.activities" class="p-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-xl">
                 {{ activity.severity === 'high' ? '🛑' : (activity.severity === 'medium' ? '⚠️' : 'ℹ️') }}
              </div>
              <div>
                <p class="text-sm font-bold text-white">{{ activity.type }}</p>
                <p class="text-xs text-neutral-500">{{ activity.timestamp }}</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <span [ngClass]="getBadgeClasses(activity.severity)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border">
                {{ activity.severity }}
              </span>
              <button class="p-2 text-neutral-500 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class DashboardPage implements OnInit, OnDestroy {
  data$!: Observable<DashboardData>;
  points: {x: number, y: number}[] = [];
  linePathBorder: string = '';
  linePathArea: string = '';
  donutSegments: { color: string; dasharray: string; dashoffset: string; }[] = [];
  totalAttacks: string = '0';
  isLoading = true;
  errorMessage = '';
  private pollInterval: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
    // Auto-refresh every 5 seconds for real-time updates
    this.pollInterval = setInterval(() => {
      this.loadData(true);
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  loadData(silent: boolean = false): void {
    if (!silent) {
      this.isLoading = true;
    }
    this.errorMessage = '';
    this.data$ = this.dashboardService.getDashboardData().pipe(
      catchError(err => {
        this.errorMessage = 'Failed to load dashboard data. Please check your connection.';
        this.isLoading = false;
        return of(null as any);
      })
    );
    this.data$.subscribe(data => {
      this.isLoading = false;
      if (data) {
        this.calculatePaths(data.trends);
        this.calculateDonut(data.distributions);
        // Set total attacks for donut center label
        const totalCard = data.summary.find(c => c.title === 'Total Attacks');
        this.totalAttacks = totalCard ? totalCard.value : '0';
      }
    });
  }

  retry(): void {
    this.loadData();
  }

  private calculatePaths(trends: any[]) {
    const width = 700;
    const height = 200;
    if (!trends || trends.length === 0) {
      this.points = [];
      this.linePathBorder = '';
      this.linePathArea = '';
      return;
    }

    const maxVal = Math.max(...trends.map(t => t.value), 1);
    const count = trends.length;
    this.points = trends.map((t, i) => {
      const x = count === 1 ? width / 2 : (i / (count - 1)) * width;
      const y = height - (t.value / maxVal) * (height - 40) - 20;
      return { x, y };
    });

    const borderPath = this.points.reduce((acc, point, i) => {
      return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
    }, '');

    this.linePathBorder = borderPath;
    this.linePathArea = `${borderPath} L ${this.points[this.points.length - 1].x} ${height} L ${this.points[0].x} ${height} Z`;
  }

  private calculateDonut(distributions: any[]) {
    const total = distributions.reduce((sum, item) => sum + Number(item.value), 0);
    const circumference = 251;
    let offset = 0;

    this.donutSegments = distributions.map(item => {
      const percentage = total > 0 ? Number(item.value) : 0;
      const length = (percentage / 100) * circumference;
      const segment = {
        color: this.getSeverityColor(item.label),
        dasharray: `${length} ${circumference - length}`,
        dashoffset: `${-offset}`
      };
      offset += length;
      return segment;
    });
  }

  private getSeverityColor(label: string): string {
    switch (label.toLowerCase()) {
      case 'critical': return '#dc2626';
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#0C8495';
      default: return '#38bdf8';
    }
  }

  getBadgeClasses(severity: string) {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-warning/10 text-amber-500 border-amber-500/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  }

  getSeverityColorClass(severity: string) {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-primary';
      default: return 'bg-primary';
    }
  }

  getTrendColor(card: any): string {
    // Active Threats & High Severity: red when increasing, green when decreasing
    if (card.title === 'Active Threats' || card.title === 'High Severity') {
      return card.trend >= 0 ? 'text-red-500' : 'text-amber-500';
    }
    // Resolved: green when increasing
    return card.trend >= 0 ? 'text-green-500' : 'text-red-500';
  }
}
