package fr.isep.reparatrix.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orderstatus")
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prestataire_id", referencedColumnName = "id_prestataire", nullable = false)
    private Prestataire prestataire;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id_client", nullable = false)
    private Client client;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String description;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Prestataire getPrestataire() {
        return prestataire;
    }

    public void setPrestataire(Prestataire prestataire) {
        this.prestataire = prestataire;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
