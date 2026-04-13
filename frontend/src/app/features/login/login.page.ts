import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <!-- Background Glows -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div class="w-full max-w-md relative">
        <!-- Brand/Logo -->
        <div class="text-center mb-10">
          <div class="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg shadow-primary/5">
            🛡️
          </div>
          <h1 class="text-2xl font-black text-white uppercase tracking-tighter">SOC Access Control</h1>
          <p class="text-neutral-500 text-sm mt-1">Authorized security personnel only</p>
        </div>

        <!-- Login Card -->
        <div class="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 p-8 rounded-[2rem] shadow-2xl">
          <form (submit)="onSubmit()" class="space-y-6">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 ml-1">Work Email</label>
              <input type="email" 
                     name="email"
                     [(ngModel)]="credentials.email"
                     required
                     placeholder="admin@soc.com"
                     class="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-primary transition-all">
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 ml-1">Access Password</label>
              <input type="password" 
                     name="password"
                     [(ngModel)]="credentials.password"
                     required
                     placeholder="••••••••"
                     class="w-full bg-black/40 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-primary transition-all">
            </div>

            <div *ngIf="errorMessage" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-bold text-center animate-shake">
               {{ errorMessage }}
            </div>

            <button type="submit" 
                    [disabled]="isLoading"
                    class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
               <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
               {{ isLoading ? 'Verifying Credentials...' : 'Sign In to Command Center' }}
            </button>
          </form>

          <div class="mt-8 text-center border-t border-neutral-800/50 pt-6">
             <p class="text-[10px] text-neutral-600 font-bold uppercase tracking-widest leading-loose">
               Protocol: AES-256 Encrypted Session<br>
               IP: Authenticating Gateway
             </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }
  `]
})
export class LoginPage {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    // Artificial delay to simulate real auth
    setTimeout(() => {
      this.authService.login(this.credentials.email, this.credentials.password).subscribe(success => {
        this.isLoading = false;
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Authentication failed. Please check your credentials.';
        }
      });
    }, 1200);
  }
}
