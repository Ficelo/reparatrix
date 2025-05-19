package fr.isep.reparatrix.controller;

import java.io.IOException;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class PaiementController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Void> createCheckoutSession() {
        String domaine = "http://localhost:8082";

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(domaine + "/succes")
                .setCancelUrl(domaine + "/cancel")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPrice("price_1ROc5ZR9nZF2jsLWZsiNz4k9")
                                .build())
                .build();

        try {
            Session session = Session.create(params);
            // Redirection avec header HTTP
            return ResponseEntity.status(303) // 303 See Other
                    .header("Location", session.getUrl())
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
