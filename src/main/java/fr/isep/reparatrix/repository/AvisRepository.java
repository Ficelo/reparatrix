package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Avis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvisRepository extends JpaRepository<Avis, Long> {
}
