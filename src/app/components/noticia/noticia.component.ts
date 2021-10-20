import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() indice:number;
  @Input() enFavoritos;

  constructor( private iab:InAppBrowser, 
    private actionSheetController:ActionSheetController,
    private socialSharing:SocialSharing,
    private dataLocalService:DataLocalService) { }

  ngOnInit() {

    console.log('FAVORITOS', this.enFavoritos)

  }

  abrirNoticia(){
     console.log('NOTICIA', this.noticia.url)
     const browser = this.iab.create(this.noticia.url, '_system'); 
  }

  async lanzarMenu(){

    

    let guardarBorrarBoton;

    if(this.enFavoritos){

      guardarBorrarBoton = {
        text: 'Borrar favorito ',
        icon: 'star-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };

    }else{
      guardarBorrarBoton = {
        text: 'Favorito ',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticia(this.noticia)
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share-social-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url             
          )
        }
      },
      guardarBorrarBoton,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  

  }

}
