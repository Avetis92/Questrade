import { Pipe, PipeTransform } from '@angular/core';
import { GridRow } from '../@types/grid';

@Pipe({
  name: 'symbolSearch',
  standalone: true
})
export class SymbolSearchPipe implements PipeTransform {

  transform(allSymbols: GridRow[], searchtext: string, mySymbols: GridRow[]): GridRow[] {
	if(!searchtext) {
		return [];
	}
	const text = searchtext.toLowerCase();
	const filteredSymbols = allSymbols.filter((s) => !mySymbols.map((my) => my.id).includes(s.id))
	return filteredSymbols.filter((s) => 
		s.symbol.toLowerCase().includes(text)
	)
  }
}
