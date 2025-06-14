package fr.isep.reparatrix.controller;


import com.stripe.Stripe;
import com.stripe.model.Price;
import com.stripe.model.PriceCollection;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceListParams;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class PaiementController {


    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Dotenv dotenv = Dotenv.load();
        stripeSecretKey = dotenv.get("stripe.secret.key");
        Stripe.apiKey = stripeSecretKey;
    }

    @Value("${server.port}")
    private String port;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, String> body) {
        String domaine = "http://localhost:" + port;

        String productId = body.get("productId");  // <-- get product ID from request

        if (productId == null || productId.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            // Retrieve prices for this product
            PriceListParams priceListParams = PriceListParams.builder()
                    .setProduct(productId)
                    .setLimit(1L)  // get only first price
                    .build();

            PriceCollection prices = Price.list(priceListParams);

            if (prices.getData().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "No prices found for product"));
            }

            Price price = prices.getData().get(0);
            String priceId = price.getId();

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(domaine + "/success")
                    .setCancelUrl(domaine + "/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPrice(priceId)
                                    .build())
                    .build();

            Session session = Session.create(params);

            Map<String, String> response = new HashMap<>();
            response.put("url", session.getUrl());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }


}
