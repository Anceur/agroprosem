// import { Injectable } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
// import { User } from '../models/user';
// import { Role } from '@core/models/role';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import firebase from 'firebase/compat/app';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<User>;
//   public currentUser: Observable<User>;

//   private users = [
//     {
//       id: 1,
//       img: 'assets/images/user/admin.jpg',
//       username: 'admin@software.com',
//       password: 'admin@123',
//       firstName: 'Sarah',
//       lastName: 'Smith',
//       role: Role.Admin,
//       token: 'admin-token',
//     },
//     {
//       id: 2,
//       img: 'assets/images/user/employee.jpg',
//       username: 'employee@software.com',
//       password: 'employee@123',
//       firstName: 'Ashton',
//       lastName: 'Cox',
//       role: Role.Employee,
//       token: 'employee-token',
//     },
//     {
//       id: 3,
//       img: 'assets/images/user/client.jpg',
//       username: 'client@software.com',
//       password: 'client@123',
//       firstName: 'Cara',
//       lastName: 'Stevens',
//       role: Role.Client,
//       token: 'client-token',
//     },
//   ];

//   constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
//     this.currentUserSubject = new BehaviorSubject<User>(
//       JSON.parse(localStorage.getItem('currentUser') || '{}')
//     );
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get currentUserValue(): User {
//     return this.currentUserSubject.value;
//   }

//   login(username: string, password: string) {

//     const user = this.users.find((u) => u.username === username && u.password === password);

//     if (!user) {
//       return this.error('Username or password is incorrect');
//     } else {
//       localStorage.setItem('currentUser', JSON.stringify(user));
//       this.currentUserSubject.next(user);
//       return this.ok({
//         id: user.id,
//         img: user.img,
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         token: user.token,
//       });
//     }
//   }
//   ok(body?: {
//     id: number;
//     img: string;
//     username: string;
//     firstName: string;
//     lastName: string;
//     token: string;
//   }) {
//     return of(new HttpResponse({ status: 200, body }));
//   }
//   error(message: string) {
//     return throwError(message);
//   }

//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(this.currentUserValue);
//     return of({ success: false });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { Role } from '@core/models/role';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private users = [
    {
      id: 1,
      img: 'assets/images/user/admin.jpg',
      username: 'admin@software.com',
      password: 'admin@123',
      firstName: 'Sarah',
      lastName: 'Smith',
      role: Role.Admin,
      token: 'admin-token',
    },
    {
      id: 2,
      img: 'assets/images/user/employee.jpg',
      username: 'employee@software.com',
      password: 'employee@123',
      firstName: 'Ashton',
      lastName: 'Cox',
      role: Role.Employee,
      token: 'employee-token',
    },
    {
      id: 3,
      img: 'assets/images/user/client.jpg',
      username: 'client@software.com',
      password: 'client@123',
      firstName: 'Cara',
      lastName: 'Stevens',
      role: Role.Client,
      token: 'client-token',
    },
  ];

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
    // تأكد من أن currentUser يتم تحليله فقط إذا كان موجودًا وقابل للتحليل
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    this.currentUserSubject = new BehaviorSubject<User | null>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(username, password).then(async (userCredential) => {
      const firebaseUser = userCredential.user;
      
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const user = this.users.find((u) => u.username === username);

        if (user) {
          user.token = token || 'default-token';
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return this.ok({
            id: user.id,
            img: user.img,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.token,
          });
        }
      }
      return this.error('Unable to login');
    }).catch(error => {
      return this.error(error.message);
    });
  }

  ok(body?: {
    id: number;
    img: string;
    username: string;
    firstName: string;
    lastName: string;
    token: string;
  }) {
    return of(new HttpResponse({ status: 200, body }));
  }

  error(message: string) {
    return throwError(message);
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);  
      return of({ success: true });
    }).catch(error => {
      return this.error(error.message);
    });
  }
}


