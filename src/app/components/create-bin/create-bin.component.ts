import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/snippets';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css'
})
export class CreateBinComponent {

  constructor(private  dbService:DbService){}
  title = new FormControl('', [
    Validators.required
  ])
  code = new FormControl('', [
    Validators.required
  ]
  )
  BinForm = new FormGroup({
    title: this.title,
    code: this.code
  })
async  save() {
    console.log(this.BinForm.value);
  await  this.dbService.createSnippet(this.BinForm.value as Snippet)  
  }} 
 