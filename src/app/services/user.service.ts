import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError } from 'rxjs/operators';
import { BASE_URL } from '../shared/constants';
import { handleError } from './error-handler';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  readonly USER_END_POINT = BASE_URL + 'api/';
  tryGetUser = true;
  userToReturn: User = null;
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
    ) { }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Imposible completar la petición.');
  }

   // GET list of users
   getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_END_POINT);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.USER_END_POINT}login`, {
      email,
      password
    }).pipe(
      map(_ => {
        this.tryGetUser = true;
        return _;
      }),
      catchError(handleError)
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('item');
    this.router.navigate(['/login']);
  }

  decode(): Observable<any> {
    if (this.userToReturn == null ) {
      this.userToReturn = JSON.parse(localStorage.getItem('user'));
      return of(this.userToReturn);
    } else {
      return of(this.userToReturn);
    }
  }
}
