package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
