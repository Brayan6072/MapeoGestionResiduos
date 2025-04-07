import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { map, gameController , menu} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  imports: [IonIcon, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {

  constructor() {
    addIcons({ map , gameController, menu});
  }

  ngOnInit(): void {
      
  }


  
}
