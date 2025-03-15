package com.example.config.statistics;

import com.example.config.forms.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatisticsService {
    @Autowired
    private AdoptFormRepository adoptFormRepository;
    @Autowired
    private VolunteerFormRepository volunteerFormRepository;
    @Autowired
    private WardFormRepository wardFormRepository;

    // Усиновлення: скільки яких тварин усиновлюють
    public Map<String, Integer> getAdoptionStats() {
        List<String> animals = adoptFormRepository.findAll()
                .stream()
                .map(AdoptForm::getTypeOfAnimal)
                .collect(Collectors.toList());

        return countOccurrences(animals);
    }

    // Опіка: скільки яких тварин беруть під опіку
    public Map<String, Integer> getWardStats() {
        List<String> animals = wardFormRepository.findAll()
                .stream()
                .map(WardForm::getTypeOfAnimal)
                .collect(Collectors.toList());

        return countOccurrences(animals);
    }

    // Волонтерство: кількість волонтерів у кожному притулку
    public Map<String, Integer> getVolunteerStats() {
        List<String> shelters = volunteerFormRepository.findAll()
                .stream()
                .map(VolunteerForm::getShelterName)
                .collect(Collectors.toList());

        return countOccurrences(shelters);
    }

    // Метод підрахунку унікальних значень у списку
    private Map<String, Integer> countOccurrences(List<String> list) {
        Map<String, Integer> countMap = new HashMap<>();
        for (String item : list) {
            countMap.put(item, countMap.getOrDefault(item, 0) + 1);
        }
        return countMap;
    }
}
