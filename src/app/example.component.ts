import { Component } from '@angular/core';
import { DatetimePicker } from './datetime-picker/datetime-picker';

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.css'],
})
export class ExampleComponent {
  constructor(private date: DatetimePicker) {}
  fdsafa() {
    this.date.popup();
  }
}
