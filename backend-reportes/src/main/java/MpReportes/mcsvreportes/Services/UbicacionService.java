package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.DTO.ContenedoresDTO;
import MpReportes.mcsvreportes.DTO.LocalizacionDTO;
import MpReportes.mcsvreportes.Entities.LocalizacionContenedores;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UbicacionService {

    List<Object[]> findClasificacionesByContenedorNombre(String contenedorNombre);
    List<Object[]> getContenedoresConClasificaciones();
    LocalizacionContenedores createLocalizacion(LocalizacionContenedores localizacionContenedores);
    List<LocalizacionContenedores> addLocation(LocalizacionDTO localizacionDTO);
    int deleteByContenedor_id(int contenedor_id);
}
