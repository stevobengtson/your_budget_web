import { Component } from '@angular/core';
import { UserApiService, UserResponse } from '../services/api/user-api.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public email = '';
    public password = '';

    constructor(private userApiService: UserApiService) { }

    public onSubmit(): void {
        this.userApiService.create(this.email, this.password).subscribe(function (user: UserResponse) {
            console.log("User Created" + user.email);
        });
    }
}
