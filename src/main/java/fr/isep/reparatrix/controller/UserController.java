package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.User;
import fr.isep.reparatrix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id){
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/email/{email}")
    @ResponseBody
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userRepository.findById(id).map(
                usr -> {
                    usr.setId(id);
                    usr.setUsername(user.getUsername());
                    usr.setPassword(user.getPassword());
                    usr.setEmail(user.getEmail());
                    usr.setRole(user.getRole());

                    return userRepository.save(usr);
                }
        ).orElse(null);
    }


}
