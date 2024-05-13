import { Component, DestroyRef, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { GridRow } from '../../common/@types/grid';
import { CommonModule } from '@angular/common';
import { symbolData } from '../../common/helpers/symbolsData';
import { SymbolSearchPipe } from '../../common/pipes/symbol-search.pipe';
import { FormsModule } from '@angular/forms';
import { WatchlistService } from '../../common/services/watchlist.service';
import Swal from 'sweetalert2';
import { untilDestroyed } from '../../common/helpers/untilDestroyed';

@Component({
	selector: 'app-edit-watchlist',
	standalone: true,
	imports: [CommonModule, SymbolSearchPipe, FormsModule],
	templateUrl: './edit-watchlist.component.html',
	styleUrl: './edit-watchlist.component.scss'
})
export class EditWatchlistComponent implements OnChanges {
	@Input() mySymbols: GridRow[] = [];
	private destroyRef: DestroyRef = inject(DestroyRef);
	private watchlistService: WatchlistService = inject(WatchlistService);
	public symbolData: GridRow[] = symbolData;
	public searchText: string = '';
	public isLoading = true;

	ngOnChanges(changes: SimpleChanges): void {
		if(!changes['mySymbols'].firstChange) {
			this.isLoading = false;
		}
		
	}

	public addSymbol(item: GridRow): void {
		this.watchlistService.addSymbol(item, this.mySymbols)
			.pipe(untilDestroyed<GridRow[] | null>(this.destroyRef))
			.subscribe((res: GridRow[] | null) => {
				this.mySymbols = res || [];
				Swal.fire({
					title: "Added!",
					text: `${item.symbol} has been added.`,
					icon: "success"
				});
			})
	}

	public deleteSymbol(item: GridRow): void {
		Swal.fire({
			title: "Are you sure?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then((result) => {
			if (result.isConfirmed) {
				this.watchlistService.deleteSymbol(item.id, this.mySymbols)
					.pipe(untilDestroyed<GridRow[] | null>(this.destroyRef))
					.subscribe((res: GridRow[] | null) => {
						this.mySymbols = res || [];
						Swal.fire({
							title: "Deleted!",
							text: `${item.symbol} has been deleted.`,
							icon: "success"
						});
					})
		
			}
		});
	}
}
