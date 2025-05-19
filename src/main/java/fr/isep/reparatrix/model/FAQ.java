package fr.isep.reparatrix.model;

import jakarta.persistence.*;

@Entity
@Table(name="Faq")
public class FAQ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_faq ;
    private String question ;
    private String reponse ;

    public FAQ(){}

    public FAQ(String question, String reponse){
        this.question = question ;
        this.reponse = reponse ;
    }

    public Long getId_faq() {
        return id_faq ;
    }

    public String getQuestion() {
        return question ;
    }

    public String getReponse() {
        return reponse ;
    }

    public void setId_faq(Long id_faq) {
        this.id_faq = id_faq ;
    }

    public void setQuestion(String question) {
        this.question = question ;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse ;
    }
}
