/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
/*
var mapa = L.map("mapa-del-cut").setView([20.566736996117946, -103.22846090067654],17.49)
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?,{}").addTo(mapa)
*/

var mapa = L.map("mapa-del-cut").setView([20.566736996117946, -103.22846090067654], 17.49);


var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 25,
    minZoom: 17.5
});


CartoDB_Positron.addTo(mapa);

var customIcon = L.icon({
    iconUrl: 'https://cdn.icon-icons.com/icons2/2159/PNG/512/map_marker_location_placeholder_icon_132928.png',  
    iconSize: [34, 34],             
    iconAnchor: [18, 34],           
    popupAnchor: [0, -32]           
});

var grupoPapel = L.layerGroup();
var grupoMetal = L.layerGroup();
var grupoVidrio = L.layerGroup();
var grupoPlasticos = L.layerGroup();
var grupoDificilReciclaje = L.layerGroup();
var grupoOrganicos = L.layerGroup();

var marcador1 =L.marker([20.567257, -103.226077], {icon: customIcon},{icon: customIcon});

marcador1.addTo(grupoPapel);
marcador1.addTo(grupoDificilReciclaje);
marcador1.addTo(grupoOrganicos);
marcador1.addTo(grupoPlasticos);

marcador1.bindPopup("<h3> Contenedor de reciclaje A </h3>  <p> Con cordenadas :20.567257, -103.226077</p> <img class='imgbt' src='Images/Botes/img (22).jpg' /> ")
marcador1.on('click', function(e) {
    mostrarCuadroTexto(
        'Contenedores de reciclaje',
        [img_papel, img_inorganicos, img_organicos, img_plasticos],
        'Puedes reciclar este tipo de residuos',
        true,
        'Contenedores A'
    );
    grafica(['Papel', 'Inorganicos', 'Organicos','Plasticos']);
});

var marcador2 =  L.marker([20.566290, -103.228069],{icon: customIcon});

marcador2.addTo(grupoPapel);
marcador2.addTo(grupoDificilReciclaje);
marcador2.addTo(grupoMetal);
marcador2.addTo(grupoPlasticos);

marcador2.bindPopup("<h3> Contenedor de reciclaje B </h3>  <p> Con cordenadas :20.566290, -103.228069 </p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador2.on('click', function(e) {

    mostrarCuadroTexto('Contenedores de reciclaje',[img_plasticos, img_papel, img_metal, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores B");
    grafica(['Plasticos', 'Papel', 'Metal', 'Dificil Reciclaje']);
});


var marcador3 =  L.marker([20.567930, -103.227679],{icon: customIcon});
marcador3.addTo(grupoPapel);
marcador3.addTo(grupoDificilReciclaje);
marcador3.addTo(grupoOrganicos);
marcador3.addTo(grupoPlasticos);

marcador3.bindPopup("<h3> Contenedor de reciclaje C </h3>  <p> Con cordenadas :20.567930, -103.227679 </p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador3.on('click', function(e) {

   mostrarCuadroTexto('Contenedores de reciclaje', [img_papel, img_inorganicos, img_organicos,img_plasticos],'Puedes reciclar este tipo de residuos', true, "Contenedores C");
   grafica(['Papel', 'Inorganicos', 'Organicos','Plasticos']);
});


var marcador4 =  L.marker([20.567837917655613, -103.22862054715823],{icon: customIcon});

marcador4.addTo(grupoPapel);
marcador4.addTo(grupoVidrio);
marcador4.addTo(grupoDificilReciclaje);
marcador4.addTo(grupoPlasticos);

marcador4.bindPopup("<h3> Contenedor de reciclaje D </h3>  <p> Con cordenadas :20.567837917655613, -103.22862054715823 </p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador4.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_papel, img_vidrio, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores D")
    grafica(['Papel', 'Vidrio', 'Plasticos', 'Dificil Reciclaje'])

});

var marcador5 =  L.marker([20.566773982106564, -103.22694831474072],{icon: customIcon});

marcador5.addTo(grupoMetal);
marcador5.addTo(grupoVidrio);
marcador5.addTo(grupoDificilReciclaje);
marcador5.addTo(grupoPlasticos);

marcador5.bindPopup("<h3> Contenedor de reciclaje E </h3>  <p> Con cordenadas : 20.566773982106564, -103.22694831474072</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador5.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_plasticos, img_vidrio, img_metal, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores E")
    grafica(['Plasticos','Vidrio', 'Metal', 'Dificil Reciclaje'])

});


var marcador6 =  L.marker([20.567132188574096, -103.22762347254994],{icon: customIcon});
marcador6.addTo(grupoMetal);
marcador6.addTo(grupoVidrio);
marcador6.addTo(grupoDificilReciclaje);
marcador6.addTo(grupoPlasticos);
marcador6.addTo(grupoPapel);

marcador6.bindPopup("<h3> Contenedor de reciclaje F </h3>  <p> Con cordenadas : 20.567132188574096, -103.22762347254994</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador6.on('click', function(e) {

   mostrarCuadroTexto('Contenedores de reciclaje',[img_papel, img_metal, img_vidrio, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores F")
   grafica(['Papel', 'Metal', 'Vidrio', 'Plasticos', 'Dificil Reciclaje'])
});



var marcador7 =  L.marker([20.56711414829566, -103.23022014143083],{icon: customIcon});
marcador7.addTo(grupoOrganicos);
marcador7.addTo(grupoDificilReciclaje);
marcador7.addTo(grupoPlasticos);
marcador7.addTo(grupoPapel);

marcador7.bindPopup("<h3> Contenedor de reciclaje G </h3>  <p> Con cordenadas : 20.56711414829566, -103.23022014143083</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador7.on('click', function(e) {

   mostrarCuadroTexto('Contenedores de reciclaje',[img_papel,img_organicos, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores G")
   grafica(['Papel','Organicos', 'Plasticos', 'Dificil Reciclaje'])
});

var marcador8 =  L.marker([20.567099872026592, -103.22819050770538],{icon: customIcon});

marcador8.addTo(grupoDificilReciclaje);
marcador8.addTo(grupoPapel);

marcador8.bindPopup("<h3> Contenedor de reciclaje H </h3>  <p> Con cordenadas : 20.567099872026592, -103.22819050770538</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador8.on('click', function(e) {

   mostrarCuadroTexto('Contenedores de reciclaje',[img_plasticos,img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores H")
   grafica(['Plasticos','Dificil Reciclaje'])
});

var marcador9 =  L.marker([20.56710049983879, -103.2281167469584],{icon: customIcon});

marcador9.addTo(grupoMetal);
marcador9.addTo(grupoPapel);

marcador9.bindPopup("<h3> Contenedor de reciclaje I </h3>  <p> Con cordenadas : 20.56710049983879, -103.2281167469584</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador9.on('click', function(e) {

   mostrarCuadroTexto('Contenedores de reciclaje',[img_papel, img_metal],'Puedes reciclar este tipo de residuos', true, "Contenedores I")
   grafica(['Papel', 'Metal'])
});

var marcador11=  L.marker([20.567080308476694, -103.22619588100355],{icon: customIcon});

marcador11.addTo(grupoMetal);
marcador11.addTo(grupoVidrio);
marcador11.addTo(grupoDificilReciclaje);
marcador11.addTo(grupoPlasticos);

marcador11.bindPopup("<h3> Contenedor de reciclaje J </h3>  <p> Con cordenadas : 20.567080308476694, -103.22619588100355</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador11.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_plasticos, img_vidrio, img_metal, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores J")
    grafica(['Plasticos', 'Vidrio', 'Metal', 'Dificil Reciclaje'])

});

var marcador12 =  L.marker([20.567004373533045, -103.22994141729409],{icon: customIcon});

marcador12.addTo(grupoMetal);
marcador12.addTo(grupoVidrio);
marcador12.addTo(grupoDificilReciclaje);
marcador12.addTo(grupoPlasticos);

marcador12.bindPopup("<h3> Contenedor de reciclaje K </h3>  <p> Con cordenadas : 20.567004373533045, -103.22994141729409</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador12.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_metal, img_vidrio, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true,"Contenedores K")
    grafica(['Metal', 'Vidrio', 'Plasticos', 'Dificil Reciclaje'])

});


var marcador13 =  L.marker([20.566560166194456, -103.2258512664946],{icon: customIcon});
marcador13.addTo(grupoMetal);
marcador13.addTo(grupoVidrio);
marcador13.addTo(grupoDificilReciclaje);
marcador13.addTo(grupoPlasticos);

marcador13.bindPopup("<h3> Contenedor de reciclaje L </h3>  <p> Con cordenadas : 20.566560166194456, -103.2258512664946</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador13.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_plasticos, img_metal, img_vidrio, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores L")
    grafica(['Plasticos', 'Metal', 'Vidrio', 'Dificil Reciclaje'])

});


var marcador14 =  L.marker([20.56660798126268, -103.22758511374145],{icon: customIcon});

marcador14.addTo(grupoMetal);
marcador14.addTo(grupoVidrio);
marcador14.addTo(grupoDificilReciclaje);
marcador14.addTo(grupoPlasticos);

marcador14.bindPopup("<h3> Contenedor de reciclaje M </h3>  <p> Con cordenadas : 20.56660798126268, -103.22758511374145</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador14.on('click', function(e) {

   mostrarCuadroTexto('Contenedores de reciclaje',[img_metal, img_vidrio, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores M")
   grafica(['Metal', 'Vidrio', 'Plasticos', 'Dificil Reciclaje'])
});

var marcador15 = L.marker([20.566429054105644, -103.22697759340359],{icon: customIcon});

marcador15.addTo(grupoMetal);
marcador15.addTo(grupoVidrio);
marcador15.addTo(grupoDificilReciclaje);
marcador15.addTo(grupoPlasticos);

marcador15.bindPopup("<h3> Contenedor de reciclaje N </h3>  <p> Con cordenadas : 20.566429054105644, -103.22697759340359</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador15.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_metal, img_vidrio, img_plasticos,img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores N")
    grafica(['Metal', 'Vidrio', 'Plasticos', 'Dificil Reciclaje'])

});

var marcador16 =  L.marker([20.566374414071444, -103.2278476803845],{icon: customIcon});

marcador16.addTo(grupoMetal);
marcador16.addTo(grupoVidrio);
marcador16.addTo(grupoDificilReciclaje);
marcador16.addTo(grupoPlasticos);
marcador16.addTo(grupoPapel);
marcador16.addTo(grupoOrganicos);

marcador16.bindPopup("<h3> Contenedor de reciclaje U </h3>  <p> Con cordenadas : 20.566374414071444, -103.2278476803845</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador16.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_plasticos, img_vidrio, img_metal, img_organicos, img_papel, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true,"Contenedores U")
    grafica(['Plasticos', 'Vidrio', 'Metal','Organicos','Papel', 'Dificil Reciclaje'])

});

var marcador17 = L.marker([20.56631188320407, -103.22738529234732],{icon: customIcon});

marcador17.addTo(grupoMetal);
marcador17.addTo(grupoVidrio);
marcador17.addTo(grupoDificilReciclaje);
marcador17.addTo(grupoPlasticos);
marcador17.addTo(grupoPapel);
marcador17.addTo(grupoOrganicos);

marcador17.bindPopup("<h3> Contenedor de reciclaje O </h3>  <p> Con cordenadas : 20.56631188320407, -103.22738529234732</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador17.on('click', function(e) {

   mostrarCuadroTexto('Contenedores de reciclaje',[img_papel, img_organicos, img_metal, img_vidrio, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores O")
   grafica(['Papel', 'Organicos', 'Metal', 'Vidrio', 'Plasticos', 'Dificil Reciclaje'])
});

var marcador18 =  L.marker([20.56629947926341, -103.2290175527782],{icon: customIcon});
marcador18.addTo(grupoDificilReciclaje);
marcador18.addTo(grupoPlasticos);
marcador18.addTo(grupoMetal);
marcador18.addTo(grupoVidrio);

marcador18.bindPopup("<h3> Contenedor de reciclaje Q </h3>  <p> Con cordenadas : 20.56629947926341, -103.2290175527782</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador18.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_metal, img_vidrio, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores Q")
    grafica(['Metal', 'Vidrio', 'Plasticos', 'Dificil Reciclaje'])

});

var marcador19 =  L.marker([20.565390042111762, -103.22811060293905],{icon: customIcon});

marcador19.addTo(grupoDificilReciclaje);
marcador19.addTo(grupoPlasticos);
marcador19.addTo(grupoPapel);
marcador19.addTo(grupoOrganicos);

marcador19.bindPopup("<h3> Contenedor de reciclaje R </h3>  <p> Con cordenadas : 20.565390042111762, -103.22811060293905</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador19.on('click', function(e) {
   mostrarCuadroTexto('Contenedores de reciclaje',[img_papel, img_organicos, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true, "Contenedores R")
   grafica(['Papel', 'Organicos', 'Plasticos', 'Dificil Reciclaje'])
});

var marcador20 =  L.marker([20.56556404481185, -103.22716214703281],{icon: customIcon});

marcador20.addTo(grupoDificilReciclaje);
marcador20.addTo(grupoPlasticos);
marcador20.addTo(grupoVidrio);

marcador20.bindPopup("<h3> Contenedor de reciclaje S </h3>  <p> Con cordenadas : </p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador20.on('click', function(e) {

 mostrarCuadroTexto('Contenedores de reciclaje',[img_vidrio, img_plasticos, img_dificil_reclaje],'Puedes reciclar este tipo de residuos', true,  'Contenedores S')
 grafica(['Vidrio','Plasticos','Dificil Reciclaje'])
});

var marcador21 =  L.marker([20.56554834934846, -103.22709039794258],{icon: customIcon});


marcador21.addTo(grupoMetal);
marcador21.addTo(grupoPapel);

marcador21.bindPopup("<h3> Contenedor de reciclaje T </h3>  <p> Con cordenadas : 20.56554834934846, -103.22709039794258</p> <img class='imgbt' src='Images/Botes/img (22).jpg'  /> ")
marcador21.on('click', function(e) {
    mostrarCuadroTexto('Contenedores de reciclaje',[img_papel, img_metal],'Puedes reciclar este tipo de residuos', true,"Contenedores T")
    grafica(['Papel', 'Metal'])

});


grupoPapel.addTo(mapa);
grupoMetal.addTo(mapa);
grupoVidrio.addTo(mapa);
grupoPlasticos.addTo(mapa);
grupoDificilReciclaje.addTo(mapa);

var overlayMaps = {
    "Papel": grupoPapel,
    "Metal": grupoMetal,
    "Vidrio": grupoVidrio,
    "Plásticos": grupoPlasticos,
    "Difícil Reciclaje": grupoDificilReciclaje
};


L.control.layers(null, overlayMaps).addTo(mapa);

//Codigo de  ubicacion  ****************************************************************

if(!navigator.geolocation) {
    console.log("Tu navegador no es compatible con tu geolocalizacion")
}else{
    setInterval(() =>{
        navigator.geolocation.getCurrentPosition(getPosition)

    } ,5000);//Segundos de actualizacion ubicacion esta en 5s

}

var marker , circle;

function getPosition (position){

    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy



     if(marker){
        mapa.removeLayer(marker)
     }
     if(circle){
        mapa.removeLayer(circle)
     }

     marker = L.marker([lat, long])
     circle= L.circle ([lat, long] , {radius:20,accuracy})

     var featureGroup = L.featureGroup([marker,circle]).addTo(mapa).bindPopup("<h3> Tu ubicacion actual </h3>").openPopup()

     mapa.fitBounds(featureGroup.getBounds())

     console.log("Tus coordenadas son :Lat "+lat+"long:"+long+"Accuracy "+accuracy)
    }



//****************************************************
var img_madera = 'Images/madera.png';
var img_metal = 'Images/Metal.png';
var img_organicos = 'Images/organicos.png';
var img_sanitarios = 'Images/sanitarios.png';
var img_dificil_reclaje ='Images/dificil_reciclaje.png';
var img_papel = 'Images/Papel.png';
var img_vidrio = 'Images/Vidrio.png';
var img_plasticos = 'Images/Plasticos.png';
var img_inorganicos = img_dificil_reclaje;
var img_construccion = 'Images/.png';
var img_peligrosos='Images/Peligrosos.png';
var img_unicel='Images/Unicel.png';
var img_textiles='Images/Textiles.png';

function getRandomPercentage() {
  return (Math.random() * 100).toFixed(2);
}

function grafica(tpbt){
    var tpbte = document.getElementById('TpBt');

     while (tpbte.firstChild) {
        tpbte.removeChild(tpbte.firstChild);
    }

    for (var i = 0; i < tpbt.length; i++) {
        var nwop = document.createElement('option');
        nwop.value = tpbt[i];
        nwop.innerHTML=tpbt[i];
        tpbte.appendChild(nwop);
    }


}

function mostrarCuadroTexto(texto, imagenes, informacionAdicional, bote, ubicacion) {
  var cuadroTexto = document.getElementById('cuadroTexto');
  var cuadroreporte = document.getElementById('cuadroreporte');
  var textoCuadro = document.getElementById('textoCuadro');
  var imagenCuadro = document.getElementById('imagenCuadro');
  var informacionCuadro = document.getElementById('informacionCuadro');
  var Etubicacion = document.getElementById('ub');

  textoCuadro.innerHTML = texto;
  imagenCuadro.innerHTML = '';

  ocultarCuadroTexto();
  for (var i = 0; i < imagenes.length; i++) {
    var nuevaImagen = document.createElement('img');
    nuevaImagen.src = imagenes[i];

    if (bote == false) {
      nuevaImagen.alt = 'Imagen del cuadro';
      nuevaImagen.style.width = '100%';
      nuevaImagen.style.height = '90%';
      document.getElementById("imagenCuadro").href = "https://www.google.com.mx/maps/place/CUTONALA+Centro+Universitario+de+Tonal%C3%A1+-+UDG/@20.5664097,-103.2286777,217m/data=!3m1!1e3!4m14!1m7!3m6!1s0x842f4b24202abe73:0xd33161e2e4345862!2sCUTONALA+Centro+Universitario+de+Tonal%C3%A1+-+UDG!8m2!3d20.5666667!4d-103.2286111!16s%2Fg%2F12hy9f77n!3m5!1s0x842f4b24202abe73:0xd33161e2e4345862!8m2!3d20.5666667!4d-103.2286111!16s%2Fg%2F12hy9f77n?entry=ttu";
    } else {
      nuevaImagen.alt = 'Iconos del cuadro';
      nuevaImagen.style.width = '25%';
      nuevaImagen.style.height = '25%';
      cuadroreporte.style.display = 'block';
      Etubicacion.value = ubicacion;
      document.getElementById("imagenCuadro").href = "Others/Infografias.pdf";
    }
    imagenCuadro.appendChild(nuevaImagen);
  }

  informacionCuadro.innerHTML = informacionAdicional;
  cuadroTexto.style.display = 'block';
}

function ocultarCuadroTexto() {
  var cuadroTexto = document.getElementById('cuadroTexto');
  var cuadroreporte = document.getElementById('cuadroreporte');
  
  cuadroTexto.style.display = 'none';
  cuadroreporte.style.display = 'none';
  
}


