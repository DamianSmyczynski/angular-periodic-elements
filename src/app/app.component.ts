import { Component } from '@angular/core';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [PeriodicTableComponent],
})
export class AppComponent {
  title = 'Periodic Table App';
}
