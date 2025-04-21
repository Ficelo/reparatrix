package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
