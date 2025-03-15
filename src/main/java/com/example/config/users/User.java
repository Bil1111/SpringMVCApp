package com.example.config.users;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
public class User {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(columnDefinition = "VARCHAR(50)")
    @NotEmpty(message = "Ім'я не може бути порожнім")
    private String lastIp;

    @Setter
    @Getter
    @Column(columnDefinition = "VARCHAR(50)")
    @NotEmpty(message = "Ім'я не може бути порожнім")
    private String firstName;

    @Getter
    @Setter
    @Column(columnDefinition = "VARCHAR(50)")
    @NotEmpty(message = "Прізвище не може бути порожнім")
    private String lastName;

    @Setter
    @Getter
    @Column(columnDefinition = "VARCHAR(255)")
    @NotEmpty(message = "Email не може бути порожнім")
    @Email(message = "Введіть дійсний email")
    private String email;

    @Setter
    @Getter
    @Column(columnDefinition = "VARCHAR(20)")
    @NotEmpty(message = "Номер телефону не може бути порожнім")
    private String phoneNumber;

    @Getter
    @Setter
    @Column(columnDefinition = "VARCHAR(255)")
    @NotEmpty(message = "Логін не може бути порожнім")
    private String login;

    @Setter
    @Getter
    @Column(columnDefinition = "VARCHAR(255)")
    @NotEmpty(message = "Пароль не може бути порожнім")
    @Size(min = 6, message = "Пароль має містити не менше 6 символів")
    private String password;

    @Setter
    @Getter
    @Column(unique = true, length = 2048)
    private String authToken;
    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String firstName,String lastName,String email,String phoneNumber, String login, String encodedPassword, Role role) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email = email;
        this.phoneNumber=phoneNumber;
        this.login=login;
        this.password = encodedPassword;
        this.role=role;
    }

    public User() {

    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", authToken='" + authToken + '\'' +
                ", role=" + role +
                '}';
    }
}