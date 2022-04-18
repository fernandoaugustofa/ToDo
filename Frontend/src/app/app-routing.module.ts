import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { AuthGuard } from "./Util/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashBoardComponent, pathMatch: 'full',  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
