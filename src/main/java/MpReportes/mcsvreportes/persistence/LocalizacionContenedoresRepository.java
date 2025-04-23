package MpReportes.mcsvreportes.persistence;

import MpReportes.mcsvreportes.DTO.ContenedoresDTO;
import MpReportes.mcsvreportes.DTO.LocalizacionDTO;
import MpReportes.mcsvreportes.Entities.LocalizacionContenedores;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface LocalizacionContenedoresRepository extends JpaRepository<LocalizacionContenedores, Long> {

    @Query(value = "SELECT clasificaciones.nombre AS clasificacion " +
            "FROM localizacion_contenedores " +
            "INNER JOIN clasificaciones ON localizacion_contenedores.clasificacion_id = clasificaciones.id " +
            "INNER JOIN contenedores ON localizacion_contenedores.contenedor_id = contenedores.id " +
            "WHERE contenedores.nombre = :contenedorNombre", nativeQuery = true)
    List<Object[]> findClasificacionesByContenedorNombre(@Param("contenedorNombre") String contenedorNombre);

    @Query(value = "SELECT \n" +
            "    c.nombre AS nombre_contenedor,\n" +
            "    c.latitud,\n" +
            "    c.longitud,\n" +
            "    GROUP_CONCAT(cl.nombre SEPARATOR ', ') AS clasificacion\n" +
            "FROM \n" +
            "    contenedores c\n" +
            "JOIN \n" +
            "    localizacion_contenedores cc ON c.id = cc.contenedor_id\n" +
            "JOIN \n" +
            "    clasificaciones cl ON cc.clasificacion_id = cl.id\n" +
            "GROUP BY \n" +
            "    c.id, c.nombre, c.latitud, c.longitud;", nativeQuery = true)
    List<Object[]> getContenedoresConClasificaciones();

    @Modifying
    @Query(value = "DELETE FROM localizacion_contenedores WHERE contenedor_id = :contenedor_id", nativeQuery = true)
    int deleteByContenedor_id(@Param("contenedor_id") int contenedor_id);

}
