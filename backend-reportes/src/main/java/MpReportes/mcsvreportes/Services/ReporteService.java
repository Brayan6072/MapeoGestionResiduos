package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.DTO.UsernameDTO;
import MpReportes.mcsvreportes.Entities.Reportes;
import org.springframework.mail.SimpleMailMessage;

import java.time.LocalDate;
import java.util.List;

public interface ReporteService {

    List<Reportes> BuscaReportes();
    public Reportes guardarReporte(Reportes reportes);
    List<Reportes> findAllReportes(String estatus);
    List<UsernameDTO> getAllUsernames();
    public Reportes getId(Long id);
    public Reportes updateEstatus(Reportes reportes);
    List<Reportes> findByClasificacionAndEstadoAndEstatusAndEtiquetau(String clasificacion, String estado, String estatus, String etiquetau);
    List<Object[]> countReportesInLastWeek();
    List<Object[]> countReportesInLastMonth();
}
