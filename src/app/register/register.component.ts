import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

pswCheck:boolean=false


  constructor(private ds:DataService,private router:Router,
    private fb:FormBuilder){ }

  ngOnInit(): void{
  }

  //reactive model for register
registerForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
  psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]],
  cpsw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+')]]
})

  signup(){
    var path=this.registerForm.value

    var acno=path.acno
    var uname=path.uname
    var psw=path.psw
    var cpsw=path.cpsw
 
    if(this.registerForm.valid){
      if(psw==cpsw){
        this.ds.register(acno,uname,psw)
        .subscribe((result:any)=>{
          alert(result.message)
          this.router.navigateByUrl("")
        },
         result=>{
          alert(result.error.message)
         }
        )
      } 
      else{
        this.pswCheck=true
        // alert('password doesnt match')
      }
  
    }
    else{
      alert("invalid form")
    }

  }
}
