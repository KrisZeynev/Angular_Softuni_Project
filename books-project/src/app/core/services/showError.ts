import { Observable, Subject, timer } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

export function createTimedErrorMessage(duration: number = 2000): {
  errorMessage$: Observable<string>,
  showError: (message: string) => void
} {
  const errorSubject = new Subject<string>();

  const errorMessage$ = errorSubject.pipe(
    switchMap(message => 
      message 
        ? timer(duration).pipe(startWith(message), switchMap(() => [''])) 
        : ['']
    )
  );

  return {
    errorMessage$,
    showError: (message: string) => errorSubject.next(message)
  };
}
