package fr.isep.reparatrix.model;

import jakarta.persistence.*;

@Entity
@Table(name="Service")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_service")
    private Long id;

    private Integer order_id; // Ça devrait pas être une clé étrangère aussi ça ?
    private String description;
    private Float prix;

    @ManyToOne
    @JoinColumn(name = "prestataire_id", referencedColumnName = "id_prestataire")
    private Prestataire prestataire;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrix() {
        return prix;
    }

    public void setPrix(Float prix) {
        this.prix = prix;
    }

    public Prestataire getPrestataire() {
        return prestataire;
    }

    public void setPrestataire(Prestataire prestataire) {
        this.prestataire = prestataire;
    }
}
