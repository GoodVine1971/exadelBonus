import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AddBonusComponent } from './features/add-bonus/add-bonus.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { roles: ['user', 'moderator', 'admin'] } },
      { path: 'history', redirectTo: 'home', data: { roles: ['user', 'moderator', 'admin'] } },
      { path: 'add-bonus', component: AddBonusComponent, data: { roles: ['moderator', 'admin'] } },
      { path: 'statistics', redirectTo: 'home', data: { roles: ['admin'] } },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
