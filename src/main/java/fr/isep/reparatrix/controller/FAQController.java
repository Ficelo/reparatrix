package fr.isep.reparatrix.controller;

import fr.isep.reparatrix.model.FAQ;
import fr.isep.reparatrix.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/faq")
public class FAQController {

    @Autowired
    private FAQRepository faqRepository ;

    public FAQController(FAQRepository faqRepository){
        this.faqRepository = faqRepository ;
    }

    @GetMapping
    public List<FAQ> getAllFaqs(){
        return faqRepository.findAll() ;
    }

    @GetMapping("/{id_faq}")
    public ResponseEntity<FAQ> getFaqById(@PathVariable Long id_faq){
        return faqRepository.findById(id_faq)
                .map(ResponseEntity::ok)
                .orElse((ResponseEntity.notFound().build())) ;
    }

    @GetMapping("/search")
    public List<FAQ> searchQuestions(@RequestParam String query){
        return faqRepository.findByQuestionContainingIgnoreCase(query) ;
    }

}
