package fr.isep.reparatrix.model;

import jakarta.persistence.*;

@Entity
@Table(name="Commande")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_commande")
    private Long id;

    private Float prixtot;
    private boolean urgence;

    @ManyToOne
    @JoinColumn(name="prestataire_id", referencedColumnName = "id_prestataire")
    private Prestataire prestataire;

    @ManyToOne
    @JoinColumn(name="client_id", referencedColumnName = "id_client")
    private Client client;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getPrixtot() {
        return prixtot;
    }

    public void setPrixtot(Float prixtot) {
        this.prixtot = prixtot;
    }

    public boolean isUrgence() {
        return urgence;
    }

    public void setUrgence(boolean urgence) {
        this.urgence = urgence;
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
}
