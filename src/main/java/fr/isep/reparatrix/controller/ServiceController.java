package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Service;
import fr.isep.reparatrix.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping
    public Service createService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }

    @GetMapping
    @ResponseBody
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

}
