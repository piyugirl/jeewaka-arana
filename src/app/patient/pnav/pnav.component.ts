
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Appointment {
    Day:number,
    Year:number,
    Month:number,
    Time:string,
    Doctor:string,
    flag:boolean
 }
export interface Appointmentid extends Appointment { id: string; }

@Component({
  selector: 'app-pnav',
  templateUrl: './pnav.component.html',
  styleUrls: ['./pnav.component.scss']
})
export class PnavComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  
 count:number=0;
 notifications=[];


 
notifyCol: AngularFirestoreCollection<Appointment>;
notifyDoc:AngularFirestoreDocument;
notify: Observable<Appointmentid[]>;

id:any;


  constructor(public location: Location, private element : ElementRef,private afs:AngularFirestore) {
      this.sidebarVisible = false;



      this.notifyCol = afs.collection<Appointment>('Patients').doc('dskyLFWguNTM7sRAiQ3tAQJ7L1u2').collection('Appointments');

     
     
      this.notify=this.notifyCol.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
            const id =a.payload.doc.id;
            const data = a.payload.doc.data() as Appointment;
            
        return { id, ...data };

        }))
      );
   

      

    
    //   this.noti.subscribe(value=>{
    //   if(value.flag==1){

    //     this.notifications.push(value);
    //     this.count +=1;
        
    //   }
    //   });

    






  }

  ngOnInit() {
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }
  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const html = document.getElementsByTagName('html')[0];
      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);
      html.classList.add('nav-open');

      this.sidebarVisible = true;
  };
  sidebarClose() {
      const html = document.getElementsByTagName('html')[0];
      // console.log(html);
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      html.classList.remove('nav-open');
  };
  sidebarToggle() {
      // const toggleButton = this.toggleButton;
      // const body = document.getElementsByTagName('body')[0];
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
  };

  isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if( titlee === '/documentation' ) {
          return true;
      }
      else {
          return false;
      }
  }

test(){
    console.log("hi");
}


}
