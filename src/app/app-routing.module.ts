import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "chat",
    loadChildren: () => import('./ui-component2/ui-component2.module').then( m => m.UiComponent2PageModule)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./sign-up/sign-up.module").then(m => m.SignUpPageModule)
  },
  {
    path: 'sign-up-form',
    loadChildren: () => import('./sign-up-form/sign-up-form.module').then( m => m.SignUpFormPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },  {
    path: 'preventions',
    loadChildren: () => import('./preventions/preventions.module').then( m => m.PreventionsPageModule)
  },
  {
    path: 'spot-ragging',
    loadChildren: () => import('./spot-ragging/spot-ragging.module').then( m => m.SpotRaggingPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
