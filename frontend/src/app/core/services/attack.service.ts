import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Attack } from '../models/attack.model';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginationMeta } from '../models/api-response.model';

export interface PaginatedAttacks {
  attacks: Attack[];
  pagination: PaginationMeta['pagination'];
}

@Injectable({
  providedIn: 'root'
})
export class AttackService {
  private apiUrl = `${environment.baseUrl}/api/attacks`;

  constructor(private http: HttpClient) {}

  /**
   * GET /api/attacks?page=&limit=&severity=&status=&type=&ip=
   * Returns paginated, filtered attack list.
   */
  getAttacks(
    page: number = 1,
    limit: number = 10,
    filters?: { severity?: string; status?: string; search?: string }
  ): Observable<PaginatedAttacks> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters?.severity) {
      params = params.set('severity', filters.severity);
    }
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    // The backend supports filtering by `type` and `ip`.
    // We use the search term to try both (send as `type` for the backend filter).
    if (filters?.search) {
      params = params.set('type', filters.search);
    }

    return this.http.get<ApiResponse<Attack[], PaginationMeta>>(this.apiUrl, { params }).pipe(
      map(response => ({
        attacks: response.data || [],
        pagination: response.meta?.pagination || { total: 0, page: 1, limit: 10, total_pages: 1 }
      }))
    );
  }

  /**
   * GET /api/attacks/{id}
   * Returns a single attack with logs, timeline, and AI explanation.
   */
  getAttackById(id: number | string): Observable<Attack | undefined> {
    return this.http.get<ApiResponse<Attack>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * GET /api/attacks/recent?limit=
   * Returns the most recent attacks for live monitoring / dashboard feed.
   */
  getRecentAttacks(limit: number = 10): Observable<Attack[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<ApiResponse<Attack[]>>(`${this.apiUrl}/recent`, { params }).pipe(
      map(response => response.data || [])
    );
  }

  /**
   * PATCH /api/attacks/{id}/status
   * Update the status of an attack (e.g., resolve, mitigate).
   */
  updateAttackStatus(id: number, status: string): Observable<boolean> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      map(() => true)
    );
  }

  /**
   * DELETE /api/attacks/{id}
   */
  deleteAttack(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(() => true)
    );
  }
}
