package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Commande;
import fr.isep.reparatrix.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/commandes")
public class CommandeController {

    @Autowired
    private CommandeRepository commandeRepository;

    @PostMapping
    public Commande createCommande(@RequestBody Commande commande) {
        return commandeRepository.save(commande);
    }

    @GetMapping
    @ResponseBody
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

}
