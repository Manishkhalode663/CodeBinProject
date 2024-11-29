import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private dbservise: DbService) { }


  items: { id: string, title: string, by: string }[] = []

  ngOnInit() {
    this.dbservise.getAllSnippets().then((data: any) => {
      this.items = data
      console.log(data)
    })
  }

  
}
