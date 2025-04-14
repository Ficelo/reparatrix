package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.User;
import fr.isep.reparatrix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping
    public @ResponseBody List<User> getAllUsers(Model model) {
        return userRepository.findAll();
    }

}
