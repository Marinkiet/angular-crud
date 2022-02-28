import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  ProductStateList = ["Good", 'Excellent', 'Supurb'];
  productForm !: FormGroup;
  //initially to save then on click change to update
  actionBtn:string = "Save";
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      pname: ['', Validators.required],
      pstate: ['', Validators.required],
      pdate: ['', Validators.required],
      pprice: ['', Validators.required],
      pcategory: ['', Validators.required],
      pdescription: ['', Validators.required],

    });
   // console.log(this.editData);
   //path values
   if(this.editData){
     this.actionBtn = "Update";
     this.productForm.controls['pname'].setValue(this.editData.pname);
     this.productForm.controls['pstate'].setValue(this.editData.pstate);
     this.productForm.controls['pdate'].setValue(this.editData.pdate);
     this.productForm.controls['pprice'].setValue(this.editData.pprice);
     this.productForm.controls['pcategory'].setValue(this.editData.pcategory);
     this.productForm.controls['pdescription'].setValue(this.editData.pdescription);

   }
  }
  saveProduct() {
    if(!this.editData){
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
    }else{
      this.updateTheProduct();
  }
}
updateTheProduct(){
this.api.updateProduct(this.productForm.value, this.editData.id)
.subscribe({
  next:(res)=>{
    alert('Product updated successfully');
    this.productForm.reset();
    this.dialogRef.close('Updated');
  },
  error:()=>{
    alert('Error while updating');
  }
})
}
}
