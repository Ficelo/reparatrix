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

}
