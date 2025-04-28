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
    private AvisRepository avisRepository;

    @PostMapping
    public Avis createPrestataire(@RequestBody Avis avis) {
        return avisRepository.save(avis);
    }

    @GetMapping
    @ResponseBody
    public List<Avis> getAllPrestataires(Model model) {
        return avisRepository.findAll();
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{id}")
    public Avis getAvisById(@PathVariable Long id) {
        return avisRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Avis updateAvis(@PathVariable Long id, @RequestBody Avis avis) {
        return avisRepository.findById(id).map(
                avi -> {

                    avi.setId(id);
                    avi.setCommentaire(avis.getCommentaire());
                    avi.setNote(avis.getNote());
                    avi.setUser(avis.getUser());
                    avi.setService(avis.getService());

                    return avisRepository.save(avi);
                }
        ).orElse(null);
    }

}
