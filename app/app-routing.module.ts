import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { RegisterComponent } from './register/register.component';
import { PurchasePageComponent } from './purchase-page/purchase-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "shopping/:name", component: ShoppingPageComponent },
  { path: "purchase/:name", component: PurchasePageComponent },
  { path: "admin", component: AdminPageComponent},
  { path: "forgetPassword", component: ForgetPasswordPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
