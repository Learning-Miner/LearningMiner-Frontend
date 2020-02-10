import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'cm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;

    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private router: Router,
    ) {}

    userForm: FormGroup;

    ngOnInit() {
      this.buildUserForm();
    }

    private buildUserForm() {
      this.userForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        rol: ['', [Validators.required]],
      });
    }

    onSubmit() {
      const userToCreate = this.userForm.value as User;

      if (this.userForm.value.rol === '1') {
        this.userForm.value.rol = 'Student';
      } else {
        this.userForm.value.rol = 'Teacher';
      }

      console.log(userToCreate);

      this.userService.signup(userToCreate).subscribe(res => {
        console.log('Usuario registrado');
        this.router.navigate(['/login']);
      }, error => {
        console.log('Email ya está en uso');
      });
    }

}
