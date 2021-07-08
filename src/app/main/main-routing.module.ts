import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'reglas' },
      { path: 'reglas', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
      { path: 'alertas', loadChildren: () => import('./pages/alertas/alertas.module').then(m => m.AlertasModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
