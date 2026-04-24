import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, StatisticsData } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.baseUrl}/api/statistics`;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/statistics
   * Returns topIps, attackTypes, and dailyTrends.
   */
  getStatistics(): Observable<StatisticsData> {
    return this.http.get<ApiResponse<StatisticsData>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}
