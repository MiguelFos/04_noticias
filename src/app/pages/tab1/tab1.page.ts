import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { respuestaTopHeadlines, Article } from '../../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias:Article[]=[];

  constructor(private noticiasService:NoticiasService, private toastController:ToastController) {}

  ngOnInit(){
    this.cargarNoticias();
  } 

  loadData(event){

    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.noticiasService.getTopHeadlines()
    .subscribe(resp =>{
      console.log('noticias', resp);
      //this.noticias=resp.articles;
      if (resp.articles.length===0) {
        event.target.disabled=true;
        event.target.complete();
        this.presentToast();
        return;
      }
      this.noticias.push(...resp.articles);//...inserta cada articulo de manera independiente
      if(event){
        event.target.complete();
      }
    }); 
  }

  async presentToast() {
    const toast = await this.toastController.create({
      position:'middle',
      message: 'Actualmente no \n hay mas noticias',
      duration: 5000
    });
    toast.present();
  }
}
