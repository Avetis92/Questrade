import { AgGridAngular } from '@ag-grid-community/angular';
import { Component, Input } from '@angular/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { GridRow } from '../../common/@types/grid';
import { columns } from '../../common/helpers/gridCloumns';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [
	CommonModule, 
	AgGridAngular,
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {
	@Input() rowData!: GridRow[] | null
	public columnDefs: Record<string, string>[] = columns;
}
