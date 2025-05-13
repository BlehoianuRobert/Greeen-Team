package com.unitime.unitime.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class OrarResponse {
    private Long id;
    private String titlu;
    private String descriere;
    private String locatie;
    private LocalDate data;
    private LocalTime ora;
}
