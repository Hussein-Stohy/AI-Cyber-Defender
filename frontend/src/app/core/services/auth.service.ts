import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.checkToken());

  constructor(private router: Router) {}

  private checkToken(): boolean {
    return !!localStorage.getItem('soc_token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated$.value;
  }

  getAuthState(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  login(email: string, password: string): Observable<boolean> {
    // Hardcoded mock credentials
    if (email === 'admin@soc.com' && password === '123456') {
      localStorage.setItem('soc_token', 'mock-jwt-token-12345');
      this.isAuthenticated$.next(true);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('soc_token');
    this.isAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }
}
