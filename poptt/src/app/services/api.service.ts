import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';

  constructor() { }

  login(email: string, password: string, callback: (response: any) => void): void {
    const data = JSON.stringify({ email, password });
    this.ajaxPost(`${this.baseUrl}/api/login.php`, data, callback);

  }

  register(username: string, email: string, phone: string, password: string, callback: (response: any) => void): void {
    const data = JSON.stringify({ username, email, phone, password });
    this.ajaxPost(`${this.baseUrl}/api/register.php`, data, callback);
  }

  getUserData(callback: (response: any) => void): void {
    this.ajaxGet(`${this.baseUrl}/api/user.php`, callback);
  }

  uploadFile(formData: FormData, callback: (response: any) => void): void {
    this.ajaxPostFormData(`${this.baseUrl}/api/uploadImage.php`, formData, callback);
  }

  logout(callback: (response: any) => void): void {
    this.ajaxGet(`${this.baseUrl}/api/logout.php`, callback);
  }

  private ajaxGet(url: string, callback: (response: any) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      }
    };
    xhr.send();
  }

  private ajaxPost(url: string, data: any, callback: (response: any) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      }
    };
    xhr.send(data);
  }

  private ajaxPostFormData(url: string, formData: FormData, callback: (response: any) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(response);
      }
    };
    xhr.send(formData);
  }
}
