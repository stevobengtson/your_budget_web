import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, UserData } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Your Budget';
  public isAuthenticated = false;
  public userData: UserData | null = null;
  private _destroySub$ = new Subject<void>();

  constructor(private authService: AuthService) {
    authService.isAuthenticated$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);

    authService.userData$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((userData: UserData | null) => this.userData = userData);
  }

  logout() {
    this.authService.logout();
  }
}
