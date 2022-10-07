import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AnimalService {
    feed(animalToFeed: string): Observable<string> {
        return of(animalToFeed);
    }
}