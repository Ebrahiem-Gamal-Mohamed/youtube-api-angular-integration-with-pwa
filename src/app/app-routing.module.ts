import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./core/_components/home/home.component";

const routes: Routes = [
  { path: "", redirectTo: "/videos", pathMatch: "full" },
  { path: "", component: HomeComponent },
  {
    path: "videos",
    loadChildren: () =>
      import("./videos/videos.module").then((m) => m.VideosModule),
  },
  { path: "**", redirectTo: "/videos", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
