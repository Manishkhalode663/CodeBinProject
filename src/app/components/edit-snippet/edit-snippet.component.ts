import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/snippets';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-snippet',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-snippet.component.html',
  styleUrl: './edit-snippet.component.css',
})
export class EditSnippetComponent {
  // constructor(private dbService: DbService) { }
  constructor(
    private dbservice: DbService,
    private route: ActivatedRoute
   ) {}
  snippetid: any;
  codesnippet = {
    title: '',
    code: '',
  };

  ngOnInit() {
    this.snippetid = this.route.snapshot.paramMap.get('id');
    // console.log(docId);
     this.dbservice.getSnippetById(this.snippetid!).then((data: any) => {
      this.codesnippet = data;
      this.populateForm(this.snippetid);
      // console.log(data);
    });
  }

  title = new FormControl(this.codesnippet.title, [Validators.required]);
  code = new FormControl(this.codesnippet.code, [Validators.required]);

  EditForm = new FormGroup({
    title: this.title,
    code: this.code,
  });

  async populateForm(docId: string) {
    this.title.setValue(this.codesnippet.title);
    this.code.setValue(this.codesnippet.code);
  }
  async update() {
    // await this.dbService.createSnippet(this.BinForm.value as Snippet)
    await this.dbservice.updateSnippet(
      this.snippetid,
      this.EditForm.value as Snippet
    );
  }
}
