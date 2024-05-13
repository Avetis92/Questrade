import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './common/services/storage.service';
import { GRID_DATA } from './common/constants/storage-keys';
import { initialData } from './common/helpers/gridInitialData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	public title = 'questrade';
	private storageService: StorageService = inject(StorageService)

	ngOnInit(): void {
		this.dataInit();
	}

	private dataInit(): void {
		this.storageService.getFromStorage(GRID_DATA) || this.storageService.saveToStorage(GRID_DATA, initialData)
	}
}
