import { Injectable } from '@angular/core';
import { Observable, interval, map, BehaviorSubject, switchMap, timer, filter } from 'rxjs';
import { LiveEvent, LiveStats } from '../models/live-event.model';
import { Severity } from '../models/attack.model';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {
  private isPaused$ = new BehaviorSubject<boolean>(false);
  private stats$ = new BehaviorSubject<LiveStats>({
    eventsPerMinute: 0,
    activeThreats: 0,
    totalToday: 1420
  });

  private attackTypes = ['SQL Injection', 'Brute Force', 'XSS Query', 'DDoS Attempt', 'Port Scan', 'Credential Stuffing'];
  private severities: Severity[] = ['low', 'medium', 'high'];
  private messages = [
    'Multiple failed login attempts detected',
    'Anomalous GET request structure identified',
    'Suspicious IP scanning open ports',
    'Potential bypass attempt on authentication layer',
    'Unusual traffic volume originating from single source',
    'Neural engine flagged high-entropy payload'
  ];

  getLiveEvents(): Observable<LiveEvent> {
    return this.isPaused$.pipe(
      switchMap(isPaused => isPaused ? [] : interval(4000).pipe(
        map(() => this.generateRandomEvent())
      ))
    );
  }

  getStats(): Observable<LiveStats> {
    return this.stats$.asObservable();
  }

  togglePause(): void {
    this.isPaused$.next(!this.isPaused$.value);
  }

  getPauseState(): Observable<boolean> {
    return this.isPaused$.asObservable();
  }

  private generateRandomEvent(): LiveEvent {
    const type = this.attackTypes[Math.floor(Math.random() * this.attackTypes.length)];
    const severity = this.severities[Math.floor(Math.random() * this.severities.length)];
    const message = this.messages[Math.floor(Math.random() * this.messages.length)];
    const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    // Update stats
    const currentStats = this.stats$.value;
    this.stats$.next({
      eventsPerMinute: Math.floor(Math.random() * 10) + 5,
      activeThreats: currentStats.activeThreats + (severity === 'high' ? 1 : 0),
      totalToday: currentStats.totalToday + 1
    });

    return {
      id: `EVT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      type,
      severity,
      ip,
      timestamp: new Date(),
      message
    };
  }
}
