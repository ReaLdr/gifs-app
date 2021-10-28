import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsRespo } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = '9bayhUkhjvQM9DrcPK8bm0hlMGP6a7zb';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
    // Rompoer la referencia
  }

  constructor( private http: HttpClient) {
    // El constructor solo se ejecuta la primera y unica vez que el servicio es llamado
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];

    /* if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */
  }

  buscarGifs( query: string = '' ){
  // async buscarGifs( query: string = '' ){

    query = query.trim().toLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);  
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem( 'historial', JSON.stringify(this._historial));
    }
    
    // Con async y await
    /* const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=9bayhUkhjvQM9DrcPK8bm0hlMGP6a7zb&q=dragon ball z&limit=10');
    const data = await resp.json();
    console.log(data); */
    
    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=9bayhUkhjvQM9DrcPK8bm0hlMGP6a7zb&q=dragon ball z&limit=10')
      .then(resp => {
        resp.json().then( data => console.log(data)
         )
      }); */

      const params = new HttpParams()
                            .set('api_key', this.apiKey)
                            .set('limit', '10')
                            .set('q', query);
      

      this.http.get<SearchGifsRespo>(`${this.servicioUrl}/search`, { params })
        .subscribe( ( resp ) =>{
          this.resultados = resp.data;
          localStorage.setItem('resultado', JSON.stringify(this.resultados));
        } )
    
  }

  
}
