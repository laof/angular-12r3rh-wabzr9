import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { DatetimePickerComponent } from './datetime-picker.component';

export interface DatetimePickerOptions {
  showTime?: boolean;
  date?: Date;
  datePresentation?: string;
  maxDate?: string;
  minDate?: string;
  position?: PopupPosition;
}

export enum PopupPosition {
  Bottom = 'bottom',
}

export enum DatetimeEventType {
  Clear,
  Cancel,
  Done,
}

export interface DatetimePickerData {
  type: DatetimeEventType;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatetimePicker {
  constructor(private modal: ModalController) {}

  popup(data?: DatetimePickerOptions): Observable<DatetimePickerData> {
    let position = '';

    if (data && data.position) {
      position = ` ${data.position}`;
    }

    const sub = new Subject<DatetimePickerData>();
    const modalOptions = {
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'modal-background' + position,
      animated: true,
    };
    const opt = {
      ...modalOptions,
      component: DatetimePickerComponent,
      componentProps: { data },
    };
    this.modal.create(opt).then((mod) => {
      mod.onDidDismiss().then(({ data }) => {
        sub.next(data);
        sub.complete();
      });
      mod.present();
    });
    return sub;
  }
}
