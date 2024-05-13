import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { GridRow } from '../@types/grid';
import { StorageService } from './storage.service';
import { GRID_DATA } from '../constants/storage-keys';

@Injectable({
	providedIn: 'root'
})
export class WatchlistService {
	private storageService: StorageService = inject(StorageService);

	public getGridData(): Observable<GridRow[] | null> {
		return timer(800).pipe(
			switchMap((): Observable<GridRow[] | null> => {
				return new Observable((observer) => {
					observer.next(this.getGridDataFromStorageAndSort());
				});
			})
		);
	}

	public addSymbol(symbol: GridRow, data: GridRow[]): Observable<GridRow[] | null> {
		return new Observable((observer) => {
			data.push(symbol);
			this.storageService.saveToStorage(GRID_DATA, data);
			observer.next(this.getGridDataFromStorageAndSort());
		});
	}

	public deleteSymbol(id: number, data: GridRow[]): Observable<GridRow[] | null> {
		return new Observable((observer) => {
			const index = data.findIndex(d => d.id === id);
			if(index === -1) {
				return
			}
			data.splice(index, 1)
			this.storageService.saveToStorage(GRID_DATA, data);
			observer.next(this.getGridDataFromStorageAndSort());
		});
	}

	private getGridDataFromStorageAndSort(): GridRow[] {
		return this.storageService.getFromStorage<GridRow[]>(GRID_DATA)?.sort((a,b)=> (a.symbol).localeCompare(b.symbol)) || []
	}
}