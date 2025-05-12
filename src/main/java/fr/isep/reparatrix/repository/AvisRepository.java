package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Avis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvisRepository extends JpaRepository<Avis, Long> {

    List<Avis> findByServiceId(Long id);

}
