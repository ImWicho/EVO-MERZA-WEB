import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL } from 'src/app/shared/constants/regex';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  defaultLanguage = 'es';
  validation: {
    title: string,
    content: string;
  };
  constructor(private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationService) { this.onCreateForm(); }

  ngOnInit(): void {
  }

  onLogin(): void{
    if (this.form.invalid) { return; }
    if (this.form.get('username').value !== 'master@evo.com'){
      this.notificationService.onOpenNotifcation({ type: 'error', text: 'Datos Incorrectos, intente de nuevo.' }).subscribe((data) => {

      });
    }else{
      this.router.navigate(['/main/reglas']);
    }

  }

  onCreateForm(): void{
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

}
