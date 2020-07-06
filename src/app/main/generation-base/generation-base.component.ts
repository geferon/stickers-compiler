import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { LocalStorage } from '@efaps/ngx-store';

class ImageItem {
	type: 'image' | 'empty';
	image?: File;
	imageURL?: SafeUrl;
}

enum BackgroundType {
	FlatBackground = 1,
	GradientTopBottom = 2,
	GradientLeftRight = 3,
	GradientTopLeftBottomRight = 4,
	GradientTopRightBottomLeft = 5
}

@Component({
	selector: 'app-generation-base',
	templateUrl: './generation-base.component.html',
	styleUrls: ['./generation-base.component.scss']
})
export class GenerationBaseComponent implements OnInit {
	@ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
	@ViewChild(CdkDropList) placeholder: CdkDropList;

	@ViewChild('imageholder') imageholder: ElementRef;

	public backgroundTypesGradientKeys = {
		[BackgroundType.GradientLeftRight]: 'to right',
		[BackgroundType.GradientTopBottom]: 'to bottom',
		[BackgroundType.GradientTopLeftBottomRight]: 'to bottom right',
		[BackgroundType.GradientTopRightBottomLeft]: 'to bottom left',
	};

	public target: CdkDropList;
	public targetIndex: number;
	public source: CdkDropList;
	public sourceIndex: number;

	public generatedImage: string;

	constructor(
		private sanitizer: DomSanitizer
	) { }

	public BackgroundTypes = BackgroundType;

	@LocalStorage({ mutate: true })
	public SettingsExpanded = false;

	@LocalStorage({ mutate: true })
	public GridWidth = 3;
	@LocalStorage({ mutate: true })
	public GridHeight = 2;
	@LocalStorage({ mutate: true })
	public ItemsMargin = 12;
	@LocalStorage({ mutate: true })
	public BackgroundColor = '#66608E';
	@LocalStorage({ mutate: true })
	public ItemBackgroundColor = '#958EC4';
	@LocalStorage({ mutate: true })
	public ItemsMaxSize = 512;

	@LocalStorage({ mutate: true })
	public BackgroundType: BackgroundType = BackgroundType.FlatBackground;
	@LocalStorage({ mutate: true })
	public ItemBackgroundType: BackgroundType = BackgroundType.FlatBackground;
	@LocalStorage({ mutate: true })
	public BackgroundSecondaryColors: string[] = ['#66608E'];
	@LocalStorage({ mutate: true })
	public ItemBackgroundSecondaryColors: string[] = ['#958EC4'];

	public ImageItems: ImageItem[] = [];

	// Utils
	public floor = Math.floor;
	public GridPixelsWidth(): number {
		return this.GridWidth * this.ItemsMaxSize + (this.GridWidth - 1) * this.ItemsMargin
	}
	public GridPixelsHeight(): number {
		return this.GridHeight * this.ItemsMaxSize + (this.GridHeight - 1) * this.ItemsMargin
	}

	ngOnInit(): void {
		let total = this.GridWidth * this.GridHeight;
		for (let i = 0; i < total; i++) {
			this.ImageItems.push({
				type: 'empty'
			});
		}
	}

	onSizeChanged() {
		let total = this.GridWidth * this.GridHeight;
		if (this.ImageItems.length > total) {
			this.ImageItems.splice(total, this.ImageItems.length - total);
		} else if (this.ImageItems.length < total) {
			let toInsert = total - this.ImageItems.length;
			for (let i = 0; i < toInsert; i++) {
				this.ImageItems.push({
					type: 'empty'
				});
			}
		}
	}

	imageUpdated(event: Event) {
		let files: File[] = [...event.target['files']];
		this.insertFiles(files);
	}

	insertFiles(files: File[]) {
		if (files.length > 0) {
			for (let item of this.ImageItems) {
				if (item.type == 'empty') {
					item.type = 'image';
					item.image = files.shift();
					item.imageURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(item.image));

					if (files.length == 0) {
						break;
					}
				}
			}
		}

		if (files.length > 0) {
			// console.log("There are images that couldn't be added!");
			// Automatically add another row
			this.GridHeight++;
			this.onSizeChanged();
			this.insertFiles(files);
		}
	}

	// public itemDropped(event: CdkDragDrop<ImageItem[]>) {
	// 	moveItemInArray(this.ImageItems, event.previousIndex, event.currentIndex);
	// }

	public deleteImageItem(item: ImageItem) {
		item.type = 'empty';
		delete item.image;
		delete item.imageURL;
	}

	public async generateImage() {
		try {
			// let result: HTMLCanvasElement = await html2canvas(this.imageholder.nativeElement);
			// let result: HTMLCanvasElement = await html2canvas(this.imageholder.nativeElement, {
			// 	letterRendering: 1,
			// 	allowTaint: true,
			// 	logging: true
			// });

			// this.imageholder.nativeElement = result;

			let result = await domtoimage.toPng(this.imageholder.nativeElement);
			// this.generatedImage = result.toDataURL("image/png");
			this.generatedImage = result;
		} catch (err) {
			console.log("Error?");
		}
	}

	public getGenericBackground(): string {
		if (this.BackgroundType == BackgroundType.FlatBackground) {
			return null;
		}

		return `linear-gradient(${this.backgroundTypesGradientKeys[this.BackgroundType]}, ${[this.BackgroundColor, ...this.BackgroundSecondaryColors].join(', ')})`;
	}

	public getItemBackground(id: number, item: ImageItem): string {
		if (this.ItemBackgroundType == BackgroundType.FlatBackground) {
			return null;
		}

		return `linear-gradient(${this.backgroundTypesGradientKeys[this.ItemBackgroundType]}, ${[this.ItemBackgroundColor, ...this.ItemBackgroundSecondaryColors].join(', ')})`;
	}

}
