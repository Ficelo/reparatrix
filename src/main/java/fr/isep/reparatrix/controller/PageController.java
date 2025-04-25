package fr.isep.reparatrix.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    // C'est pas hyper élégant de faire comme ça mais au moins ça évite d'avoir le .html dans l'url

    @GetMapping("/search")
    public String search() {
        return "forward:/search.html";
    }

    @GetMapping("/test")
    public String test() {
        return "forward:/test.html";
    }

}
