package MpReportes.mcsvreportes.DTO;

import MpReportes.mcsvreportes.Entities.Contenedores;
import jakarta.persistence.Entity;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UbicacionDTO {
    private Contenedores contenedores;
    private LocalizacionDTO localizacionDTO;

    public Contenedores getContenedores() {
        return contenedores;
    }

    public void setContenedores(Contenedores contenedores) {
        this.contenedores = contenedores;
    }

    public LocalizacionDTO getLocalizacionDTO() {
        return localizacionDTO;
    }

    public void setLocalizacionDTO(LocalizacionDTO localizacionDTO) {
        this.localizacionDTO = localizacionDTO;
    }
}
