import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-snippets',
  standalone: true,
  templateUrl: './view-snippets.component.html',
  styleUrl: './view-snippets.component.css',
  imports: [CommonModule,RouterLink]
})
export class ViewSnippetsComponent {

  textareaInput: any;
  docId: any|string;


  constructor(private dbservice: DbService, private route: ActivatedRoute, private authservice: AuthService) { }
  byuser: any = '';

  codesnippet = {
     title: "",
    code: "",
    by: "",
    id:"",
  }
  userchecker: any;


  ngOnInit() {
    this.docId = this.route.snapshot.paramMap.get('id');
    this.dbservice.getSnippetById(this.docId!).then((data: any) => {
      this.codesnippet = data;
      this.userchecker = this.authservice.checksnippetuserandCurrentuser(this.codesnippet.by)

    })


  }
  copy = "Copy"
  copyToClipboard() {
    navigator.clipboard.writeText(this.codesnippet.code)
    this.copy = "Copied"
    setTimeout(() => {
      this.copy = "Copy"
    }, 5000);

  }

  delete() {
    const docId = this.route.snapshot.paramMap.get('id');




    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dbservice.deleteSnippetById(docId!)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });




  }
  edit() {

  }



}
