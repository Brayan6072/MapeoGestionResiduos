package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.Entities.Contenedores;
import MpReportes.mcsvreportes.Entities.LocalizacionContenedores;
import MpReportes.mcsvreportes.persistence.ContenedoresRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContenedorServiceImpl implements ContenedorService{

    @Autowired
    private ContenedoresRepository contenedoresRepository;

    @Override
    public Contenedores createContainer(Contenedores contenedores) {
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
    public List<Contenedores> findContenedores() {
        return contenedoresRepository.findAll();
    }


}
