import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl font-bold">Security Statistics</h1>
        <p class="text-neutral-400 mt-1">Deep dive into historical data and trends.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 h-80 flex items-center justify-center">
           <p class="text-neutral-500 italic">Attack Distribution Chart Placeholder</p>
        </div>
        <div class="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 h-80 flex items-center justify-center">
           <p class="text-neutral-500 italic">Severity Trends Chart Placeholder</p>
        </div>
      </div>
    </div>
  `
})
export class StatisticsPage {}
