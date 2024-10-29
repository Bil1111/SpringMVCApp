package com.example.config.map;

public class Establishment {
    private String name;
    private double lat;
    private double lng;
    private String address;
    private String phone;
    private String image;

    // Конструктор
    public Establishment(String name, double lat, double lng, String address, String phone, String image) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.phone = phone;
        this.image = image;
    }

    // Геттери та сеттери
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }

    public double getLng() { return lng; }
    public void setLng(double lng) { this.lng = lng; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}