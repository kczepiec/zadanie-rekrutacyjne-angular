import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor(private http: HttpClient) { }

  /**
   * Returns the SVG content of an icon.
   * @param iconName string
   * @returns Observable<string> representing the SVG content
   */
  getSvg(iconName: string): Observable<string> {
    return this.http.get(`assets/icons/${iconName.toLowerCase()}.svg`, { responseType: 'text' });
  }

}
