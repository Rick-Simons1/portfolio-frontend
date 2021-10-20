import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss'],
})
export class PortfolioPageComponent implements OnInit {
  constructor(private apiService: APIService, private auth: AuthService) {}

  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe((response) => {
      console.log(response);
    });
  }
}
