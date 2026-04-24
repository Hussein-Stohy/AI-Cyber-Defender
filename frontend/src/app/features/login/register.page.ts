import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#050505] flex flex-col relative overflow-hidden">
      <!-- Premium Background: Tactical Grid + Glows -->
      <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute inset-0 opacity-10" 
             style="background-image: linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px); background-size: 40px 40px;">
        </div>
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full"></div>
      </div>

      <!-- Navigation -->
      <nav class="relative z-50 flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto w-full">
        <div class="flex items-center gap-3 group cursor-pointer" routerLink="/">
           <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
           <span class="text-lg font-black uppercase tracking-tighter text-white">Defender<span class="text-primary">.AI</span></span>
        </div>
        <a routerLink="/" class="text-xs font-bold text-neutral-500 hover:text-white transition-all uppercase tracking-widest">Back to Home</a>
      </nav>

      <div class="flex-1 flex items-center justify-center p-6 relative z-10">
        <div class="w-full max-w-md">
          <!-- Brand/Logo (Simplified) -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-black text-white tracking-tight">Create Account</h1>
            <p class="text-neutral-500 text-sm mt-2 font-medium">Join the neural tactical network</p>
          </div>

        <!-- Register Card -->
        <div class="bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          <form (submit)="onSubmit()" #registerForm="ngForm" class="space-y-5">
            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 ml-1">Full Name</label>
              <input type="text" 
                     name="name"
                     [(ngModel)]="user.name"
                     required
                     placeholder="John Doe"
                     class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 ml-1">Username</label>
              <input type="text" 
                     name="username"
                     [(ngModel)]="user.username"
                     required
                     placeholder="analyst_01"
                     class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
            </div>

            <div>
              <label class="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 ml-1">Access Password</label>
              <input type="password" 
                     name="password"
                     [(ngModel)]="user.password"
                     required
                     minlength="6"
                     placeholder="••••••••"
                     class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
              <p class="text-[9px] text-neutral-600 mt-2 ml-1 uppercase font-bold tracking-wider">Min. 6 characters required</p>
            </div>

            <div *ngIf="errorMessage" class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold text-center animate-shake">
               {{ errorMessage }}
            </div>

            <div *ngIf="successMessage" class="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-xs font-bold text-center">
               {{ successMessage }}
            </div>

            <button type="submit" 
                    [disabled]="isLoading || !registerForm.valid"
                    class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
               <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
               {{ isLoading ? 'Generating Identity...' : 'Establish Account' }}
            </button>
          </form>

          <div class="mt-8 text-center pt-6 border-t border-white/5">
             <p class="text-sm text-neutral-400 font-medium">
               Already have an account? 
               <a routerLink="/login" class="text-primary hover:underline font-bold transition-all">Login</a>
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
export class RegisterPage {
  user = {
    name: '',
    username: '',
    password: ''
  };
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.user.name, this.user.username, this.user.password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.successMessage = 'Account created successfully! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = 'Registration failed. Username might already be taken.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Connection error. Please try again later.';
      }
    });
  }
}
