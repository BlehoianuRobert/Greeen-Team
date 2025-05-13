package com.unitime.unitime.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TaskResponse {
    private Long id;
    private String name;
    private String description;
    private String label;
    private LocalDate dueDate;
}
