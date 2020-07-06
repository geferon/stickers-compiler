import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerationBaseComponent } from './generation-base/generation-base.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerModule } from '@livereach/ngx-color-picker';
import { DndListModule } from 'ngx-drag-and-drop-lists';
import { DragulaModule } from 'ng2-dragula';
import { WebStorageModule } from '@efaps/ngx-store';



@NgModule({
	declarations: [GenerationBaseComponent],
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		FlexLayoutModule,
		ColorPickerModule,
		WebStorageModule,
		// DndListModule,
		DragulaModule,
		RouterModule.forChild([
			{
				path: '',
				pathMatch: 'full',
				component: GenerationBaseComponent
			}
		])
	]
})
export class MainModule { }
