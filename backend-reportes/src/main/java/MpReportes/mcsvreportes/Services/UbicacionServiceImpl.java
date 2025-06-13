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


}
