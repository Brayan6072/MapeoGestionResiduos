package MpReportes.mcsvreportes.Controllers;

import MpReportes.mcsvreportes.DTO.*;
import MpReportes.mcsvreportes.Entities.*;
import MpReportes.mcsvreportes.Services.*;
import org.apache.http.protocol.HTTP;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@CrossOrigin(value = "*")
@RequestMapping("/ubicaciones")
public class UbicacionesController {

    private final UbicacionServiceImpl ubicacionService;
    private final ContenedorServiceImpl contenedorService;

    public UbicacionesController(UbicacionServiceImpl ubicacionService, ContenedorServiceImpl contenedorService) {
        this.ubicacionService = ubicacionService;
        this.contenedorService = contenedorService;

    }
    /*Recupera el id de una ubicacion, para saber a que contenedor de ubicacion se esta referenciando*/
    @GetMapping("/getIdLocalizacion")
    public ResponseEntity<?> getIdLocalizacion(@RequestParam("contenedor_id") Long contenedor_id, @RequestParam("clasificacion_id") Long clasificacion_id){
        return ResponseEntity.ok(ubicacionService.findIdLocalizacion(contenedor_id, clasificacion_id));
    }
    /* Ejemplo de url con request Param
    /getIdLocalizacion?contenedor_id=1&clasificacion_id=2
    */

    /*Busca todos los contenedores con todas sus clasificaciones*/
    @GetMapping("/clasificaciones")
    public ResponseEntity<?> getContenedoresConClasificaciones(){
        return ResponseEntity.ok(ubicacionService.getContenedoresConClasificaciones());
    }

    /*Buca todas las clasificaciones de un contenedor */
    @GetMapping("/clasificaciones/{contenedornombre}")
    public ResponseEntity<?> clasificaciones(@PathVariable String contenedornombre){
        return ResponseEntity.ok(ubicacionService.findClasificacionesByContenedorNombre(contenedornombre));
    }
    /*Crea una ubicacion pero con una unica clasificacion*/
    @PostMapping("/create")
    public ResponseEntity<?> createLocalizacion(@RequestBody LocalizacionContenedores localizacionContenedores){
        return ResponseEntity.ok(ubicacionService.createLocalizacion(localizacionContenedores));

    }

    @PostMapping("/add")
    public ResponseEntity<?> addContenedor(@RequestBody LocalizacionDTO localizacionDTO){
        return ResponseEntity.ok(ubicacionService.addLocation(localizacionDTO));
    }
    @PostMapping("/addContenedores")
    public ResponseEntity<?> agregarLocalizacion(
            @RequestPart("ubicacionDTO") UbicacionDTO ubicacionDTO,
            @RequestPart("imgFile") MultipartFile imgFile) throws IOException {

        if (contenedorService.existsByNombre(ubicacionDTO.getContenedores().getNombre())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Ya existe una ubicación con ese nombre");
        }

        try {
            Contenedores contenedor = contenedorService.createContainer(ubicacionDTO.getContenedores(), imgFile);
            ubicacionDTO.getLocalizacionDTO().setContenedor_id(contenedor.getId());
            ubicacionService.addLocation(ubicacionDTO.getLocalizacionDTO());

            return ResponseEntity.ok().body(contenedor);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error al procesar la solicitud");
        }
    }
        /*angular/postman

        {
            "contenedores": {
                    "id": 104,
                    "nombre": "Contenedores ASD",
                    "longitud": "-103.225546",
                    "latitud": "20.566823"
                },
            "localizacionDTO":{
                "contenedor_id": 104,
                "clasificacion_id": [1,2]

            }
        }
        */


    /*angular*/
    @DeleteMapping("/deleteUbicacion/{contenedor_id}")
    public ResponseEntity<?> delete(@PathVariable int contenedor_id){
        ubicacionService.deleteByContenedor_id(contenedor_id);
        return ResponseEntity.ok(contenedorService.deleteById(contenedor_id));


    }
    @GetMapping("/UbicacionContenedor/{contenedorName}")
    public ResponseEntity<?> ClasificacionesByContenedor(@PathVariable("contenedorName") String contenedorName){
        return ResponseEntity.ok(ubicacionService.ClasificacionesByContenedor(contenedorName));
    }

    @PutMapping("/UpdateClasificaciones")
    public ResponseEntity<?> UpdateClasificaciones(@RequestBody LocalizacionDTO localizacionDTO){
        ubicacionService.UpdateClasificaciones(localizacionDTO);
        return ResponseEntity.ok().body("Clasificaciones actualizadas");
    }

}
