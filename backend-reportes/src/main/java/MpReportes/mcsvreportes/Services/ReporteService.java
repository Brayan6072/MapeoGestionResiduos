package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.DTO.ReportesDTO;
import MpReportes.mcsvreportes.DTO.UsernameDTO;
import MpReportes.mcsvreportes.Entities.Reportes;

import java.util.List;

public interface ReporteService {

    List<Reportes> BuscaReportes();
    public Reportes guardarReporte(Reportes reportes);
    List<Object[]> findAllReportes(String estatus);
    List<UsernameDTO> getAllUsernames();
    public Reportes getId(Long id);
    public Reportes updateEstatus(Reportes reportes);

    Boolean ExistReport(Reportes reportes);

    //    List<Reportes> findByClasificacionAndEstadoAndEstatusAndEtiquetau(String clasificacion, String estado, String estatus, String etiquetau);
    List<Object[]> countReportesInLastWeek();
    List<Object[]> countReportesInLastMonth();
    List<Object[]> countAllReports();


}
