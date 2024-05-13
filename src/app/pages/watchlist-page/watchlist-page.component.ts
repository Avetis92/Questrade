import { Component, DestroyRef, inject } from '@angular/core';
import { WatchlistComponent } from '../../components/watchlist/watchlist.component';
import { GridRow } from '../../common/@types/grid';
import { WatchlistService } from '../../common/services/watchlist.service';
import { Observable } from 'rxjs';
import { untilDestroyed } from '../../common/helpers/untilDestroyed';
import { EditWatchlistComponent } from '../../components/edit-watchlist/edit-watchlist.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [WatchlistComponent, EditWatchlistComponent, CommonModule],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
})
export class WatchlistPageComponent {
	private watchlistService: WatchlistService = inject(WatchlistService);
	private destroyRef: DestroyRef = inject(DestroyRef);
	public gridData$: Observable<GridRow[] | null> = this.watchlistService.getGridData().pipe(untilDestroyed<GridRow[] | null>(this.destroyRef));
	public showGrid = true;

	public editWatchlistHandler(): void {
		this.showGrid = !this.showGrid
	}
}
