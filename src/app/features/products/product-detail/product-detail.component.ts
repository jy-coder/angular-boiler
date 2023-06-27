import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { createCategoryOption } from 'src/app/models/options';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  model: any = {};
  product: Product | undefined;
  editProductForm: FormGroup = new FormGroup({});
  categories: Category[] = [];
  selectedIds: number[] = [];
  selectedNames: string[] = [];
  mappedCategories: Record<number, string> = [];
  isDataLoaded = false;
  createCategoryOption = createCategoryOption;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private cacheService: CacheService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  initializeForm() {
    // set default value
    this.editProductForm = this.fb.group({
      name: [this.product?.name, Validators.required],
      description: [this.product?.description, Validators.required],
      price: [this.product?.price, Validators.required],
      categoryIds: [this.selectedIds, Validators.required],
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
        this.loadCategories();
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
        this.cacheService.clearKey('products');
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  submitForm() {
    if (this.editProductForm.valid) {
      this.update(this.product?.id || 0);
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.mappedCategories = categories.reduce((result, item) => {
          result[item.id || 0] = item.name;
          return result;
        }, {} as Record<number, string>);

        this.selectedIds = this.product?.categories?.map((c) => c.id) as number[];
        this.selectedNames = this.selectedIds?.map((id) => this.mappedCategories[id]);
        this.initializeForm();
        this.isDataLoaded = true;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  selectCategoryOptions(selectedCategoryIds: number[]) {
    this.selectedIds = selectedCategoryIds;
    this.selectedNames = selectedCategoryIds.map((id) => this.mappedCategories[id]);
    this.editProductForm?.controls['categoryIds']?.setValue(selectedCategoryIds);
  }
}
