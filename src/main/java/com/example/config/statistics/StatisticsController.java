package com.example.config.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
class StatisticsController {

    @Autowired
    private  StatisticsService statisticsService;

    @GetMapping("/adoptions")
    public Map<String, Integer> getAdoptionStats() {
        return statisticsService.getAdoptionStats();
    }

    @GetMapping("/wards")
    public Map<String, Integer> getWardStats() {
        return statisticsService.getWardStats();
    }

    @GetMapping("/volunteers")
    public Map<String, Integer> getVolunteerStats() {
        return statisticsService.getVolunteerStats();
    }
}
