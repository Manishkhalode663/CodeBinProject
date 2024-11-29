import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
@Injectable({ providedIn: 'root' })

// This service will handle user authentication and provide methods for login, logout, and checking if a user is authenticated.
export class AuthService {
   

  private uid?: string;
  user?: any;

  getUser() {
    return getAuth().currentUser;

  }

  getUid(): any {
    return this.uid;
  }

 
    
 
checksnippetuserandCurrentuser(snippetuser: any) {
  if (snippetuser == this.getUid()) {
    return true
  }
  return false
}


isAuthenticated() {
  return this.uid ? true : false;
}
constructor(private router: Router) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.uid = user.uid;
      this.user = user;
      console.log('User Logged In as', user.email);
    } else {
      this.uid = undefined;
      console.log(' User Logged out ');
    }
  });
}
registerUser(email: string, password: string) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      this.router.navigate(['/login']);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert('something went wrong when registering user');
    });
}

loginUser(email: string, password: string) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      this.router.navigate(['/']);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert('something went wrong when logging try again');
    });
}
logOutUser() {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    alert('log Out failed');
  });
  this.router.navigate(['/']);
}
}
