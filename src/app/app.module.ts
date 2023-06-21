import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './features/users/user-detail/user-detail.component';
import { UserListingComponent } from './features/users/user-listing/user-listing.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { SharedModule } from './modules/shared.module';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TableComponent } from './components/table/table.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ProductListingComponent } from './features/products/product-listing/product-listing.component';
import { ProductDetailComponent } from './features/products/product-detail/product-detail.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    UserDetailComponent,
    UserListingComponent,
    NotFoundComponent,
    RegisterComponent,
    ServerErrorComponent,
    TestErrorComponent,
    TableComponent,
    TextInputComponent,
    ProductListingComponent,
    ProductDetailComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
