import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';

const API_URI = 'https://jsonplaceholder.typicode.com/';
const API_LOCAL = 'https://login-register-node-apis.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user = new BehaviorSubject<User>(null);
  conrext: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.conrext = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  }

  public get currentUserValue(): any {
    return this.conrext.value;
  }

  logout = () => {
    this.conrext.next(null);
    localStorage.setItem('user', JSON.stringify({}));
  }

  users = (): Observable<User[]> => {
    return this.http.get<User[]>(API_LOCAL + 'users');
  }
  register = (user: User) => {
    return this.http.post<User>(API_LOCAL + 'register', user);
  }
  login = (params: any) => {
    return this.http.post(API_LOCAL + 'login', params);
  }
}
