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

}
