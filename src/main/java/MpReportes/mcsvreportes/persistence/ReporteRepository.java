package MpReportes.mcsvreportes.persistence;

import MpReportes.mcsvreportes.Entities.Reportes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository

public interface ReporteRepository extends JpaRepository<Reportes, Long> {

//    @Query("SELECT s FROM Reportes s WHERE s.reporteId = :idReportes")
//    List<Reportes> findAllReportes(Long idReportes);

    List<Reportes> findReportesByEstatus(String estatus);
    List<Reportes> findByClasificacionAndEstadoAndEstatusAndEtiquetau(String clasificacion, String estado, String estatus, String etiquetau);
    @Query(value = "SELECT clasificacion, COUNT(*) AS numero_reportes FROM reportes WHERE fecha >= CURDATE() - INTERVAL 7 DAY GROUP BY clasificacion;",nativeQuery = true)
    List<Object[]> countReportesInLastWeek();

    @Query(value = "SELECT clasificacion, COUNT(*) AS numero_reportes FROM reportes WHERE fecha >= CURDATE() - INTERVAL 1 MONTH GROUP BY clasificacion", nativeQuery = true)
    List<Object[]> countReportesInLastMonth();


}
