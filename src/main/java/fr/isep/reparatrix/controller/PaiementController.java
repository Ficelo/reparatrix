package fr.isep.reparatrix.controller;

import java.nio.file.Paths;

import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

public class PaiementController {
    public static void main(String[] args) {
        port(8082);

        Stripe.apiKey = "sk_test_VePHdqKTYQjKNInc7u56JBrQ"; //Mettre la vrai clé test

        staticFiles.externalLocation(
            Paths.get("public").toAbsolutePath().toString());

        post("/create-checkout-session", (request, response) -> {
            String Domaine = "http://localhost:8082";
            SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl(Domaine + "/success.html")
                        .setCancelUrl(Domaine + "/cancel.html")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPrice("{{PRICE_ID}}") //Remplacer par le vrai PRIC ID Stripe
                                        .build())
                        .build();
            Session session = Session.create(params);

            response.redirect(session.getUrl(), 303);
            return "";
        });
}
}
