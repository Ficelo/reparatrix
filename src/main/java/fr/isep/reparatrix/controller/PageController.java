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

    @GetMapping("/paiement")
    public String paiement() {
        return "forward:/paiement.html";
    }

    @GetMapping("/checkout")
    public String checkout() {
        return "forward:/checkout.html";
    }

    @GetMapping("/cancel")
    public String cancel() {
        return "forward:/cancel.html";
    }

    @GetMapping("/success")
    public String succes() {return "forward:/success.html";}

    @GetMapping("/test-geolocalisation")
    public String testGeoLocalisation() {
        return "forward:/test-geolocation.html";
    }

    @GetMapping("/entreprise")
    public String entreprise() {
        return "forward:/entreprise.html";
    }

    @GetMapping("/service")
    public String service() {
        return "forward:/service.html";
    }

    @GetMapping("/login")
    public String login() {return "forward:/login.html";}

    @GetMapping("/signup")
    public String signup() {return "forward:/signup.html";}

    @GetMapping("/chat")
    public String message() {return "forward:/chat.html";}

    @GetMapping("/profil")
    public String profil() {return "forward:/profil.html";}

    @GetMapping("/faq")
    public String faq() {return "forward:/faq.html";}

    @GetMapping("/about-us")
    public String aboutUs() {return "forward:/about-us.html";}

    @GetMapping("/cgu")
    public String cgu() {return "forward:/cgu.html";
    }

    @GetMapping("/settings")
    public String settings() {return "forward:/settings.html";}

    @GetMapping("/admin")
    public String admin() {return "forward:/admin.html";}

}
