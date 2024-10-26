package com.example.config.users;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Вимикаємо CSRF для спрощення (можна залишити увімкненим, якщо потрібно)
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/users/register", "/login", "/register", "/first/hello", "/").permitAll() // Додаємо виключення для публічних сторінок
                        .anyRequest().authenticated() // Інші запити вимагають авторизації
                )
                .formLogin(form -> form
                        .loginPage("/login") // Вказуємо свою сторінку логіну
                        .defaultSuccessUrl("/dashboard", true) // Сторінка після успішного логіну
                        .permitAll() // Доступ до сторінки логіну дозволено всім
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // URL для логауту
                        .logoutSuccessUrl("/login?logout") // Після логауту перенаправлення на сторінку логіну
                        .permitAll() // Логаут доступний всім
                )
                .httpBasic(); // Вмикаємо HTTP Basic для базової авторизації (опціонально)

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}