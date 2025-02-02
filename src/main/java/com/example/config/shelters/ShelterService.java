package com.example.config.shelters;

import com.example.config.animals.Animal;
import com.example.config.requests.AnimalRequest;
import com.example.config.requests.ShelterRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ShelterService {

    @Autowired
    private ShelterRepository shelterRepository;

    public void addShelter(ShelterRequest request) {
        Shelter shelter = new Shelter(
                request.getName(),
                request.getAddress(),
                request.getContactNumber(),
                request.getDescription(),
                request.getCity(),
                request.getLatitude(),
                request.getLongitude(),
                request.getImageURL()
        );
        shelterRepository.save(shelter);
    }
    public void updateShelterDetails(ShelterRequest request, Long shelterId) {
        Optional<Shelter> shelterOptional = shelterRepository.findById(shelterId);

        shelterOptional.ifPresentOrElse(shelter -> {
            if (StringUtils.isNotBlank(request.getName())) {
                shelter.setName(request.getName());
            }if (StringUtils.isNotBlank(request.getAddress())) {
                shelter.setAddress(request.getAddress());
            }if (StringUtils.isNotBlank(request.getContactNumber())) {
                shelter.setContactNumber(request.getContactNumber());
            }if (StringUtils.isNotBlank(request.getDescription())) {
                shelter.setDescription(request.getDescription());
            }if (StringUtils.isNotBlank(request.getCity())) {
                shelter.setCity(request.getCity());
            }if (request.getLatitude()!=null) {
                shelter.setLatitude(request.getLatitude());
            }if (request.getLongitude()!=null) {
                shelter.setLongitude(request.getLongitude());
            }
            shelterRepository.save(shelter);
        }, () -> {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Shelter with id " + shelterId + " not found"
            );
        });
    }
    public Optional<Shelter> getShelterById(Long id) {
        return shelterRepository.findById(id);
    }

    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }
    public List<Shelter> searchSheltersByName(String query) {
        return shelterRepository.findByNameContainingIgnoreCase(query);
    }
    //заповнюємо .json притулками
    public void saveSheltersToJsonFile() {
        try {
            List<Shelter> shelters = shelterRepository.findAll();
            ObjectMapper objectMapper = new ObjectMapper();

            // Встановлюємо "Pretty Print" формат для JSON
            objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValue(new File("shelters.json"), shelters);

            System.out.println("Shelters saved to file in readable format: shelters.json");
        } catch (IOException e) {
            System.err.println("Error while saving shelters to file: " + e.getMessage());
            e.printStackTrace();
        }
    }




    public void deleteShelter(Long id) {
        if (shelterRepository.existsById(id)) {
            shelterRepository.deleteById(id);
        } else {
            throw new ShelterNotFoundException("Shelter with ID " + id + " not found.");
        }
    }


}