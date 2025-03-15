package com.example.config.LiqPayPayment;

import com.liqpay.LiqPay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
public class PaymentController {

    @Autowired
    private LiqPay liqPay;

    @GetMapping("/pay")
    public String generatePaymentForm(
            @RequestParam("amount") String amount,
            @RequestParam("description") String description,
            Model model) {

        Map<String, String> params = new HashMap<>();
        params.put("action", "pay"); // Додаємо обов’язковий параметр action
        params.put("amount", amount);
        params.put("currency", "UAH");
        params.put("description", description);
        params.put("order_id", "order_" + System.currentTimeMillis());
        params.put("sandbox", "1");
        params.put("language", "uk"); // Опціонально, для української мови

        try {
            String paymentForm = liqPay.cnb_form(params);
            model.addAttribute("paymentForm", paymentForm);
            return "payment";
        } catch (Exception e) {
            System.err.println("Error generating LiqPay form: " + e.getMessage());
            model.addAttribute("error", "Помилка генерації форми: " + e.getMessage());
            return "error"; // Використовуйте шаблон error.html для відображення помилок
        }
    }
    }

