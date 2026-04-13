import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, TopbarComponent],
  template: `
    <div class="flex h-screen bg-neutral-950 text-white overflow-hidden">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>

      <!-- Main Section -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <!-- Topbar -->
        <app-topbar></app-topbar>

        <!-- Dynamic Content Area -->
        <main class="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div class="max-w-7xl mx-auto">
             <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #444;
    }
  `]
})
export class MainLayoutComponent {}
