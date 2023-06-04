import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oms-2023';
  dataSource!: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog,
    private backendService: BackendService) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  openOrderDialog() {
    this.dialog.open(OrderDialogComponent, { width: '30%' });
  }

  getAllOrders() {
    this.backendService.getOrder()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response)
          console.log(this.dataSource.data)  //to check the fetched data
        },
        error: () => {
          alert('Error while getting orders')
        }
      })
  }
}
