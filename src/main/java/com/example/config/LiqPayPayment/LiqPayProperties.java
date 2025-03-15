package com.example.config.LiqPayPayment;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
@ConfigurationProperties(prefix = "liqpay")
public class LiqPayProperties {
    // Геттери та сеттери
    private String publicKey;
    private String privateKey;
    private boolean sandbox;

}