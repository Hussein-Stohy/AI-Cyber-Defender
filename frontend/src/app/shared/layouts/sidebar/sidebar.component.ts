import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col transition-all duration-300" 
           [ngClass]="isCollapsed ? 'w-20' : 'w-64'">
      
      <!-- Logo Section -->
      <div class="p-6 flex items-center justify-between">
        <div class="flex items-center gap-3" *ngIf="!isCollapsed">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">D</span>
          </div>
          <span class="text-white font-bold text-lg tracking-tight">DEFENDER</span>
        </div>
        <button (click)="toggleSidebar()" class="text-neutral-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 mt-6 px-4 space-y-2">
        <a *ngFor="let item of navItems" 
           [routerLink]="item.path" 
           routerLinkActive="bg-primary/10 text-primary border-l-4 border-primary"
           [routerLinkActiveOptions]="{exact: item.exact}"
           class="flex items-center gap-4 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all group">
          <span class="text-xl" [innerHTML]="item.icon"></span>
          <span class="font-medium whitespace-nowrap" *ngIf="!isCollapsed">{{ item.label }}</span>
          
          <!-- Tooltip for collapsed state -->
          <div *ngIf="isCollapsed" class="absolute left-20 bg-neutral-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            {{ item.label }}
          </div>
        </a>
      </nav>

      <!-- Bottom Actions -->
      <div class="p-4 border-t border-neutral-800">
        <a routerLink="/settings" class="flex items-center gap-4 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all">
          <span class="text-xl">⚙️</span>
          <span class="font-medium" *ngIf="!isCollapsed">Settings</span>
        </a>
      </div>
    </aside>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SidebarComponent {
  isCollapsed = false;

  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊', exact: true },
    { label: 'Attacks', path: '/attacks', icon: '⚔️', exact: false },
    { label: 'Live Alerts', path: '/live', icon: '📡', exact: true },
    { label: 'Statistics', path: '/statistics', icon: '📈', exact: true }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
