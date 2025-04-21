package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
