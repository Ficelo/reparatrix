package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
