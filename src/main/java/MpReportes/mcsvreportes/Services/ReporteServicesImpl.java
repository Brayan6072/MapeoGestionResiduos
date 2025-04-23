package MpReportes.mcsvreportes.Services;

import MpReportes.mcsvreportes.Client.FirebaseUserService;
import MpReportes.mcsvreportes.DTO.UsernameDTO;
import MpReportes.mcsvreportes.Entities.Reportes;
import MpReportes.mcsvreportes.persistence.ReporteRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReporteServicesImpl implements ReporteService{

    @Autowired
    private ReporteRepository reporteRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private final FirebaseUserService firebaseUserService;
    @Autowired
    private TemplateEngine templateEngine;

    public ReporteServicesImpl(FirebaseUserService firebaseUserService) {
        this.firebaseUserService = firebaseUserService;
    }

    @Override
    public List<Reportes> BuscaReportes() {
        return reporteRepository.findAll();
    }

    @Override
    public Reportes guardarReporte(Reportes reportes) {
        reportes.setHora(LocalTime.now());
        reportes.setFecha(LocalDate.now());
        reportes.setEstatus("Rojo");

        List<String> destinatarios;
        try {
            destinatarios = firebaseUserService.getAllUserEmails();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        for (String destinatario : destinatarios) {

            try {
                sendEmailWithTemplate(destinatario, reportes.getEtiquetau(), reportes.getClasificacion(), reportes.getEstado());
            } catch (MessagingException e) {
                e.printStackTrace(); }
        }
        return reporteRepository.save(reportes);
    }

    private void sendEmailWithTemplate(String to, String etiquetau, String clasificacion, String estado) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom("brayandelgadodiaz03@gmail.com");
        helper.setTo(to);
        helper.setSubject("Reporte de Incidencia");
        Context context = new Context();
        context.setVariable("etiq", etiquetau);
        context.setVariable("clasif", clasificacion);
        context.setVariable("estado", estado);
        String htmlContent = templateEngine.process("emailTemplate", context);
        helper.setText(htmlContent, true);
        mailSender.send(message);
    }




    @Override
    public List<Reportes> findAllReportes(String estatus) {
        return reporteRepository.findReportesByEstatus(estatus);
    }

    @Override
    public List<UsernameDTO> getAllUsernames() {
        return List.of();
    }

    @Override
    public Reportes getId(Long id) {
        return reporteRepository.findById(id).get();
    }

    @Override
    public Reportes updateEstatus(Reportes reportes) {
        return reporteRepository.save(reportes);
    }

    @Override
    public List<Reportes> findByClasificacionAndEstadoAndEstatusAndEtiquetau(String clasificacion, String estado, String estatus, String etiquetau) {
        return reporteRepository.findByClasificacionAndEstadoAndEstatusAndEtiquetau(clasificacion, estado, estatus, etiquetau);
    }

    @Override
    public List<Object[]> countReportesInLastWeek() {
        return reporteRepository.countReportesInLastWeek();
    }

    @Override
    public List<Object[]> countReportesInLastMonth() {
        return reporteRepository.countReportesInLastMonth();
    }


}
