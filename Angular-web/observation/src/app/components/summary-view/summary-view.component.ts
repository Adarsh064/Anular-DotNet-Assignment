// ===== components/summary-view/summary-view.component.ts =====
import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../../services/observation.service';
import { RootObject, DataItem } from '../../models/observation.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-summary-view',
  standalone: true,
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
  imports: [
    MatTableModule, 
    CommonModule, 
    MatIconModule, 
    MatProgressSpinnerModule
  ]
})
export class SummaryViewComponent implements OnInit {
  observationData: RootObject[] = [];
  flatDataItems: DataItem[] = [];
  isLoading = false;
  error: string | null = null;
  
  // Table columns to display
  displayedColumns: string[] = ['samplingTime', 'properties'];

  constructor(private obsService: ObservationService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.obsService.getData().subscribe({
      next: (data) => {
        this.observationData = data;
        this.flatDataItems = data.flatMap(d => d.datas);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading summary data:', error);
        this.error = 'Failed to load observation data';
        this.isLoading = false;
      }
    });
  }

  // Helper method to get property count for a data item
  getPropertyCount(item: DataItem): number {
    return item.properties?.length || 0;
  }

  // Helper method to format sampling time if needed
  formatSamplingTime(samplingTime: string): string {
    // Add any date formatting logic here if needed
    return samplingTime;
  }

  // Method to refresh data
  refreshData(): void {
    this.loadData();
  }

  // Method to track table rows for performance
  trackByFn(index: number, item: DataItem): any {
    return item.samplingTime || index;
  }
}
