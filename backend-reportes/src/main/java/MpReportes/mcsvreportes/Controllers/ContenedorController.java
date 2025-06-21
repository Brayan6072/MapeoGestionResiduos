package MpReportes.mcsvreportes.Controllers;

import MpReportes.mcsvreportes.Entities.Contenedores;
import MpReportes.mcsvreportes.Services.ContenedorService;
import MpReportes.mcsvreportes.Services.ContenedorServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@CrossOrigin(value = "*")
@RequestMapping("/contenedores")
public class ContenedorController {

    private final ContenedorServiceImpl contenedorService;

    public ContenedorController(ContenedorServiceImpl contenedorService) {
        this.contenedorService = contenedorService;
    }
    /*crea una ubicacion donde se encuentran los contenedores*/
    @PostMapping("/create")
    public ResponseEntity<?> createContenedor(@RequestPart("contenedores") Contenedores contenedores, @RequestPart("imgFile") MultipartFile imgFile) throws IOException {

        return ResponseEntity.ok(contenedorService.createContainer(contenedores, imgFile));

//        {
//            "nombre": "Contenedor V2",
//            "longitud": "-103.225546",
//            "latitud": "20.566823"
//        }


    }
    /*Obtener el Id del contenedor segun el nombre*/
    @GetMapping("/get/{nombreContenedor}")
    public ResponseEntity<?> findIdByNombre(@PathVariable String nombreContenedor){
        return ResponseEntity.ok(contenedorService.findIdByNombre(nombreContenedor));
    }
    /*Obtiene todas las ubicaciones agregadas(tabla contenedores)*/
    @GetMapping("/findContainers")
    public ResponseEntity<?> findContainers(){
        return ResponseEntity.ok(contenedorService.findContenedores());
    }

    @GetMapping("/CountReportsByContainer/{ContainerName}")
    public  ResponseEntity<?> CountReportsByContainer(@PathVariable String ContainerName){
        return ResponseEntity.ok(contenedorService.CountReportsByContainer(ContainerName));
    }

}
