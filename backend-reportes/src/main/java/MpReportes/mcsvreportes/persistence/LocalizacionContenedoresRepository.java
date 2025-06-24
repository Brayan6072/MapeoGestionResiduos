package MpReportes.mcsvreportes.persistence;

import MpReportes.mcsvreportes.DTO.ContenedoresDTO;
import MpReportes.mcsvreportes.DTO.LocalizacionDTO;
import MpReportes.mcsvreportes.Entities.Clasificaciones;
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

    @Query(value = "SELECT clasificaciones.id AS id, clasificaciones.nombre AS clasificacion\n" +
            "FROM localizacion_contenedores \n" +
            "INNER JOIN clasificaciones ON localizacion_contenedores.clasificacion_id = clasificaciones.id \n" +
            "INNER JOIN contenedores ON localizacion_contenedores.contenedor_id = contenedores.id \n" +
            "WHERE contenedores.nombre = :contenedorNombre AND localizacion_contenedores.is_available = 'Activo';", nativeQuery = true)
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
            "    clasificaciones cl ON cc.clasificacion_id = cl.id     \n" +
            "WHERE cc.is_available = 'Activo'  AND c.is_available = 'Activo'  \n" +
            "GROUP BY \n" +
            "    c.id, c.nombre, c.latitud, c.longitud;", nativeQuery = true)
    List<Object[]> getContenedoresConClasificaciones();

    @Modifying
    @Query(value = "DELETE FROM localizacion_contenedores WHERE contenedor_id = :contenedor_id", nativeQuery = true)
    int deleteByContenedor_id(@Param("contenedor_id") int contenedor_id);

    @Query(value = "SELECT id\n" +
            "FROM localizacion_contenedores  WHERE contenedor_id = :contenedor_id AND clasificacion_id = :clasificacion_id", nativeQuery = true)
    Long findIdLocalizacion (@Param("contenedor_id") Long contenedor_id, @Param("clasificacion_id") Long clasificacion_id);


    @Query(value = "SELECT lc.id AS ubicacion_id, c.nombre AS clasificacion\n" +
            "FROM localizacion_contenedores lc \n" +
            "JOIN clasificaciones c ON lc.clasificacion_id = c.id\n" +
            "JOIN contenedores ct ON lc.contenedor_id = ct.id\n" +
            "WHERE ct.nombre = :contenedorName AND lc.is_available = 'Activo';", nativeQuery = true)
    List<Object[]> ClasificacionesByContenedor (@Param("contenedorName") String contenedorName);

    @Modifying
    @Query(value = "UPDATE localizacion_contenedores SET is_available = :is_available WHERE contenedor_id = :contenedor_id AND clasificacion_id = :clasificacion_id", nativeQuery = true)
    void updateIsAvailable (@Param("is_available") String is_available, @Param("contenedor_id") Long contenedor_id, @Param("clasificacion_id") Long clasificacion_id);

    @Modifying
    @Query(value = "UPDATE localizacion_contenedores SET is_available = :is_available WHERE contenedor_id = :contenedor_id", nativeQuery = true)
    void updateAllAvailable (@Param("is_available") String is_available, @Param("contenedor_id") Long contenedor_id);



    @Query(value = "SELECT is_available FROM localizacion_contenedores lc WHERE lc.contenedor_id = :contenedor_id AND lc.clasificacion_id = :clasificacion_id", nativeQuery = true)
    String findIsAvailable (@Param("contenedor_id") Long contenedor_id, @Param("clasificacion_id") Long clasificacion_id);

}
