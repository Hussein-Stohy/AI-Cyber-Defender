import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="h-screen bg-neutral-950 flex flex-col items-center justify-center text-center p-8">
      <h1 class="text-9xl font-black text-primary/20 absolute select-none">404</h1>
      <div class="relative">
         <div class="text-6xl mb-4">🛡️</div>
         <h2 class="text-4xl font-bold text-white mb-2">Access Denied / Not Found</h2>
         <p class="text-neutral-500 max-w-md mx-auto mb-8">
           The page you are looking for has been moved, deleted, or you don't have the necessary clearance to view it.
         </p>
         <a routerLink="/dashboard" class="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-all">
           Return to Safety
         </a>
      </div>
    </div>
  `
})
export class NotFoundPage {}
