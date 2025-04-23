package MpReportes.mcsvreportes.Controllers;

import MpReportes.mcsvreportes.DTO.*;
import MpReportes.mcsvreportes.Entities.*;
import MpReportes.mcsvreportes.Services.*;
import org.apache.http.protocol.HTTP;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(value = "*")
@RequestMapping("/contenedores/ubicaciones")
public class UbicacionesController {

    private final UbicacionServiceImpl ubicacionService;
    private final ContenedorServiceImpl contenedorService;

    public UbicacionesController(UbicacionServiceImpl ubicacionService, ContenedorServiceImpl contenedorService) {
        this.ubicacionService = ubicacionService;
        this.contenedorService = contenedorService;

    }
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
    public ResponseEntity<?> agregarLocalizacion(@RequestBody UbicacionDTO ubicacionDTO){
        Long id = contenedorService.findIdByNombre(ubicacionDTO.getContenedores().getNombre());

        if(id == null){
            contenedorService.createContainer(ubicacionDTO.getContenedores());
            id = contenedorService.findIdByNombre(ubicacionDTO.getContenedores().getNombre());
            ubicacionDTO.getLocalizacionDTO().setContenedor_id(id);
            ubicacionService.addLocation(ubicacionDTO.getLocalizacionDTO());
            return ResponseEntity.ok().body(ubicacionDTO.getContenedores());
        }else{
            return ResponseEntity.ok().body("Error al agregar la ubicacion");
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
    }

    /*angular*/
    @DeleteMapping("/deleteUbicacion/{contenedor_id}")
    public ResponseEntity<?> delete(@PathVariable int contenedor_id){
        ubicacionService.deleteByContenedor_id(contenedor_id);
        return ResponseEntity.ok(contenedorService.deleteById(contenedor_id));
        /*
        {
            "id": 10
        }
        */

    }



}
