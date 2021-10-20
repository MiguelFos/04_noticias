import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { respuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers=new HttpHeaders({

  'X-Api-key': apiKey
})

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  headlinesPage=0;

  constructor( private http:HttpClient) { }

  private ejecutarQuery<T>( query:string){

    query = apiUrl + query;

    console.log(query)

    return this.http.get<T>(query, {headers});
  }


  getTopHeadlines(){

    this.headlinesPage++;
    
    return this.ejecutarQuery<respuestaTopHeadlines>('/top-headlines?country=ar&page='+this.headlinesPage);

    //return this.http.get<respuestaTopHeadlines>('https://newsapi.org/v2/top-headlines?country=ar&apiKey=cc5eb6587e4d48d28b29feb1ccd9e68a');
  }

  getTopHeadlinesCategoria(categoria:string){

    return this.ejecutarQuery<respuestaTopHeadlines>('/top-headlines?country=ar&category='+categoria);

    //return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cc5eb6587e4d48d28b29feb1ccd9e68a')

  }
  
}
