import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JjApp4SharedModule } from 'app/shared/shared.module';
import { JjApp4CoreModule } from 'app/core/core.module';
import { JjApp4AppRoutingModule } from './app-routing.module';
import { JjApp4HomeModule } from './home/home.module';
import { JjApp4EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JjApp4SharedModule,
    JjApp4CoreModule,
    JjApp4HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JjApp4EntityModule,
    JjApp4AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class JjApp4AppModule {}
