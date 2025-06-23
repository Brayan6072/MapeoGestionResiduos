package MpReportes.mcsvreportes.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Entity
@Table(name = "localizacion_contenedores")
@AllArgsConstructor
@NoArgsConstructor
public class LocalizacionContenedores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "contenedor_id", nullable = false)
    private Contenedores contenedores;


    @ManyToOne
    @JoinColumn(name = "clasificacion_id", nullable = false)
    private Clasificaciones clasificaciones;

    public Clasificaciones getClasificaciones() {
        return clasificaciones;
    }

    @Column(name = "isAvailable")
    private String isAvailable = "Activo";

    public void setClasificaciones(Clasificaciones clasificaciones) {
        this.clasificaciones = clasificaciones;
    }

    public Contenedores getContenedores() {
        return contenedores;
    }

    public void setContenedores(Contenedores contenedores) {
        this.contenedores = contenedores;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(String isAvailable) {
        this.isAvailable = isAvailable;
    }
}
