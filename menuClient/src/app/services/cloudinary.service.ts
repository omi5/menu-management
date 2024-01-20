import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  cloudinaryRootUrl = 'https://api.cloudinary.com/v1_1/dkfnaltqp/image/upload'
  cloudinaryPreset = 'xyplfr5p'

  constructor( private http: HttpClient) { }

  cloudUpload (file: File, id: string): Observable<any>  {

    const file_name = file.name.split('.')[0];
    const public_id = id + '_' + Date.now() + '_' + file_name;

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", this.cloudinaryPreset);
    formData.append("public_id", public_id);

    return this.http.post(this.cloudinaryRootUrl, formData);
    
  }
}
