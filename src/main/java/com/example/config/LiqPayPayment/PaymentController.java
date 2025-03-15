package com.example.config.LiqPayPayment;

import com.liqpay.LiqPay;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/pay")
public class PaymentController {

    private static final String PUBLIC_KEY="sandbox_i20120828333";

    private static final String PRIVATE_KEY="sandbox_obLr17haSNFwBSjBTA60RR9TTMHJs56vLdxaSyB7";

    @GetMapping
    public ResponseEntity<String> generatePaymentForm(@RequestParam("amount") String amount,
                                                      @RequestParam("description") String description) {
        LiqPay liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);

        Map<String, String> params = new HashMap<>();
        params.put("action", "pay");
        params.put("amount", amount);
        params.put("currency", "UAH");
        params.put("description", description);
        params.put("order_id", "order_" + System.currentTimeMillis());
        params.put("sandbox", "1");
        params.put("language", "uk");

        // Генеруємо HTML-форму для платежу
        String paymentForm = liqpay.cnb_form(params);
        System.out.println("HTML-форма: " + paymentForm);

        return ResponseEntity.ok(paymentForm);
    }
}