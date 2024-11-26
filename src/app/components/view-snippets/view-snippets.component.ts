import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
 import { CommonModule } from '@angular/common';
 @Component({
    selector: 'app-view-snippets',
    standalone: true,
    templateUrl: './view-snippets.component.html',
    styleUrl: './view-snippets.component.css',
    imports: [CommonModule, ]
})
export class ViewSnippetsComponent {
 
textareaInput: any;

  constructor(private dbservice: DbService, private route: ActivatedRoute) { }
  by: any = '';
  codesnippet = {
    title: "",
    code: "",
    
  }
  
  ngOnInit() {
    const docId = this.route.snapshot.paramMap.get('id');
    this.dbservice.getSnippetById(docId!).then((data: any) => {
      this.codesnippet = data;
      
    })
  }
copy="Copy"
  copyToClipboard(  ) {
   navigator.clipboard.writeText(this.codesnippet.code)
   this.copy="Copied"
   setTimeout(() => {
    this.copy="Copy"
   }, 5000);

  }
}
 