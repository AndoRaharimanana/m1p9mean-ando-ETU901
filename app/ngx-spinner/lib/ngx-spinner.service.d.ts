import { Observable, BehaviorSubject } from 'rxjs';
import { NgxSpinner, Spinner } from './ngx-spinner.enum';
import * as ɵngcc0 from '@angular/core';
export declare class NgxSpinnerService {
    /**
     * Spinner observable
     *
     * @memberof NgxSpinnerService
     */
    spinnerObservable: BehaviorSubject<NgxSpinner>;
    /**
     * Creates an instance of NgxSpinnerService.
     * @memberof NgxSpinnerService
     */
    constructor();
    /**
    * Get subscription of desired spinner
    * @memberof NgxSpinnerService
    **/
    getSpinner(name: string): Observable<NgxSpinner>;
    /**
     * To show spinner
     *
     * @memberof NgxSpinnerService
     */
    show(name?: string, spinner?: Spinner): Promise<unknown>;
    /**
    * To hide spinner
    *
    * @memberof NgxSpinnerService
    */
    hide(name?: string, debounce?: number): Promise<unknown>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxSpinnerService, never>;
}

//# sourceMappingURL=ngx-spinner.service.d.ts.map