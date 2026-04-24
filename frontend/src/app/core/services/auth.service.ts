import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, LoginResponseData } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}/api/auth`;
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.checkToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private checkToken(): boolean {
    return !!localStorage.getItem('soc_token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated$.value;
  }

  getAuthState(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('soc_token');
  }

  /**
   * Authenticate against POST /api/auth/login
   * Backend expects { username, password } — the login form sends "email" which we map to "username".
   */
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<ApiResponse<LoginResponseData>>(`${this.apiUrl}/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        if (response?.data?.token) {
          localStorage.setItem('soc_token', response.data.token);
          if (response.data.user) {
            localStorage.setItem('soc_user', JSON.stringify(response.data.user));
          }
          this.isAuthenticated$.next(true);
        }
      }),
      map(response => !!response?.data?.token),
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * Register a new user
   * POST /api/auth/register
   */
  register(name: string, username: string, password: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      name,
      username,
      password
    }).pipe(
      map(response => ({ success: true, message: response?.meta?.message })),
      catchError(error => {
        const message = error.error?.error || 'Registration failed';
        return of({ success: false, message });
      })
    );
  }

  /**
   * Logout — notify server then clear local session.
   */
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      complete: () => {
        this.clearSession();
      },
      error: () => {
        // Even if the server call fails, clear local session
        this.clearSession();
      }
    });
  }

  private clearSession(): void {
    localStorage.removeItem('soc_token');
    localStorage.removeItem('soc_user');
    this.isAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Get current user info from localStorage (populated at login).
   */
  getCurrentUser(): { id: number; name: string; username: string } | null {
    const raw = localStorage.getItem('soc_user');
    return raw ? JSON.parse(raw) : null;
  }
}
