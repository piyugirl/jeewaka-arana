import { Component, OnInit } from '@angular/core';
 import {SearchdoctorService} from '../../../core/searchdoctor.service';
import { AuthService } from 'app/core/auth.service';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Doctors{
  
}
@Component({
  selector: 'app-advancedsearch',
  templateUrl: './advancedsearch.component.html',
  styleUrls: ['./advancedsearch.component.scss']
})
export class AdvancedsearchComponent implements OnInit {
  my_test:string; 
  gender:string;
  specialist:string;
  position:string;

  postsCol:AngularFirestoreCollection< Doctors>;
  posts:Observable< Doctors[]>;
  post$:any;


  QueryCol:AngularFirestoreCollection<Doctors>;
  Query:Observable<Doctors[]>



  constructor(private SearchDoctorService:SearchdoctorService,private fauth:AngularFireAuth,private afs:AngularFirestore) {
    
    // this.postsCol=this.afs.collection('Doctors');
    // this.posts=this.postsCol.valueChanges();
  
    

  // this.QueryCol=afs.collection('Doctors', ref => ref.where('Specialist', '==', 'Cancer'));
  // this.Query=this.QueryCol.valueChanges();
    
   }

  ngOnInit() {
  }

  specFilter(data:string){
this.specialist=data;
    this.QueryCol=this.afs.collection('Doctors', ref => ref.where('Specialist', '==', data));
  this.Query=this.QueryCol.valueChanges();
  // this.applyFilter();
  }

  posFilter(data:string){
    this.position=data;
    // this.applyFilter();
    this.QueryCol=this.afs.collection('Doctors', ref => ref.where('Position', '==', data));
    this.Query=this.QueryCol.valueChanges();
  }

  genderFilter(data:string){
    this.gender=data;
    // this.applyFilter();
    this.QueryCol=this.afs.collection('Doctors', ref => ref.where('Gender', '==',data));
    this.Query=this.QueryCol.valueChanges();
  }

 applyFilter(){
   
  this.QueryCol=this.afs.collection('Doctors', ref => ref.where('Position','==',this.position).where('Gender', '==',this.gender).where('Specialist', '==',this.specialist));
 
  this.Query=this.QueryCol.valueChanges();
 }


  test(data:string)
  {
    this.my_test=data;
  }


  

}