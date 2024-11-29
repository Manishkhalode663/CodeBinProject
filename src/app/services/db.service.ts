import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Snippet } from '../../models/snippets';
import { Route, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';


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
      // console.log('Document written with ID: ', docRef.id);
      // console.log(snippet);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Code Snippet Created Successfully !!",
        showConfirmButton: false,
        timer: 1500
      });

      this.router.navigate(['/']);
    } catch (e) {
      // console.error('Error adding document: ', e);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " Something went wrong while creating Snippet",
      });
      // alert('something went wrong while creating snippet');

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

  async deleteSnippetById(docId: string) {
    const docRef = doc(this.db, 'snippets', docId);
    await deleteDoc(docRef)
      .then(() => {
        console.log('Document successfully deleted!');

        // alert("Snippet Deleted Successfully...");
        
        this.router.navigate(['/myprofile']);

      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " Something went wrong while Deleting Snippet"
        });
        // console.error('Error removing document: ', error);
      });

  }

  async updateSnippet(docId: string, updatedsnippet: Snippet) {
    const docRef = doc(this.db, 'snippets', docId);

    await updateDoc(docRef, updatedsnippet)
      .then(() => {
        // console.log("Document successfully updated!");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Snippet successfully updated",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/myprofile']);

        // alert("Document successfully updated!");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " Something went wrong while updating Snippet" 
        });
        // console.error("Error updating document: ", error);
        // alert("Error updating document: ");
      });
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
