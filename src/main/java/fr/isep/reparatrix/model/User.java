package fr.isep.reparatrix.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_user")
    private Long id;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Client> clients;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Prestataire> prestataires;

    private String username;
    private String password;
    private String email;
    private String role;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
