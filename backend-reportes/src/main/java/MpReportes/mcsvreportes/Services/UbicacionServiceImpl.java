package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.DTO.LocalizacionDTO;
import MpReportes.mcsvreportes.Entities.Clasificaciones;
import MpReportes.mcsvreportes.Entities.Contenedores;
import MpReportes.mcsvreportes.Entities.LocalizacionContenedores;
import MpReportes.mcsvreportes.persistence.ClasificacionesRepository;
import MpReportes.mcsvreportes.persistence.ContenedoresRepository;
import MpReportes.mcsvreportes.persistence.LocalizacionContenedoresRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UbicacionServiceImpl implements UbicacionService{


    private final LocalizacionContenedoresRepository localizacionContenedoresRepository;
    private final ContenedoresRepository contenedoresRepository;
    private final ClasificacionesRepository clasificacionesRepository;

    public UbicacionServiceImpl(LocalizacionContenedoresRepository localizacionContenedoresRepository, ContenedoresRepository contenedoresRepository, ClasificacionesRepository clasificacionesRepository) {
        this.localizacionContenedoresRepository = localizacionContenedoresRepository;
        this.contenedoresRepository = contenedoresRepository;
        this.clasificacionesRepository = clasificacionesRepository;
    }


    @Override
    public List<Object[]> ClasificacionesByContenedor(String contenedorName) {
        return localizacionContenedoresRepository.ClasificacionesByContenedor(contenedorName);
    }

    @Override
    public Long findIdLocalizacion(Long contenedor_id, Long clasificacion_id) {
        return localizacionContenedoresRepository.findIdLocalizacion(contenedor_id, clasificacion_id);
    }

    @Override
    public List<Object[]> findClasificacionesByContenedorNombre(String contenedorNombre) {
        return localizacionContenedoresRepository.findClasificacionesByContenedorNombre(contenedorNombre);
    }

    @Override
    public List<Object[]> getContenedoresConClasificaciones() {
        return  localizacionContenedoresRepository.getContenedoresConClasificaciones();
    }

    @Override
    public LocalizacionContenedores createLocalizacion(LocalizacionContenedores localizacionContenedores) {
        return localizacionContenedoresRepository.save(localizacionContenedores);
    }

    @Override
    public List<LocalizacionContenedores> addLocation(LocalizacionDTO localizacionDTO) {
        Contenedores contenedor = contenedoresRepository.findById(localizacionDTO.getContenedor_id())
                .orElseThrow(() -> new RuntimeException("Contenedor no encontrado"));

        List<LocalizacionContenedores> localizacionesGuardadas = new ArrayList<>();

        for (Long clasificacionId : localizacionDTO.getClasificacion_id()) {
            Clasificaciones clasificacion = clasificacionesRepository.findById(clasificacionId)
                    .orElseThrow(() -> new RuntimeException("Clasificación no encontrada"));

            LocalizacionContenedores localizacion = new LocalizacionContenedores();
            localizacion.setContenedores(contenedor);
            localizacion.setClasificaciones(clasificacion);

            localizacionesGuardadas.add(localizacionContenedoresRepository.save(localizacion));
        }

        return localizacionesGuardadas;
    }

    @Transactional
    @Override
    public int deleteByContenedor_id(int contenedor_id) {
        return localizacionContenedoresRepository.deleteByContenedor_id(contenedor_id);
    }


    @Transactional
    @Override
    public void UpdateClasificaciones(LocalizacionDTO localizacionDTO) {

        updateAllAvailable("Inactivo", localizacionDTO.getContenedor_id());

        List<Long> addClasificaciones = new ArrayList<>();

        for(Long clasificacion_id : localizacionDTO.getClasificacion_id()) {

            String is_available = findIsAvailable(localizacionDTO.getContenedor_id(), clasificacion_id);

            if (is_available == null) {
                addClasificaciones.add(clasificacion_id);
            } else if ("Inactivo".equals(is_available)) {
                updateIsAvailable("Activo", localizacionDTO.getContenedor_id(), clasificacion_id);
            } else if (is_available.isEmpty()) {
                addClasificaciones.add(clasificacion_id);
            }
        }

        if (!addClasificaciones.isEmpty()) {
            localizacionDTO.setClasificacion_id(addClasificaciones);
            addLocation(localizacionDTO);
        }
    }

    @Transactional
    @Override
    public String findIsAvailable(Long contenedor_id, Long clasificacion_id) {
        return localizacionContenedoresRepository.findIsAvailable(contenedor_id, clasificacion_id);
    }
    @Transactional
    @Override
    public void updateIsAvailable(String is_available, Long contenedor_id, Long clasificacion_id) {
        localizacionContenedoresRepository.updateIsAvailable(is_available, contenedor_id, clasificacion_id);
    }
    @Transactional
    @Override
    public void updateAllAvailable(String is_available, Long contenedor_id) {
        localizacionContenedoresRepository.updateAllAvailable(is_available, contenedor_id);
    }


}
