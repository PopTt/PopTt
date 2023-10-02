import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private apiService: ApiService, private router: Router) { }

    submit() {
        if (this.email && this.password) {
            // Call the login method from the service
            this.apiService.login(this.email, this.password, (response) => {
                if (response.success) {
                    // Login was successful
                    // Reset the form
                    this.email = '';
                    this.password = '';
                    alert("Login Successful.");
                    console.log(response.result.UID);
                    localStorage.setItem('UID', response.result.UID);
                    this.router.navigate(['/home']);
                } else {
                    // Login failed, show an error message
                    alert("Login Failed. Please check your email and password.");
                }
            });
        } else {
            alert("The form is not yet finished.");
        }
    }
}