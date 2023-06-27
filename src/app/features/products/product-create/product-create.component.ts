import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { createCategoryOption } from 'src/app/models/options';
import { CacheService } from 'src/app/services/cache.service';
import { numberArrayValidator, pricePattern } from 'src/app/utils/validator';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  createProductForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  createCategoryOption = createCategoryOption;
  product: Product | undefined;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private cacheService: CacheService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.initializeForm();
  }

  initializeForm() {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required, Validators.maxLength(30)],
      description: ['', Validators.required, Validators.maxLength(100)],
      price: ['', Validators.pattern(pricePattern)],
      categoryIds: ['', Validators.required, numberArrayValidator],
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  selectCategoryOptions(selectedCategoryIds: number[]) {
    this.createProductForm?.controls['categoryIds']?.setValue(selectedCategoryIds);
  }

  create() {
    this.productService.createProduct(this.createProductForm.value).subscribe({
      next: () => {
        this.toastr.success('Successfully Created');
        this.cacheService.clearKey('products');
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  submitForm() {
    if (this.createProductForm.valid) {
      this.create();
    }
  }
}
