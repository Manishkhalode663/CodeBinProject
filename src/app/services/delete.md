// async deleteSnippetById(docId: string) {
//     const docRef = doc(this.db, 'snippets', docId);
//     await deleteDoc(docRef)
//       .then(() => {
//         console.log('Document successfully deleted!');
//       })
//       .catch((error) => {
//         console.error('Error removing document: ', error);
//       });
//   }