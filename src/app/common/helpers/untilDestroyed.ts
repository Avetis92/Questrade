import { DestroyRef, inject } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

export const untilDestroyed = <T>(destroyRef: DestroyRef) => {
	const subject = new Subject();
  
	destroyRef.onDestroy(() => {
	  subject.next(true);
	  subject.complete();
	});
  
	return takeUntil<T>(subject.asObservable());
  }