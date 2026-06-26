import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { authGuard } from './auth/auth-guard';
import { PostPage } from './pages/post/post-page';
import { Profile } from './pages/profile/profile';
import { Settings } from './pages/settings/settings';
import { Admin } from './pages/admin/admin';
import { adminGuard } from './auth/admin-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'settings', component: Settings, canActivate: [authGuard] },
    { path: 'user/:nickname', component: Profile, canActivate: [authGuard] },
    { path: 'post/:id', component: PostPage, canActivate: [authGuard] },
    { path: 'post/:id/comments', component: PostPage, canActivate: [authGuard] },
    { path: 'admin', component: Admin, canActivate: [adminGuard] }
];
