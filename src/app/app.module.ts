import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
// import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerModule } from '@livereach/ngx-color-picker';
import { WebStorageModule } from '@efaps/ngx-store';
// import { DndListModule } from 'ngx-drag-and-drop-lists';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MaterialModule,
		ColorPickerModule,
		WebStorageModule,
		// DndListModule,
		DragulaModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
