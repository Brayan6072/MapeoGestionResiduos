package MpReportes.mcsvreportes.persistence;

import MpReportes.mcsvreportes.DTO.ReportesDTO;
import MpReportes.mcsvreportes.Entities.LocalizacionContenedores;
import MpReportes.mcsvreportes.Entities.Reportes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface ReporteRepository extends JpaRepository<Reportes, Long> {


    @Query(value = "SELECT \n" +
            "\tr.id AS id,\n" +
            "\tr.fecha AS fecha,\n" +
            "\tr.hora AS hora,\n" +
            "\tr.estado AS estado,\n" +
            "\tr.estatus AS estatus,\n" +
            "\tc.nombre AS contenedor,\n" +
            "\tcl.nombre AS clasificacion\n" +
            "\t\n" +
            "FROM \n" +
            "\treportes r\n" +
            "JOIN \n" +
            "\tlocalizacion_contenedores lc ON r.localizacion_contenedores_id = lc.id\n" +
            "JOIN \n" +
            "\tclasificaciones cl ON lc.clasificacion_id = cl.id\n" +
            "JOIN \n" +
            "\tcontenedores c ON lc.contenedor_id = c.id\t\n" +
            "WHERE \n" +
            "\tr.estatus = :status", nativeQuery = true)
    List<Object[]> findReportesByEstatus(@Param("status") String estatus);

    Boolean existsByEstadoAndEstatusAndLocalizacionContenedores(String estado, String estatus, LocalizacionContenedores localizacionContenedores);

    @Query(value = "SELECT \n" +
            "\tcl.nombre AS Clasificacion, \n" +
            "\tCOUNT(*) AS Numero_reportes\n" +
            "FROM \n" +
            "\treportes r\n" +
            "JOIN \n" +
            "\tlocalizacion_contenedores lc ON r.localizacion_contenedores_id = lc.id\n" +
            "JOIN \n" +
            "\tclasificaciones cl ON lc.clasificacion_id = cl.id\n" +
            "WHERE \n" +
            "\tfecha >= CURDATE() - INTERVAL 7 DAY GROUP BY Clasificacion;",nativeQuery = true)
    List<Object[]> countReportesInLastWeek();

    @Query(value = "SELECT \n" +
            "\tcl.nombre AS Clasificacion, \n" +
            "\tCOUNT(*) AS Numero_reportes\n" +
            "FROM \n" +
            "\treportes r\n" +
            "JOIN \n" +
            "\tlocalizacion_contenedores lc ON r.localizacion_contenedores_id = lc.id\n" +
            "JOIN \n" +
            "\tclasificaciones cl ON lc.clasificacion_id = cl.id\n" +
            "WHERE \n" +
            "\tfecha >= CURDATE() - INTERVAL 1 MONTH GROUP BY Clasificacion;", nativeQuery = true)
    List<Object[]> countReportesInLastMonth();

    @Query(value = "SELECT\n" +
            "\t\tc.nombre AS nombre_contenedor, COUNT(*) AS n_reportes\t\n" +
            "FROM \n" +
            "\treportes r\n" +
            "JOIN \n" +
            "\tlocalizacion_contenedores lc ON r.localizacion_contenedores_id = lc.id\n" +
            "JOIN \n" +
            "\tcontenedores c ON lc.contenedor_id = c.id\t\n" +
            "GROUP BY nombre_contenedor ORDER BY n_reportes DESC;", nativeQuery = true)
    List<Object[]> countAllReports();




}
