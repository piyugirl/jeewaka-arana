import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

//to change month to number
export enum month{
  Jan =1,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec
}

@Component({
  selector: 'app-app-step3',
  templateUrl: './app-step3.component.html',
  styleUrls: ['./app-step3.component.scss']
})
export class AppStep3Component implements OnInit {
apDate:string;
Time:string;
Doctor:string;
my_id:string;
profile:any;
specialist:string;
Doctorid:string;


Doc:AngularFirestoreDocument;


sliced:string;
slice_id;
mydate;
Day:number;
Month:string;
Year:number;

emonth:any;

form;

Fulldate:any;

  constructor( private formBuilder: FormBuilder,private afs:AngularFirestore, private router: Router) { 
    
    //creating acceptance form
    this.form = this.formBuilder.group({
      PatientName: '',
      Email: '',
      PhoneNumber:''
    });

//slice all datas from url
    this.sliced = router.getCurrentNavigation().finalUrl.toString().slice(10);
    this.slice_id = this.sliced.split('/');

    this.Time = this.slice_id[1];
    this.apDate = this.slice_id[2];
    this.my_id = this.slice_id[0];
  

    this.mydate=this.apDate.split('-');
    this.Day=parseInt(this.mydate[1]);
    this.Month=this.mydate[0];
    this.Year=parseInt(this.mydate[2]);

    this.emonth=month[this.Month];
    this.Fulldate=this.Year+"/"+this.Month+"/"+this.Day;

    //this.Fulldate.setFullYear(this.Year,parseInt(this.Month),this.Day);
   


    

   this.getDoctor();

  }

  // ngOnInit() {
  //   this.buildForm();
  // }
  // buildForm(): void {
  //   this.userForm = this.fb.group({
  //     'email': ['', [
  //         Validators.required,
  //         Validators.email
  //       ]
  //     ],
  //     'name': ['', [
  //       Validators.required,
  //     ]
  //   ],
  //   'issue': ['', [
  //     Validators.required,
  //   ]
  // ],
  //   });

  //   this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
  //   this.onValueChanged(); // reset validation messages
  // }
  onSubmit(data) {

    //adding to cache database
 this.afs.collection('AppointmentCache').add({PatientName:data.PatientName,Email:data.Email,PhoneNumber:data.PhoneNumber,Day:this.Day,Month:this.emonth,Year:this.Year,Time:this.Time,DoctorName:this.Doctor,DoctorId:this.Doctorid,Fulldate:this.Fulldate});
    this.router.navigate(['/patienthome']);
   
  }

  getDoctor(){
    //querying doctor using the extracted doctor id
    this.Doc = this.afs.collection('Doctors').doc(this.my_id);
    this.Doc.valueChanges().subscribe(value=>{
     this.Doctor = value.Firstname + " " + value.Lastname ;
     this.specialist =value.Specialist;
     this.Doctorid = value.Userid;
     this.profile=value.downloadURL;
  });


  
}


ngOnInit(){
  
}

}
