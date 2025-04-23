package MpReportes.mcsvreportes.DTO;

import MpReportes.mcsvreportes.Entities.Clasificaciones;
import MpReportes.mcsvreportes.Entities.Contenedores;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocalizacionDTO {

    private Long id;
    private Long contenedor_id;
    private List<Long> clasificacion_id = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContenedor_id() {
        return contenedor_id;
    }

    public void setContenedor_id(Long contenedor_id) {
        this.contenedor_id = contenedor_id;
    }

    public List<Long> getClasificacion_id() {
        return clasificacion_id;
    }

    public void setClasificacion_id(List<Long> clasificacion_id) {
        this.clasificacion_id = clasificacion_id;
    }
}


