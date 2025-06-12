package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.Client;
import fr.isep.reparatrix.model.OrderStatus;
import fr.isep.reparatrix.model.OrderStatusDto;
import fr.isep.reparatrix.model.Prestataire;
import fr.isep.reparatrix.repository.ClientRepository;
import fr.isep.reparatrix.repository.OrderStatusRepository;
import fr.isep.reparatrix.repository.PrestataireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orderstatus")
public class OrderStatusController {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PrestataireRepository prestataireRepository;

    @PostMapping
    public ResponseEntity<?> createOrderStatus(@RequestBody OrderStatusDto dto) {

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Prestataire prestataire = prestataireRepository.findById(dto.getPrestataireId())
                .orElseThrow(() -> new RuntimeException("Prestataire not found"));

        OrderStatus orderStatus = new OrderStatus();
        orderStatus.setClient(client);
        orderStatus.setPrestataire(prestataire);
        orderStatus.setStatus(dto.getStatus());
        orderStatus.setDescription(dto.getDescription());

        orderStatusRepository.save(orderStatus);

        return ResponseEntity.ok(dto);
    }


    @GetMapping
    public List<OrderStatus> getAllOrderStatuses() {
        return orderStatusRepository.findAll();
    }

    @GetMapping("/client/{id}")
    public List<OrderStatus> getByClientId(@PathVariable Long id) {
        return orderStatusRepository.findByClientId(id);
    }

    @GetMapping("/prestataire/{id}")
    public List<OrderStatus> getByPrestataireId(@PathVariable Long id) {
        return orderStatusRepository.findByPrestataireId(id);
    }

    @PutMapping("/{id}")
    public OrderStatus updateStatus(@PathVariable Long id, @RequestBody OrderStatus updatedStatus) {
        return orderStatusRepository.findById(id).map(status -> {
            status.setStatus(updatedStatus.getStatus());
            return orderStatusRepository.save(status);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderStatus(@PathVariable Long id) {
        orderStatusRepository.deleteById(id);
    }
}

