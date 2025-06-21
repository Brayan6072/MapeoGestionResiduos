package MpReportes.mcsvreportes.ClientApi;

import MpReportes.mcsvreportes.Services.ReporteServicesImpl;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailScheluder {
    @Autowired
    private ReporteServicesImpl reporteServices;
    //cron = second minute hour day month day-of-week
    @Scheduled(cron = "0 14 15 * * *", zone = "America/Mexico_City")
    public void sendEmail(){
        try{
            reporteServices.SendMailAllUsers();
            System.out.println("Correos enviados");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
