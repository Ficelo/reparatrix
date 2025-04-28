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

    @GetMapping
    @ResponseBody
    @RequestMapping("/{id}")
    public Commande getCommandeById(@PathVariable Long id) {
        return commandeRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Commande updateCommande(@PathVariable Long id, @RequestBody Commande commande) {
        return commandeRepository.findById(id).map(
                command -> {

                    command.setId(id);
                    command.setClient(commande.getClient());
                    command.setPrestataire(commande.getPrestataire());
                    command.setPrixtot(commande.getPrixtot());
                    command.setUrgence(commande.isUrgence());

                    return commandeRepository.save(command);
                }
        ).orElse(null);
    }

}
