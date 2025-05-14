package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Prestataire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrestataireRepository extends JpaRepository<Prestataire, Long> {

    List<Prestataire> findByProfession(String profession);
    List<Prestataire> getPrestataireByUserId(Long userId);

}
