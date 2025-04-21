package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Prestataire;
import fr.isep.reparatrix.repository.PrestataireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prestataires")
public class PrestataireController {

    @Autowired
    private PrestataireRepository prestataireRepository;

    @PostMapping
    public Prestataire createPrestataire(@RequestBody Prestataire prestataire) {
        return prestataireRepository.save(prestataire);
    }

    @GetMapping
    @ResponseBody
    public List<Prestataire> getAllPrestataires(Model model) {
        return prestataireRepository.findAll();
    }

}
