import { inject, Injectable, signal } from '@angular/core';
import { Firestore , collection, addDoc, collectionData, doc, getDoc, updateDoc, query, where} from '@angular/fire/firestore';
import {toSignal} from '@angular/core/rxjs-interop'
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthStateService } from '../../shared/data-access/auth-state.service';

export interface Task{
  id: string,
  title: string,
  completed: boolean
}
export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks'

@Injectable()
export class TaskService {

  private _fireStore = inject(Firestore);

  private _collection = collection(this._fireStore, PATH);

  private _authState = inject(AuthStateService);

  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  );

  loading = signal<boolean>(true);

  getTasks = toSignal((collectionData(this._query, {idField: 'id'})as Observable<Task[]>).pipe(
    tap(()=>{
      this.loading.set(false)
    }),
    catchError((error)=>{
      this.loading.set(false);
      return throwError(()=> error);
    })
  ), {initialValue: []});

  create(task: TaskCreate){
    return addDoc(this._collection, {...task, userId: this._authState.currentUser?.uid});
    
  }

  getTask(id: string){
    const docRef = doc(this._collection,id);
    return getDoc(docRef);
  }

  update(task: TaskCreate, id:string){
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, {...task, userId: this._authState.currentUser?.uid});
  }

  constructor(){
    
  }
}
