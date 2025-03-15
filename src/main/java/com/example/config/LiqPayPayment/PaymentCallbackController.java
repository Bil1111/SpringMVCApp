package com.example.config.LiqPayPayment;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentCallbackController {

    @PostMapping("/payment/callback")
    public void handleCallback(
            @RequestParam("data") String data,
            @RequestParam("signature") String signature) {
        System.out.println("Отримано callback: data=" + data + ", signature=" + signature);
        // Додайте логіку перевірки підпису за допомогою LiqPay SDK
    }
}