import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private data = new BehaviorSubject<string>('');
  currentData = this.data.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    // مراقبة حالة المصادقة في Firebase وتحديث البيانات بناءً على المستخدم
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // المستخدم مسجل الدخول، يمكن تحديث البيانات ببيانات المستخدم إذا لزم الأمر
        this.updateDirection(`User logged in: ${user.email}`);
      } else {
        // لا يوجد مستخدم مسجل الدخول، يمكن تحديث البيانات لتشير إلى ذلك
        this.updateDirection('No user logged in');
      }
    });
  }

  updateDirection(item: string) {
    this.data.next(item);
  }
}
