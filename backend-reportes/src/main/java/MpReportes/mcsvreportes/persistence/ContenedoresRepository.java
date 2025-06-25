package MpReportes.mcsvreportes.persistence;

import MpReportes.mcsvreportes.Entities.Contenedores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContenedoresRepository extends JpaRepository<Contenedores, Long> {
    @Query(value = "SELECT id FROM contenedores WHERE contenedores.nombre = :nombreContenedor", nativeQuery = true)
    Long findIdByNombre(@Param("nombreContenedor") String nombreContenedor);

    @Modifying
    @Query(value = "DELETE FROM contenedores WHERE id = :id", nativeQuery = true)
    int deleteById(@Param("id") int id);

    @Query(value = "SELECT \n" +
            "    c.nombre AS nombre_contenedor,    \n" +
            "    cl.nombre AS nombre_clasificacion,\n" +
            "    COUNT(r.id) AS cont_reportes\n" +
            "FROM \n" +
            "    contenedores c\n" +
            "JOIN \n" +
            "    localizacion_contenedores lc ON c.id = lc.contenedor_id\n" +
            "JOIN \n" +
            "    clasificaciones cl ON lc.clasificacion_id = cl.id\n" +
            "LEFT JOIN \n" +
            "    reportes r ON lc.id = r.localizacion_contenedores_id\n" +
            "    AND r.fecha >= CURDATE() - INTERVAL 2 MONTH \n" +
            "WHERE c.nombre = :ContainerName\n" +
            "GROUP BY \n" +
            "    c.id, c.nombre, cl.id, cl.nombre\n" +
            "ORDER BY \n" +
            "    c.id, cl.id;", nativeQuery = true)
    List<Object[]> CountReportsByContainer (@Param("ContainerName") String ContainerName);

    boolean existsByNombre(String contenedorName);

    @Query(value = "SELECT * FROM contenedores WHERE id = :id AND is_available = :is_available", nativeQuery = true)
    Contenedores getContainerById(@Param("id") Long id, @Param("is_available") String is_available);


    @Query(value = "SELECT * FROM contenedores WHERE is_available = 'Activo';", nativeQuery = true)
    List<Contenedores> findAllByIsAvailable();

    @Query(value = "SELECT img FROM contenedores WHERE nombre = :nombre", nativeQuery = true)
    Object[] findImgByName (@Param("nombre") String nombre);
}
