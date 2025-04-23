package MpReportes.mcsvreportes.persistence;

import MpReportes.mcsvreportes.DTO.ContenedoresDTO;
import MpReportes.mcsvreportes.Entities.Contenedores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ContenedoresRepository extends JpaRepository<Contenedores, Long> {
    @Query(value = "SELECT id FROM contenedores WHERE contenedores.nombre = :nombreContenedor", nativeQuery = true)
    Long findIdByNombre(@Param("nombreContenedor") String nombreContenedor);

    @Modifying
    @Query(value = "DELETE FROM contenedores WHERE id = :id", nativeQuery = true)
    int deleteById(@Param("id") int id);

}
