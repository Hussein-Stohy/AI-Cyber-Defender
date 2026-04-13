import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AttackService } from '../../../core/services/attack.service';
import { Attack, AttackFilters } from '../../../core/models/attack.model';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-attacks-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-6 pb-12">
      <!-- Header & Filters -->
      <header class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
        <div class="space-y-1">
          <h1 class="text-3xl font-bold text-white">Attacks Log</h1>
          <p class="text-neutral-400">Manage and analyze detected security incidents.</p>
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <!-- Search -->
          <div class="relative flex-1 md:w-64">
            <input type="text" 
                   [(ngModel)]="filters.search"
                   (ngModelChange)="onFilterChange()"
                   placeholder="Search IP or Type..." 
                   class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary transition-all">
            <span class="absolute left-3 top-2.5 text-neutral-500">🔍</span>
          </div>

          <!-- Severity Filter -->
          <select [(ngModel)]="filters.severity" 
                  (ngModelChange)="onFilterChange()"
                  class="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary cursor-pointer">
            <option value="">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <!-- Status Filter -->
          <select [(ngModel)]="filters.status" 
                  (ngModelChange)="onFilterChange()"
                  class="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary cursor-pointer">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
            <option value="mitigated">Mitigated</option>
          </select>
        </div>
      </header>

      <!-- Table Section -->
      <div class="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-neutral-800/50 text-neutral-400 text-[10px] uppercase tracking-widest font-black">
              <tr>
                <th class="px-6 py-5">Attack ID</th>
                <th class="px-6 py-5">Type</th>
                <th class="px-6 py-5 text-center">Severity</th>
                <th class="px-6 py-5">Source IP</th>
                <th class="px-6 py-5 text-center">Status</th>
                <th class="px-6 py-5">Timestamp</th>
                <th class="px-6 py-5 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-800/50 text-sm">
              <tr *ngFor="let attack of pagedAttacks" class="hover:bg-neutral-800/30 transition-all group">
                <td class="px-6 py-4 font-mono text-neutral-500 group-hover:text-primary transition-colors text-xs">
                  {{ attack.id }}
                </td>
                <td class="px-6 py-4 font-bold text-white">
                  {{ attack.type }}
                </td>
                <td class="px-6 py-4 text-center">
                  <span [ngClass]="getSeverityClasses(attack.severity)" 
                        class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border">
                    {{ attack.severity }}
                  </span>
                </td>
                <td class="px-6 py-4 font-mono text-neutral-300">
                  {{ attack.ip }}
                </td>
                <td class="px-6 py-4 text-center">
                  <span [ngClass]="getStatusClasses(attack.status)" 
                        class="px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all">
                    {{ attack.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-neutral-500 text-xs tabular-nums">
                  {{ attack.timestamp | date:'yyyy-MM-dd HH:mm:ss' }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button [routerLink]="['/attacks', attack.id]" 
                     class="text-primary hover:text-white bg-primary/10 hover:bg-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm">
                    View Details
                  </button>
                </td>
              </tr>

              <!-- Empty State -->
              <tr *ngIf="pagedAttacks.length === 0">
                <td colspan="7" class="px-6 py-20 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <span class="text-4xl opacity-20">🛡️</span>
                    <p class="text-neutral-500 font-medium">No alerts found matching your filters.</p>
                    <button (click)="resetFilters()" class="text-primary font-bold text-xs hover:underline uppercase tracking-widest">Clear all filters</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div class="bg-neutral-900 border-t border-neutral-800 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="text-xs text-neutral-500 font-medium">
            Showing <span class="text-white">{{ getStartIndex() + 1 }}</span> to <span class="text-white">{{ getEndIndex() }}</span> of <span class="text-white">{{ filteredCount }}</span> logs
          </div>
          <div class="flex gap-2">
            <button (click)="prevPage()" 
                    [disabled]="currentPage === 1"
                    class="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all border border-neutral-700">
              Previous
            </button>
            <div class="flex items-center gap-1 px-4 text-xs font-mono text-neutral-400">
               Page {{ currentPage }}
            </div>
            <button (click)="nextPage()" 
                    [disabled]="currentPage >= totalPages"
                    class="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all border border-neutral-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    select {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  `]
})
export class AttacksListPage implements OnInit {
  attacks: Attack[] = [];
  filteredAttacks: Attack[] = [];
  pagedAttacks: Attack[] = [];

  filters: AttackFilters = {
    search: '',
    severity: '',
    status: ''
  };

  pageSize = 10;
  currentPage = 1;
  filteredCount = 0;
  totalPages = 1;

  constructor(private attackService: AttackService) {}

  ngOnInit(): void {
    this.attackService.getAttacks().subscribe(data => {
      this.attacks = data;
      this.applyFilters();
    });
  }

  onFilterChange() {
    this.currentPage = 1; // Reset to first page
    this.applyFilters();
  }

  applyFilters() {
    this.filteredAttacks = this.attacks.filter(a => {
      const matchesSearch = !this.filters.search || 
        a.ip.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        a.type.toLowerCase().includes(this.filters.search.toLowerCase());
      
      const matchesSeverity = !this.filters.severity || a.severity === this.filters.severity;
      const matchesStatus = !this.filters.status || a.status === this.filters.status;

      return matchesSearch && matchesSeverity && matchesStatus;
    });

    this.filteredCount = this.filteredAttacks.length;
    this.totalPages = Math.ceil(this.filteredCount / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.getStartIndex();
    const end = this.getEndIndex();
    this.pagedAttacks = this.filteredAttacks.slice(start, end);
  }

  getStartIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  getEndIndex() {
    return Math.min(this.currentPage * this.pageSize, this.filteredCount);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  resetFilters() {
    this.filters = { search: '', severity: '', status: '' };
    this.onFilterChange();
  }

  getSeverityClasses(severity: string) {
    switch(severity) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  }

  getStatusClasses(status: string) {
    switch(status) {
      case 'active': return 'bg-red-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      case 'mitigated': return 'bg-primary text-white';
      default: return 'bg-neutral-800 text-neutral-400';
    }
  }
}
