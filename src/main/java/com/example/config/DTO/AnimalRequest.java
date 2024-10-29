package com.example.config.DTO;

import com.example.config.shelters.Shelter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class AnimalRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Type is required")
    private String type;

    @NotNull(message = "Age is required")
    private Integer age;

    @NotBlank(message = "Size is required")
    private String size;

    @NotNull(message = "Shelter ID is required")
    private Shelter shelter;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;

    public AnimalRequest() {}

    public AnimalRequest(String name, String type, Integer age, String size, Shelter shelter, String description) {
        this.name = name;
        this.type = type;
        this.age = age;
        this.size = size;
        this.shelter = shelter;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Shelter getShelter() {
        return shelter;
    }

    public void setShelter(Shelter shelter) {
        this.shelter = shelter;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}