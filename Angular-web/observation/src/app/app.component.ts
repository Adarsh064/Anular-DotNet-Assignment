// ===== app.component.ts =====
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    SummaryViewComponent,
    DetailedViewComponent
  ]
})
export class AppComponent implements OnInit {
  title = 'observation-app';
  activeTabIndex = 0;
  isLoading = false;

  constructor() {}

  ngOnInit(): void {
    // Any initialization logic
    this.initializeApp();
  }

  private initializeApp(): void {
    // Add any app initialization logic here
    console.log('Observation Management System initialized');
  }

  // Method to handle tab changes
  onTabChange(event: any): void {
    this.activeTabIndex = event.index;
    console.log(`Switched to tab: ${event.index}`);
  }

  // Method to get current tab label
  getCurrentTabLabel(): string {
    return this.activeTabIndex === 0 ? 'Summary View' : 'Detailed View';
  }
}