import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardData } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getDashboardData(): Observable<DashboardData> {
    const data: DashboardData = {
      summary: [
        { title: 'Total Attacks', value: '1,284', icon: '⚔️', trend: 12, trendLabel: 'vs last month' },
        { title: 'High Severity', value: '42', icon: '🚨', trend: -5, trendLabel: 'vs last month' },
        { title: 'Active Threats', value: '18', icon: '📡', trend: 8, trendLabel: 'currently' },
        { title: 'Resolved', value: '1,224', icon: '✅', trend: 15, trendLabel: 'vs last month' }
      ],
      trends: [
        { label: '00:00', value: 10 },
        { label: '04:00', value: 25 },
        { label: '08:00', value: 45 },
        { label: '12:00', value: 30 },
        { label: '16:00', value: 60 },
        { label: '20:00', value: 40 },
        { label: '23:59', value: 20 }
      ],
      distributions: [
        { label: 'High', value: 15 },
        { label: 'Medium', value: 35 },
        { label: 'Low', value: 50 }
      ],
      activities: [
        { id: '1', type: 'SQL Injection', severity: 'high', timestamp: '2 mins ago' },
        { id: '2', type: 'Brute Force', severity: 'medium', timestamp: '15 mins ago' },
        { id: '3', type: 'DDoS Attempt', severity: 'high', timestamp: '45 mins ago' },
        { id: '4', type: 'XSS Query', severity: 'low', timestamp: '1 hour ago' },
        { id: '5', type: 'Port Scan', severity: 'medium', timestamp: '3 hours ago' },
        { id: '6', type: 'Anomalous Entry', severity: 'low', timestamp: '5 hours ago' }
      ]
    };
    return of(data);
  }
}
