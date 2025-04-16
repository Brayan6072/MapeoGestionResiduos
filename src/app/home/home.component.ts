import { AfterViewInit, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
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
export default class HomeComponent implements AfterViewInit {
  @ViewChild('menu', { static: false }) menu!: ElementRef<HTMLDivElement>;
  @ViewChild('btnSignUp', { static: false }) btnSignUp!: ElementRef<HTMLButtonElement>;
  @ViewChild('header', { static: false }) header!: ElementRef<HTMLElement>;
  @ViewChild('controllers', { static: false }) controllers!: ElementRef<HTMLDivElement>;
  @ViewChild('headerContainer', { static: false }) headerContainer!: ElementRef<HTMLDivElement>;
  constructor() {
    addIcons({ map, gameController, menu });
  }



  ngAfterViewInit(): void {
    this.setupInitialLayout();
  }

  @HostListener('window:resize')
  onResize() {
    this.responsive();
  }

  private setupInitialLayout(): void {
    this.responsive();
  }

  toggleMenu(): void {
    this.menu.nativeElement.classList.toggle('active');
    this.adjustMenuForSmallHeight();
  }

  private adjustMenuForSmallHeight(): void {
    const screenHeight = window.innerHeight;
    if (screenHeight <= 362) {
      if (this.menu.nativeElement.classList.contains('active')) {
        this.menu.nativeElement.classList.add('min');
      } else {
        this.menu.nativeElement.classList.remove('min');
      }
    } else {
      this.menu.nativeElement.classList.remove('min');
    }
  }

  private responsive(): void {
    if (window.innerWidth <= 865) {
      this.moveElement(this.btnSignUp, this.menu.nativeElement.children[0] as HTMLElement);
      this.moveElement(this.menu, this.header.nativeElement);
    } else {
      this.moveElement(this.btnSignUp, this.controllers.nativeElement);
      this.moveElement(this.menu, this.headerContainer.nativeElement);
    }
    this.adjustMenuForSmallHeight();
  }

  private moveElement(elementToMove: ElementRef<HTMLElement>, newParent: HTMLElement): void {
    if (elementToMove?.nativeElement && newParent) {
      newParent.appendChild(elementToMove.nativeElement);
    }
  }


}
