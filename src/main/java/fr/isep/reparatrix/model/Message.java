package fr.isep.reparatrix.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="Message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_message")
    private Long id;

    private String texte;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "expéditeur", referencedColumnName = "id_user")
    private User expediteur;

    @ManyToOne
    @JoinColumn(name = "destinataire", referencedColumnName = "id_user")
    private User destinataire;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexte() {
        return texte;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getExpediteur() {
        return expediteur;
    }

    public void setExpediteur(User expediteur) {
        this.expediteur = expediteur;
    }

    public User getDestinataire() {
        return destinataire;
    }

    public void setDestinataire(User destinataire) {
        this.destinataire = destinataire;
    }
}
