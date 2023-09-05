import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DatetimeEventType } from './datetime-picker';

@Component({
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
export class DatetimePickerComponent {
  @Input() date;
  @Input() position;
  @Input() showTime = false;
  @Input() maxDate = '2099-12-31';
  @Input() minDate = '1923-01-01';
  @Input() datePresentation = 'date';

  locale = 'en';
  eventType = {
    clear: DatetimeEventType.Clear,
    cancel: DatetimeEventType.Cancel,
    done: DatetimeEventType.Done,
  };

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    const data = this.navParams.get('data') || {};

    const { showTime, date, position, maxDate, minDate, datePresentation } =
      data;
    this.showTime = showTime;
    this.position = position;
    this.maxDate = maxDate || this.maxDate;
    this.minDate = minDate || this.minDate;
    this.datePresentation = datePresentation || 'date';
    console.log('getdate34' + date);
    this.date = this.localISOTime(date || new Date());
    console.log('---abcd--- ' + this.date);
  }

  formatterTitle() {
    if (!this.date) {
      return '';
    }

    return `---`;
  }

  close(type: DatetimeEventType) {
    const data = { value: this.date, type };
    this.modalCtrl.dismiss(data);
  }

  localISOTime(date: Date): string {
    const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    return new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);
  }
}
