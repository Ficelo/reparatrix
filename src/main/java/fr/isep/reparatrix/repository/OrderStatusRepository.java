package fr.isep.reparatrix.repository;

import fr.isep.reparatrix.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {

    List<OrderStatus> findByClientId(Long clientId);
    List<OrderStatus> findByPrestataireId(Long prestataireId);
}
