import { Component } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Your Budget';
  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();

  constructor(private authService: AuthService) {
    authService.isAuthenticated$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('id_token');
  }
}
