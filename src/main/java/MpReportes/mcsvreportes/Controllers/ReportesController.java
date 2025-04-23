package MpReportes.mcsvreportes.Controllers;

import MpReportes.mcsvreportes.Client.FirebaseUserService;
import MpReportes.mcsvreportes.Entities.Reportes;
import MpReportes.mcsvreportes.Services.ReporteService;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin(value = "*")
@RequestMapping("/reportes")
public class ReportesController {

    @Autowired
    private ReporteService reporteService;
    @Autowired
    private final FirebaseUserService firebaseUserService;

    public ReportesController(FirebaseUserService firebaseUserService) {
        this.firebaseUserService = firebaseUserService;
    }


    @PostMapping("/reportar")
    public ResponseEntity<?> Reportar(@RequestBody Reportes reportes) {

        List<Reportes> reportexist = reporteService.findByClasificacionAndEstadoAndEstatusAndEtiquetau(
                reportes.getClasificacion(), reportes.getEstado(), reportes.getEstatus(), reportes.getEtiquetau()
        );

        if (reportexist.isEmpty()) {

          //  System.out.println(reportes);
            System.out.println("No repetido");
            return ResponseEntity.ok(reporteService.guardarReporte(reportes));
        } else {
            System.out.println("Repetido");
            return ResponseEntity.ok("Repetido");
        }
        /*

        {
            "fecha": "2025-04-13",
            "hora": "20:09:36.002",
            "estado": "Lleno",
            "estatus": "Rojo",
            "etiquetau": "Contenedor U",
            "clasificacion": "Papel"
        }
        */
    }
    /*Busca todos reportes segun el estatus*/
    @GetMapping("/search-estatus/{estatus}")
    public ResponseEntity<?> findByEstatus(@PathVariable String estatus){
        return ResponseEntity.ok(reporteService.findAllReportes(estatus));
    }


    @GetMapping("/search-all-email")
    public ResponseEntity<?> getAllUsernames() throws FirebaseAuthException {
        return ResponseEntity.ok(firebaseUserService.getAllUserEmails());
    }
    /*Busca el reporte por el id*/
    @GetMapping("/getid/{id}")
    public  ResponseEntity<?> findReporteById(@PathVariable Long id){
        return ResponseEntity.ok(reporteService.getId(id));
    }

    /*Actualiza el estatus del reporte a Verde*/
    @GetMapping("/update/{id}")
    public ResponseEntity<?> UpdateEstatus(@PathVariable Long id){

        Reportes reportesExist = reporteService.getId(id);
        reportesExist.setEstatus("Verde");
        return ResponseEntity.ok(reporteService.updateEstatus(reportesExist));
    }
    /*Reportes de la ultima semana*/
    @GetMapping("/CountLastWeek")
    public  ResponseEntity<?> CountLastWeek(){

        return ResponseEntity.ok(reporteService.countReportesInLastWeek());
    }
    /*Reportes del ultimo mes*/
    @GetMapping("/CountLastMonth")
    public ResponseEntity<?> CountLastMonth(){
        return ResponseEntity.ok(reporteService.countReportesInLastMonth());
    }

}
