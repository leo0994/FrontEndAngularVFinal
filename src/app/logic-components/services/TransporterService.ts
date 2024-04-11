// transporter.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, tap} from 'rxjs';
import {Transporter} from "../classes/Transporter";

@Injectable({
  providedIn: 'root'
})
export class TransporterService {
  private apiUrl = 'http://localhost:8080/transporters';
  private transportersSubject = new BehaviorSubject<Transporter[]>([]);
  transporters$ = this.transportersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getTransporters();
  }

  getTransporters(): void{
    this.http.get<Transporter[]>(this.apiUrl).subscribe(
      (initialTransporters) => {
        this.transportersSubject.next(initialTransporters);
      },
      (error) => {
        console.error('Error al obtener la lista de transportistas:', error);
      }
    );
  }

  updateTransporter(updatedTransporter: Transporter): Observable<Transporter> {
    const url = `${this.apiUrl}/${updatedTransporter.id}`;
    return this.http.put<Transporter>(url, updatedTransporter).pipe(
      tap((response) => {
        const currentTransporters = this.transportersSubject.value;
        const index = currentTransporters.findIndex(t => t.id === updatedTransporter.id);

        if (index !== -1) {
          currentTransporters[index] = response;
          this.transportersSubject.next([...currentTransporters]);
        }
      })
    );
  }

  addTransporter(newTransporter: Transporter): Observable<Transporter> {
    return this.http.post<Transporter>(this.apiUrl, newTransporter).pipe(
      tap((response): void => {
        let currentTransporters: Transporter[] = this.transportersSubject.value;
        currentTransporters.push(response);
        this.transportersSubject.next([...currentTransporters]);
      })
    );
  }

  getTransporterDetails(id: number): Observable<Transporter> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Transporter>(url);
  }

  deleteTransporter(transporterId: number): Observable<Transporter> {
    const deleteUrl = `${this.apiUrl}/${transporterId}`;
    return this.http.delete<Transporter>(deleteUrl).pipe(
      tap((response): void => {
        let currentTransporters: Transporter[] = this.transportersSubject.value;
        currentTransporters.splice(currentTransporters.findIndex(item => item.id == transporterId), 1);
        this.transportersSubject.next([...currentTransporters]);
      })
    );
  }

}
