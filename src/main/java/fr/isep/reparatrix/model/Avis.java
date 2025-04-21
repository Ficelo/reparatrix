package fr.isep.reparatrix.model;

import jakarta.persistence.*;

@Entity
@Table(name="Avis")
public class Avis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_avis")
    private Long id;

    private int note;
    private String commentaire;

    @ManyToOne
    @JoinColumn(name="service_id", referencedColumnName = "id_service")
    private Service service;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id_user")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNote() {
        return note;
    }

    public void setNote(int note) {
        this.note = note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
