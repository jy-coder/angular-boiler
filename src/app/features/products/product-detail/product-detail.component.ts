import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  model: any = {};
  product: Product | undefined;
  editProductForm: FormGroup = new FormGroup({});

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  initializeForm() {
    this.editProductForm = this.fb.group({
      description: [this.product?.description, Validators.required],
      price: [this.product?.price, Validators.required],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { notMatching: true };
    };
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.productService.getProduct(parseInt(id)).subscribe({
      next: (product) => {
        this.product = product;
        this.initializeForm();
      },
    });
  }

  update(id: number) {
    if (!id) {
      return;
    }
    this.productService.editProduct(id, this.editProductForm.value).subscribe({
      next: () => {
        this.toastr.success('Successfully edit');
      },
      error: (error) => {
        this.toastr.error(error.error);
        console.log(error);
      },
    });
  }
}
