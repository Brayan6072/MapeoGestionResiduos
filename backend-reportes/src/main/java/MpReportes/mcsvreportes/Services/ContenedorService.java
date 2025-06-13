package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.Entities.Contenedores;
import MpReportes.mcsvreportes.Entities.LocalizacionContenedores;
import MpReportes.mcsvreportes.Entities.Reportes;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContenedorService {
    Contenedores createContainer(Contenedores contenedores);
    Long findIdByNombre(String nombreContenedor);
    int deleteById(int id);
    List<Contenedores> findContenedores();
}
