import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent {
  trackingStatus = [
    'Picked up',
    'On delivery',
    'Received',
    'Payment Success'
  ]

  orderForm !: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private dialogRef: MatDialogRef<OrderDialogComponent>) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      trackingNumber: ['', Validators.required],
      receiver: ['', Validators.required],
      pickupDate: ['', Validators.required],
      address: ['', Validators.required],
      paymentType: ['', Validators.required],
      price: ['', Validators.required],
      trackingStatus: ['', Validators.required],
    })
  }

  createOrder() {
    //creating order
    console.log(this.orderForm.value)

    if (this.orderForm.valid) {
      this.backendService.postOrder(this.orderForm.value)
        .subscribe({
          next: () => {
            alert('Order added successfully')  //to show aleat message when it saved
            this.orderForm.reset()
            this.dialogRef.close('save')
          },
          error: () => {
            alert("Error while adding the order")
          },
        })
    }
  }
  
}
