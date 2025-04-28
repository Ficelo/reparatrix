package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Message;
import fr.isep.reparatrix.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping // TODO: fix ça mais y'a moyen que ce soit plus un problème de conception de la tablea
    public Message createMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    @GetMapping
    @ResponseBody
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @GetMapping
    @ResponseBody
    @RequestMapping("/{id}")
    public Message getMessage(@PathVariable Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Message updateMessage(@PathVariable Long id, @RequestBody Message message) {
        return messageRepository.findById(id).map(
                msg -> {

                    msg.setId(id);
                    msg.setDate(message.getDate());
                    msg.setTexte(message.getTexte());
                    msg.setDestinataire(message.getDestinataire());
                    msg.setExpediteur(message.getExpediteur());

                    return messageRepository.save(msg);
                }
        ).orElse(null);
    }

}
