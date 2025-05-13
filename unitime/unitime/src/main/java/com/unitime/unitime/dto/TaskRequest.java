package com.unitime.unitime.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public class TaskRequest {
    private String name;
    private String description;
    private String label;
    @JsonFormat(pattern = "yyyy-MM-dd")  // pentru a parsa corect datele trimise de input[type=date]
    private LocalDate dueDate;

    // getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
}
