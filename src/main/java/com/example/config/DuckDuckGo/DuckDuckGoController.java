package com.example.config.DuckDuckGo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/duckduckgo")
public class DuckDuckGoController {

    @Autowired
    private  DuckDuckGoService duckDuckGoService;

    @GetMapping("/search")
    public ResponseEntity<DuckDuckGoService.AnswerResponse> search(@RequestParam String query) {
        // Отримуємо відповідь від сервісу
        String result = duckDuckGoService.getInstantAnswer(query);

        // Формуємо JSON-відповідь
        return ResponseEntity.ok(new DuckDuckGoService.AnswerResponse(result));
    }


}

