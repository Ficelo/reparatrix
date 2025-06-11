package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Prestataire;
import fr.isep.reparatrix.repository.PrestataireRepository;
import fr.isep.reparatrix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

//    @GetMapping
//    @ResponseBody
//    public List<Prestataire> getAllPrestataires(Model model) {
//        return prestataireRepository.findAll();
//    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{id}")
    public Prestataire getPrestataireById(@PathVariable Long id) {
        return prestataireRepository.findById(id).orElseThrow(() -> new RuntimeException("Prestataire not found with id : " + id));
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/userId/{id}")
    public List<Prestataire> getPrestataireByUserId(@PathVariable Long id) { return prestataireRepository.getPrestataireByUserId(id);}

    @GetMapping
    @ResponseBody
    @RequestMapping("/profession/{profession}")
    public List<Prestataire> getPrestatairesByProfession(@PathVariable String profession) {
        return prestataireRepository.findByProfession(profession);
    }

    @GetMapping
    @ResponseBody
    @RequestMapping
    public List<Prestataire> getPrestatairesByOptions(
            @RequestParam(required = false) String profession,
            @RequestParam(required = false) Float noteMin,
            @RequestParam(required = false) Float distanceMax
    ) {

        List<Prestataire> listeFinales = new ArrayList<>();

        for (Prestataire prestataire : prestataireRepository.findAll()) {

            boolean toAdd = true;

            if(profession != null) {
                if(!prestataire.getProfession().equals(profession)){
                    toAdd = false;
                }
            }
            if(noteMin != null) {
                if(prestataire.getNote() < noteMin){
                    toAdd = false;
                }
            }
            if(distanceMax != null){
                if(getDisanceEntrePoints(prestataire, prestataire.getLocalisation()) > distanceMax){ // C'est du n'importe quoi mais je verrai ça plus tard
                    toAdd = false;
                }
            }

            if(toAdd){
                listeFinales.add(prestataire);
            }

        }

        return listeFinales;

    }

    Float getDisanceEntrePoints(Prestataire prestataire, String localisation) {
        return 0.0f;
    }
}
