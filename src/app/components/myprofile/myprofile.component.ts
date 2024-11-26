import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent {
  user: any;


  constructor(private dbservise: DbService, private authservice: AuthService) { }


  items: { id: string, title: string, by: string }[] = []
  ngOnInit() {

    this.user = this.authservice.user.email
    console.log(this.user);


    this.dbservise.getMySnippets().then((data: any) => {
      this.items = data
      // console.log(data)
    })

  }
}
