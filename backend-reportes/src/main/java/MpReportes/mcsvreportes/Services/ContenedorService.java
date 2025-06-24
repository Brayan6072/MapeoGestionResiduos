package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.Entities.Contenedores;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ContenedorService {
    Contenedores createContainer(Contenedores contenedores, MultipartFile imgFile) throws IOException;
    Long findIdByNombre(String nombreContenedor);
    int deleteById(int id);

    List<Object[]> CountReportsByContainer(String ContainerName);
    boolean existsByNombre (String contenedorName);
    Contenedores getContainerById(Long id, String is_available);
    List<Contenedores> findAllByIsAvailable();

}
