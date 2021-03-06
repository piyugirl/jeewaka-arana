import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx'
import { observable } from 'rxjs';
import * as _ from 'lodash';
import { Doctor } from 'app/core/models/doctor.model';

interface Post {
  Firstname: string;
  Lastname: string;
  Email: string;
  PhoneNumber: number;
  NIC: string;
  City: string;
  Position: string;
  RegistrationNumber: string;
  expyear: number;

}

@Component({
  selector: 'app-selectbyname',
  templateUrl: './selectbyname.component.html',
  styleUrls: ['./selectbyname.component.scss']
})
export class SelectbynameComponent implements OnInit {

  results: any[] = [];
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  str: any;
  // selectletter="ALL";
  page = 1;
  pageSize = 4;
  filteredNames: any[] = [];
  filters = {}
  letter = new FormControl('');
  farray: any[] = [];

  constructor(private afs: AngularFirestore) {
    this.afs.collection('Doctors', ref => ref.orderBy('Firstname')).valueChanges().subscribe(results => {
    this.results = results;
    // this.farray=this.results;
    this.applyFilters1();
  }) }

  ngOnInit() {
   
  }
  
  applyFilters1() {
    this.filteredNames = _.filter(this.results, _.conforms(this.filters));
  }

  applyFilters() {
    this.filteredNames = _.filter(this.farray, _.conforms(this.filters));
  }


  fname(property: string, letter) {
    this.farray = [];
    for (var i = 0; i < this.results.length; i++) {
      var v: string = this.results[i].Firstname;
      var x: string = v.charAt(0);
      if (letter.value == x) {
        console.log("yes");
        this.farray.push(this.results[i]);
      }
      else {
        console.log("no");
      }
    }
    console.log(this.farray);
    this.applyFilters();
  }
  selectAll() {
    this.farray = [];
    for (var i = 0; i < this.results.length; i++) {
      this.farray.push(this.results[i]);
      console.log("hi");
    }
    console.log(this.farray);
    this.applyFilters();
  }


}



