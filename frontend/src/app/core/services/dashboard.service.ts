import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { DashboardData, StatCard, ChartDataPoint, ActivityItem } from '../models/dashboard.model';
import { Attack } from '../models/attack.model';
import { environment } from '../../../environments/environment';
import { ApiResponse, DashboardStatsData, DashboardChartsData } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.baseUrl}/api`;

  constructor(private http: HttpClient) {}

  /**
   * Fetches stats, charts, and recent attacks in parallel,
   * then maps them into the DashboardData shape the template already consumes.
   */
  getDashboardData(): Observable<DashboardData> {
    return forkJoin({
      stats: this.http.get<ApiResponse<DashboardStatsData>>(`${this.apiUrl}/dashboard/stats`),
      charts: this.http.get<ApiResponse<DashboardChartsData>>(`${this.apiUrl}/dashboard/charts`),
      recent: this.http.get<ApiResponse<Attack[]>>(`${this.apiUrl}/attacks/recent?limit=6`)
    }).pipe(
      map(({ stats, charts, recent }) => {
        const s = stats.data;

        // Map API stats → StatCard[] (same shape the template expects)
        const summary: StatCard[] = [
          {
            title: 'Total Attacks',
            value: this.formatNumber(s.totalAttacks),
            icon: '⚔️',
            trend: 0,
            trendLabel: 'total'
          },
          {
            title: 'High Severity',
            value: this.formatNumber(s.highSeverity),
            icon: '🚨',
            trend: 0,
            trendLabel: 'total'
          },
          {
            title: 'Active Threats',
            value: this.formatNumber(s.activeThreats),
            icon: '📡',
            trend: 0,
            trendLabel: 'currently'
          },
          {
            title: 'Resolved',
            value: this.formatNumber(s.resolved),
            icon: '✅',
            trend: 0,
            trendLabel: 'total'
          }
        ];

        // Map chart data → trends (label, value)
        const trends: ChartDataPoint[] = (charts.data.attacksOverTime || []).map(item => ({
          label: item.date,
          value: Number(item.count)
        }));

        // Map severity distribution → distributions
        const totalSeverity = (charts.data.severityDistribution || []).reduce((sum, d) => sum + Number(d.count), 0);
        const distributions: ChartDataPoint[] = (charts.data.severityDistribution || []).map(item => ({
          label: this.capitalizeFirst(item.severity),
          value: totalSeverity > 0 ? Math.round((Number(item.count) / totalSeverity) * 100) : 0
        }));

        // Map recent attacks → activities feed
        const activities: ActivityItem[] = (recent.data || []).map(attack => ({
          id: String(attack.id),
          type: attack.type,
          severity: (attack.severity as 'low' | 'medium' | 'high') || 'low',
          timestamp: this.formatTimestamp(attack.created_at || attack.timestamp)
        }));

        return { summary, trends, distributions, activities };
      })
    );
  }

  private formatNumber(n: number): string {
    return n >= 1000 ? n.toLocaleString() : String(n);
  }

  private capitalizeFirst(s: string): string {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

  private formatTimestamp(ts: string): string {
    if (!ts) return '';
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
}
