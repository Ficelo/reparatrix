package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Avis;
import fr.isep.reparatrix.repository.AvisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avis")
public class AvisController {

    @Autowired
    private AvisRepository avisRepository; ;

    @PostMapping
    public Avis createPrestataire(@RequestBody Avis avis) {
        return avisRepository.save(avis);
    }

    @GetMapping
    @ResponseBody
    public List<Avis> getAllPrestataires(Model model) {
        return avisRepository.findAll();
    }

}
