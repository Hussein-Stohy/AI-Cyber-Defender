import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl font-bold">Settings</h1>
        <p class="text-neutral-400 mt-1">Configure your defense systems and account.</p>
      </header>

      <div class="bg-neutral-900 rounded-2xl border border-neutral-800 divide-y divide-neutral-800">
        <div class="p-6 flex justify-between items-center">
           <div>
              <p class="font-bold">Notifications</p>
              <p class="text-xs text-neutral-500">Get alerted for high-severity threats.</p>
           </div>
           <div class="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
              <div class="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
           </div>
        </div>
        <div class="p-6 flex justify-between items-center">
           <div>
              <p class="font-bold">Dark Mode</p>
              <p class="text-xs text-neutral-500">Toggle dark theme for the interface.</p>
           </div>
           <div class="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
              <div class="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  `
})
export class SettingsPage {}
