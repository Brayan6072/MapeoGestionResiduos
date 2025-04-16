import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clasificaciones',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './clasificaciones.component.html',
  styleUrl: './clasificaciones.component.css'
})
export default class ClasificacionesComponent {
  @Input() residuos: any[] = []   
 
  constructor(){
    
  }

  imageData = [
    {
        id: 'Papel',
        title: "Papel",
        urls: [
            { url: "https://cdn-icons-png.flaticon.com/512/544/544295.png", label: "Cuadernos y libretas" },
            { url: "https://cdn-icons-png.flaticon.com/512/10290/10290265.png", label: "Periódicos" },
            { url: "https://cdn-icons-png.flaticon.com/512/5607/5607275.png", label: "Hojas de Papel" },
            { url: "https://www.ofimaticos.com/wp-content/uploads/2018/04/icono-cartulinas.jpg", label: "Cartulinas" },
            { url: "https://cdn-icons-png.flaticon.com/512/3846/3846813.png", label: "Carpetas y/o folders" },
            { url: "https://w7.pngwing.com/pngs/433/909/png-transparent-paper-brochure-computer-icons-flyer-advertising-flyer-angle-company-service.png", label: "Papel de publicidad" },
            { url: "https://png.pngtree.com/png-clipart/20211116/original/pngtree-books-illustration-education-icon-png-image_6943779.png", label: "Libros" },
            { url: "https://cdn-icons-png.flaticon.com/512/1454/1454816.png", label: "Revistas" },
            { url: "https://cdn-icons-png.flaticon.com/512/6551/6551022.png", label: "Sobres" },
            { url: "https://cdn-icons-png.flaticon.com/512/590/590056.png", label: "Invitaciones" },
            { url: "https://c0.klipartz.com/pngpicture/825/109/gratis-png-iconos-de-la-computadora-directorio-telefonico-libreta-de-direcciones-contacto.png", label: "Directorios"},
            { url: "https://thumbs.dreamstime.com/z/vector-de-esquema-color-icono-papel-publicidad-destino-publicitario-objetivo-vectores-plano-233142971.jpg", label: "Papel de propaganda"}
        ]
    },
    {
        id: 'Vidrio',
        title: "Vidrio",
        urls: [
            { url: "https://cdn-icons-png.flaticon.com/512/7030/7030877.png", label: "Botella de vidrio" },
            { url: "https://cdn-icons-png.flaticon.com/512/6150/6150166.png", label: "Tarros" },
            { url: "https://previews.123rf.com/images/sn333g/sn333g1606/sn333g160600041/59037250-dos-frascos-icono-lineal-vector-s%C3%ADmbolo-de-laboratorio-cristaler%C3%ADa-delgada-l%C3%ADnea-concepto-de.jpg", label: "Frascos" },
            { url: "https://cdn-icons-png.flaticon.com/512/4366/4366993.png", label: "Botellas de zumos"}
        ]
    },
    {
        id: 'Dificil Reciclaje',
        title: "Dificil Reciclaje",
        urls: [
            { url: "https://st3.depositphotos.com/4177785/36713/v/450/depositphotos_367138508-stock-illustration-snacks-rgb-color-icon-potato.jpg", label: "Botanas" },
            { url: "https://cdn-icons-png.flaticon.com/512/2829/2829840.png", label: "Cereales" },
            { url: "https://cdn-icons-png.flaticon.com/512/381/381192.png", label: "Cinta Adhesiva" },
            { url: "https://i.pinimg.com/736x/0c/be/d5/0cbed5fb9c6a258c4486f56a0bb7310a.jpg", label: "Hule" },
            { url: "https://img.freepik.com/vector-gratis/etiqueta-engomada-rollo-papel-tisu-sobre-fondo-blanco_1308-69022.jpg", label: "Carton encerado" },
            { url: "https://i.pinimg.com/564x/8d/87/f3/8d87f39de2d02fe1f13d8e86cba461e6.jpg", label: "Popotes" },

        ]
    },
    {
        id: 'Metal',
        title: "Metal",
        urls: [
            { url: "https://cdn-icons-png.flaticon.com/512/6676/6676583.png", label: "Llave" },
            { url: "https://cdn-icons-png.freepik.com/512/5359/5359362.png", label: "Alambre" },
            { url: "https://cdn-icons-png.flaticon.com/512/889/889668.png", label: "Alfileres" },
            { url: "https://us.123rf.com/450wm/vectorhome/vectorhome1911/vectorhome191100662/138152239-icono-de-grapa-ilustraci%C3%B3n-de-l%C3%ADnea-vectorial.jpg?ver=6", label: "Grapas" },
            { url: "https://cdn-icons-png.flaticon.com/512/4976/4976205.png", label: "Cadenas" },
            { url: "https://previews.123rf.com/images/jroblesart/jroblesart1501/jroblesart150100036/35459612-una-ilustraci%C3%B3n-de-tres-latas-de-comida.jpg", label: "Latas de alimento"},
            { url: "https://cdn-icons-png.flaticon.com/512/5198/5198869.png", label: "Latas de bebida"},
            { url: "https://cdn-icons-png.flaticon.com/512/8235/8235491.png", label: "Cobre"},
            { url: "https://images.icon-icons.com/1875/PNG/512/paperclip_119933.png", label: "Clips"},
            { url: "https://cdn-icons-png.flaticon.com/512/5672/5672225.png", label: "Tubos de metal"}
        ]
    },
    {
        id: 'Organicos',
        title: "Organicos",
        urls: [
            { url: "https://cdn-icons-png.flaticon.com/512/2907/2907340.png", label: "Restos de comida" },
            { url: "https://png.pngtree.com/png-clipart/20221229/original/pngtree-green-leaves-vector-icon-design-on-white-background-various-shapes-of-png-image_8823124.png", label: "Hojas" },
            { url: "https://cdn-icons-png.flaticon.com/512/4769/4769989.png", label: "Plántulas" },
            { url: "https://st.depositphotos.com/24512974/53115/v/450/depositphotos_531155810-stock-illustration-egg-shells-broken-egg-vector.jpg", label: "Cáscaras de huevo" },
            { url: "https://cdn-icons-png.flaticon.com/512/822/822101.png", label: "Huesos" }
        ]
    },
    {
        id: 'Plasticos',
        title: "Plasticos",
        urls: [
            { url: "https://images.vexels.com/media/users/3/158111/isolated/preview/ab61c8c977625f2f464f6f4776cb91f4-botella-de-plastico-de-icono-de-agua.png", label: "Botellas de plástico" },
            { url: "https://cdn-icons-png.flaticon.com/512/3649/3649309.png", label: "Cajas de plástico" },
            { url: "https://static.vecteezy.com/system/resources/previews/010/223/161/non_2x/cutlery-plastic-line-icon-illustration-vector.jpg", label: "Utensilios de plástico" },
            { url: "https://www.shutterstock.com/image-vector/biodegradable-plastic-sort-bag-icon-600nw-1892722294.jpg", label: "Bolsas de plástico" },
            { url: "https://cdn-icons-png.flaticon.com/512/282/282733.png", label: "Vasos de plástico" }
        ]
    }

];


  
}
