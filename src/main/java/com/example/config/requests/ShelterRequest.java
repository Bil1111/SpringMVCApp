package com.example.config.requests;

import jakarta.validation.constraints.*;

public class ShelterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Phone number is required")
    private String contactNumber;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;

    @NotBlank(message = "City is required")
    private String city;

    @NotNull(message = "Latitude cannot be null")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

    @NotNull(message = "Longitude cannot be null")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    @NotBlank(message = "Image is required")
    private String imageURL;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "card is required")
    private String card;

    @NotBlank(message = "paypal is required")
    private String paypal;

    @NotBlank(message = "iban is required")
    private String iban;



    // Constructors, Getters, and Setters
    public ShelterRequest() {}

    public ShelterRequest(String name, String address, String contactNumber, String description, String city, Double latitude, Double longitude, String imageURL, String email, String card, String paypal, String iban) {
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
        this.description = description;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageURL = imageURL;
        this.email = email;
        this.card = card;
        this.paypal = paypal;
        this.iban = iban;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public String getPaypal() {
        return paypal;
    }

    public void setPaypal(String paypal) {
        this.paypal = paypal;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }
}
