package com.unitime.unitime.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public class OrarRequest {
    @NotBlank(message = "Titlu must not be blank")
    private String titlu;

    @NotBlank(message = "Descriere must not be blank")
    private String descriere;

    @NotBlank(message = "Locatie must not be blank")
    private String locatie;

    @NotNull(message = "Data is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;

    @NotNull(message = "Ora is required")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime ora;

    public String getTitlu() {
        return titlu;
    }
    public void setTitlu(String titlu) {
        this.titlu = titlu;
    }

    public String getDescriere() {
        return descriere;
    }
    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getLocatie() {
        return locatie;
    }
    public void setLocatie(String locatie) {
        this.locatie = locatie;
    }

    public LocalDate getData() {
        return data;
    }
    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getOra() {
        return ora;
    }
    public void setOra(LocalTime ora) {
        this.ora = ora;
    }
}
