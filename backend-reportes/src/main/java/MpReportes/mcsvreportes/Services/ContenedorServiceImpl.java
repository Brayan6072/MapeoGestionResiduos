package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.Entities.Contenedores;
import MpReportes.mcsvreportes.persistence.ContenedoresRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ContenedorServiceImpl implements ContenedorService{

    @Autowired
    private ContenedoresRepository contenedoresRepository;

    @Override
    public Contenedores createContainer(Contenedores contenedores, MultipartFile imgFile) throws IOException {
        contenedores.setImg(imgFile.getBytes());
        return contenedoresRepository.save(contenedores);
    }

    @Override
    public Long findIdByNombre(String nombreContenedor) {
        return contenedoresRepository.findIdByNombre(nombreContenedor);
    }

    @Transactional
    @Override
    public int deleteById(int id) {
        return contenedoresRepository.deleteById(id);
    }



    @Override
    public List<Object[]> CountReportsByContainer(String ContainerName) {
        return contenedoresRepository.CountReportsByContainer(ContainerName);
    }

    @Override
    public boolean existsByNombre(String contenedorName) {
        return contenedoresRepository.existsByNombre(contenedorName);
    }

    @Override
    public Contenedores getContainerById(Long id, String is_available) {
        return contenedoresRepository.getContainerById(id, is_available);
    }

    @Override
    public List<Contenedores> findAllByIsAvailable() {
        return contenedoresRepository.findAllByIsAvailable();
    }



    public Contenedores updateContainer(Long id,String is_available, Contenedores contenedores, MultipartFile imgFile) throws IOException{
        Contenedores updatecontainer =  contenedoresRepository.getContainerById(id, is_available);
        contenedores.setImg(imgFile.getBytes());

        updatecontainer.setNombre(contenedores.getNombre());
        updatecontainer.setLatitud(contenedores.getLatitud());
        updatecontainer.setLongitud(contenedores.getLongitud());
        updatecontainer.setImg(contenedores.getImg());
        updatecontainer.setIs_available(contenedores.getIs_available());

        return contenedoresRepository.save(updatecontainer);
    }
}
