package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.Entities.Contenedores;
import MpReportes.mcsvreportes.Entities.LocalizacionContenedores;
import MpReportes.mcsvreportes.Entities.Reportes;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ContenedorService {
    Contenedores createContainer(Contenedores contenedores, MultipartFile imgFile) throws IOException;
    Long findIdByNombre(String nombreContenedor);
    int deleteById(int id);
    List<Contenedores> findContenedores();
    List<Object[]> CountReportsByContainer(String ContainerName);
    boolean existsByNombre (String contenedorName);
}
