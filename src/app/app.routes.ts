import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { AboutComponent } from './components/about/about.component';
import { CreateBinComponent } from './components/create-bin/create-bin.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ViewSnippetsComponent } from './components/view-snippets/view-snippets.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createBin', component: CreateBinComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: '', component: HomeComponent },
  { path: 'snippet/:id', component: ViewSnippetsComponent },
  { path: '**', component: NotFound404Component },
];
