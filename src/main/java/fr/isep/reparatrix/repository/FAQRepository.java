package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FAQRepository extends JpaRepository<FAQ,Long> {
    List<FAQ> findByQuestionContainingIgnoreCase(String query) ;
}
