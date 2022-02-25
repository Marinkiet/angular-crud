import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  ProductStateList = ["Good", 'Excellent', 'Supurb'];
  productForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      pname: ['', Validators.required],
      pstate: ['', Validators.required],
      pdate: ['', Validators.required],
      pprice: ['', Validators.required],
      pcategory: ['', Validators.required],
      pdescription: ['', Validators.required],

    })
  }
  saveProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next: () => {
            alert("Product Added Successfully");
            this.productForm.reset();
            this.dialogRef.close('Saved');
          },
          error: () => {
            alert("Error in adding product")
          }

        })
    }
  }

}
