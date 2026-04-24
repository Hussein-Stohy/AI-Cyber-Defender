import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, timer, map, tap, of, catchError, EMPTY } from 'rxjs';
import { LiveEvent, LiveStats } from '../models/live-event.model';
import { Attack } from '../models/attack.model';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {
  private apiUrl = `${environment.baseUrl}/api/attacks/recent`;
  private isPaused$ = new BehaviorSubject<boolean>(false);
  private stats$ = new BehaviorSubject<LiveStats>({
    eventsPerMinute: 0,
    activeThreats: 0,
    totalToday: 0
  });

  /** Track already-seen attack IDs to only emit new ones */
  private seenIds = new Set<number>();
  private allEvents: LiveEvent[] = [];
  private pollIntervalMs = 4000;

  constructor(private http: HttpClient) {}

  /**
   * Polls GET /api/attacks/recent every ~4 seconds.
   * Emits individual LiveEvent objects for each new attack that hasn't been seen yet.
   * When paused, stops polling.
   */
  getLiveEvents(): Observable<LiveEvent> {
    return this.isPaused$.pipe(
      switchMap(isPaused => {
        if (isPaused) return EMPTY;

        return timer(0, this.pollIntervalMs).pipe(
          switchMap(() => this.fetchRecentAttacks()),
          switchMap(events => {
            // Only emit events we haven't seen before
            const newEvents = events.filter(e => !this.seenIds.has(Number(e.id)));
            newEvents.forEach(e => this.seenIds.add(Number(e.id)));

            // Update stats based on new data
            if (newEvents.length > 0) {
              this.updateStats(events);
            }

            // Emit each new event individually
            return of(...newEvents);
          })
        );
      })
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

  private fetchRecentAttacks(): Observable<LiveEvent[]> {
    const params = new HttpParams().set('limit', '20');
    return this.http.get<ApiResponse<Attack[]>>(this.apiUrl, { params }).pipe(
      map(response => {
        return (response.data || []).map(attack => this.mapAttackToEvent(attack));
      }),
      catchError(() => of([]))
    );
  }

  private mapAttackToEvent(attack: Attack): LiveEvent {
    return {
      id: String(attack.id),
      type: attack.type || 'Unknown',
      severity: attack.severity || 'low',
      ip: attack.ip || '0.0.0.0',
      timestamp: new Date(attack.created_at || attack.timestamp || Date.now()),
      message: attack.explanation || `${attack.type} detected from ${attack.ip}`
    };
  }

  private updateStats(allCurrentEvents: LiveEvent[]): void {
    const highThreats = allCurrentEvents.filter(e => e.severity === 'high').length;
    this.stats$.next({
      eventsPerMinute: Math.min(allCurrentEvents.length, 20),
      activeThreats: highThreats,
      totalToday: this.seenIds.size
    });
  }
}
