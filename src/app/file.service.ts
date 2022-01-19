 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }


  uploadFile(file:File){

    var formData = new FormData();
      formData.append("file", file)

    var headers = this.getHeaders();
    
    console.log("name of file"+file.name)


      return this.http.post("http://65.0.100.164:8080/api/files/upload",formData);
    



  }


  getHeaders(){

  

    var headers  = {

    'idToken': localStorage.getItem('userIdToken') || '{}'
    };

    return headers;
  }
}
