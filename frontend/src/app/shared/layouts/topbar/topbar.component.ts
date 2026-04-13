import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-8">
      <!-- Search Bar -->
      <div class="flex-1 max-w-xl">
        <div class="relative group">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500 group-focus-within:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input type="text" 
                 placeholder="Search for attacks, IPs, or events..." 
                 class="w-full bg-neutral-800/50 border border-neutral-700 rounded-full py-2 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
        </div>
      </div>

      <!-- User Actions -->
      <div class="flex items-center gap-6">
        <!-- Status Indicator -->
        <div class="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-xs font-semibold text-green-500 uppercase tracking-tighter">System Protected</span>
        </div>

        <!-- Notifications -->
        <button class="relative text-neutral-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-neutral-900">3</span>
        </button>

        <!-- Logout Button -->
        <button (click)="logout()" 
                title="Secure Logout"
                class="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-neutral-400 hover:text-red-500 transition-all active:scale-95 group">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
           </svg>
        </button>

        <!-- User Profile -->
        <div class="flex items-center gap-3 pl-6 border-l border-neutral-800">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold text-white">Hussein Stohy</p>
            <p class="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Security Lead</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 p-0.5">
             <div class="w-full h-full rounded-full bg-primary flex items-center justify-center text-white font-bold">HS</div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class TopbarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
