// ===== components/detailed-view/detailed-view.component.ts =====
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservationService } from '../../services/observation.service';
import { RootObject, DataItem } from '../../models/observation.model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css'],
  imports: [
    CommonModule, 
    MatListModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class DetailedViewComponent implements OnInit {
  observationData!: RootObject;
  selectedData?: DataItem;
  form!: FormGroup;
  isLoading = false;

  constructor(
    private obsService: ObservationService, 
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.obsService.getData().subscribe({
      next: (data) => {
        this.observationData = data[0];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.showNotification('Error loading data', 'error');
        this.isLoading = false;
      }
    });
  }

  onSelect(item: DataItem): void {
    this.selectedData = item;
    const group: any = {};
    
    item.properties.forEach(p => {
      // Add basic validation if needed
      group[p.label] = [p.value, Validators.required];
    });
    
    this.form = this.fb.group(group);
    
    // Add some visual feedback
    this.showNotification(`Selected: ${item.samplingTime}`, 'info');
  }

  onSave(): void {
    if (this.selectedData && this.form.valid) {
      this.isLoading = true;
      const formValues = this.form.value;
      
      // Update the selected data with form values
      this.selectedData.properties.forEach(p => {
        p.value = formValues[p.label];
      });

      this.obsService.saveData(this.observationData).subscribe({
        next: () => {
          this.showNotification('Data saved successfully!', 'success');
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error saving data:', error);
          this.showNotification('Error saving data', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.showNotification('Please fill all required fields', 'warning');
    }
  }

  private showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    const config = {
      duration: 3000,
      horizontalPosition: 'right' as const,
      verticalPosition: 'top' as const,
      panelClass: [`snackbar-${type}`]
    };
    
    this.snackBar.open(message, 'Close', config);
  }

  // Helper method to check if form has changes
  get hasChanges(): boolean {
    return this.form?.dirty || false;
  }

  // Helper method to get form validation errors
  getFieldError(fieldName: string): string | null {
    const field = this.form?.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
    }
    return null;
  }
}
