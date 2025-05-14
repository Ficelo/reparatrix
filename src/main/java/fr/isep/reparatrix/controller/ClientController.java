package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Client;
import fr.isep.reparatrix.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientRepository.save(client);
    }

    @GetMapping
    @ResponseBody
    public List<Client> getAllClients(Model model) {
        return clientRepository.findAll();
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{id}")
    public Client getClient(@PathVariable Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @GetMapping("/userId/{id}")
    @ResponseBody
    public List<Client> getClientByUserId(@PathVariable Long id) { // A changer en client unique mais c'est plus pratique pour les tests
        return clientRepository.getClientByUserId(id);
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client client) {
        return clientRepository.findById(id).map(
                clien -> {

                    clien.setId(id);
                    clien.setLocalisation(client.getLocalisation());
                    clien.setUser(client.getUser());
                    clien.setNom(client.getNom());

                    return clientRepository.save(clien);
                }
        ).orElse(null);
    }

}
