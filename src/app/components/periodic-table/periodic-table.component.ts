import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { PeriodicElement } from '../../interfaces';
import { ELEMENT_DATA } from '../../consts';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class PeriodicTableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isLoading = true;
  isFiltering = false;
  showSearchingMessage = false;
  private filterTimeout: any;
  private searchTimeout: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.isFiltering = true;
    }, 1000);

    this.filterTimeout = setTimeout(() => {
      this.dataSource.filterPredicate = (
        data: PeriodicElement,
        filter: string
      ) => {
        const dataStr =
          data.position +
          ' ' +
          data.name +
          ' ' +
          data.weight +
          ' ' +
          data.symbol;
        return dataStr.toLowerCase().includes(filter);
      };
      this.dataSource.filter = filterValue;
      this.isFiltering = false;
    }, 2000);
  }

  noDataAfterFilter(): boolean {
    return this.dataSource.filteredData.length === 0;
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateDataSource(result);
      }
    });
  }

  private updateDataSource(updatedElement: PeriodicElement): void {
    const updatedData = this.dataSource.data.map((element) =>
      element.position === updatedElement.position ? updatedElement : element
    );

    this.dataSource = new MatTableDataSource(updatedData);
  }
}
