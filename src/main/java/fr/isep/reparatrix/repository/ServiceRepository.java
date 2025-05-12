package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByPrestataireId(Long id);


}
