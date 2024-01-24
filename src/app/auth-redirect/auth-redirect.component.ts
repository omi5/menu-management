import { Component } from '@angular/core';
import { ApiClientService } from '../services/api-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.css']
})
export class AuthRedirectComponent {
  constructor(private route: ActivatedRoute, private apiClientSerivce: ApiClientService, private router: Router) { }
  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code')
    if (code) {
      this.apiClientSerivce.authenticate(code).subscribe({
        next: () => this.router.navigateByUrl('/admin/createEmployee'),
        // error: (error) => console.log(error)
        error: () => window.location.href = 'https://getbento.vercel.app/login'
      })
    } else window.location.href = 'https://getbento.vercel.app/login'
  }
}
