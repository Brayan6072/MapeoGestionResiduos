import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'task-18-d88e0',
        appId: '1:817945017592:web:4aab159ce2f7965bfc4f0d',
        storageBucket: 'task-18-d88e0.firebasestorage.app',
        apiKey: 'AIzaSyBvFB6SjLgXwiRPYOM5d5gcOgBMaqqnRhA',
        authDomain: 'task-18-d88e0.firebaseapp.com',
        messagingSenderId: '817945017592',
        measurementId: 'G-XD19BKTBN5',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
