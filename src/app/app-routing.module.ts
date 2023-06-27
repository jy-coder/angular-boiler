import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { UserDetailComponent } from './features/users/user-detail/user-detail.component';
import { UserListingComponent } from './features/users/user-listing/user-listing.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { RegisterComponent } from './features/register/register.component';
import { authGuard } from './guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ProductListingComponent } from './features/products/product-listing/product-listing.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { ProductCreateComponent } from './features/products/product-create/product-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'error', component: TestErrorComponent },
  // { path: 'server-error', component: ServerErrorComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'users', component: UserListingComponent, canActivate: [authGuard] },
      { path: 'user/:id', component: UserDetailComponent, canActivate: [authGuard] },
      { path: 'products', component: ProductListingComponent, canActivate: [authGuard] },
      { path: 'product/create', component: ProductCreateComponent, canActivate: [authGuard] },
      { path: 'product/:id', component: ProductDetailComponent, canActivate: [authGuard] },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
