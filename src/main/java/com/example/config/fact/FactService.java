package com.example.config.fact;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Random;

@Service
public class FactService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private static final String API_URL = "https://some-random-api.com/animal/{animal}";
    private static final List<String> ANIMALS = List.of("cat", "dog", "panda", "fox", "bird", "koala");
    private final Random random = new Random();

    public FactService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String getRandomAnimalFact() {
        try {
            // Вибираємо випадкову тварину
            String randomAnimal = ANIMALS.get(random.nextInt(ANIMALS.size()));

            // Отримуємо JSON-об'єкт
            String response = restTemplate.getForObject(API_URL, String.class, randomAnimal);

            // Розбираємо JSON
            JsonNode rootNode = objectMapper.readTree(response);

            // Отримуємо поле "fact"
            return rootNode.get("fact").asText();
        } catch (Exception e) {
            return "Не вдалося отримати факт.";
        }
    }
}