import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Snippet } from '../../models/snippets';
import { Route, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  db: any;
  constructor(private authservice: AuthService, private router: Router) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: Snippet) {
    try {
      const docRef = await addDoc(collection(this.db, 'snippets'), {
        ...snippet,
        by: this.authservice.getUid(),
      });
      console.log('Document written with ID: ', docRef.id);
      console.log(snippet);
      this.router.navigate(['/']);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('something went wrong while creating snippet');
    }
  }

  async getAllSnippets() {
    let result: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'snippets'));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, 'snippets', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      return {
        id: docId,
        title: 'not found',
        code: 'not found',
      };
    }
  }

  async getMySnippets() {
    let result: any[] = [];
    const q = query(
      collection(this.db, 'snippets'),
      where('by', '==', this.authservice.getUid())
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
      // console.log(doc.id, " => ", doc.data());
    });
    return result;
  }
}
