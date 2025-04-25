package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Prestataire;
import fr.isep.reparatrix.repository.PrestataireRepository;
import fr.isep.reparatrix.repository.UserRepository;
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

    @PutMapping("/{id}")
    public Prestataire updatePrestataire(@PathVariable Long id, @RequestBody Prestataire prestataire) {
        return prestataireRepository.findById(id).map(
                pres -> {
                    pres.setId(id);
                    pres.setProfession(prestataire.getProfession());
                    pres.setLocalisation(prestataire.getLocalisation());
                    pres.setEntreprise(prestataire.getEntreprise());
                    pres.setNote(prestataire.getNote());
                    pres.setUser(prestataire.getUser());
                    pres.setSiret(prestataire.getSiret());

                    return prestataireRepository.save(pres);
                }
        ).orElseThrow(() -> new RuntimeException("Prestataire not found with id : " + id));
    }

    @GetMapping
    @ResponseBody
    public List<Prestataire> getAllPrestataires(Model model) {
        return prestataireRepository.findAll();
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{id}")
    public Prestataire getPrestataireById(@PathVariable Long id) {
        return prestataireRepository.findById(id).orElseThrow(() -> new RuntimeException("Prestataire not found with id : " + id));
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/profession/{profession}")
    public List<Prestataire> getPrestatairesByProfession(@PathVariable String profession) {
        return prestataireRepository.findByProfession(profession);
    }
}
