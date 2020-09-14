package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DiversityQuestion;
import com.mycompany.myapp.repository.DiversityQuestionRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.DiversityQuestion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiversityQuestionResource {

    private final Logger log = LoggerFactory.getLogger(DiversityQuestionResource.class);

    private static final String ENTITY_NAME = "diversityQuestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiversityQuestionRepository diversityQuestionRepository;

    public DiversityQuestionResource(DiversityQuestionRepository diversityQuestionRepository) {
        this.diversityQuestionRepository = diversityQuestionRepository;
    }

    /**
     * {@code POST  /diversity-questions} : Create a new diversityQuestion.
     *
     * @param diversityQuestion the diversityQuestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diversityQuestion, or with status {@code 400 (Bad Request)} if the diversityQuestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diversity-questions")
    public ResponseEntity<DiversityQuestion> createDiversityQuestion(@RequestBody DiversityQuestion diversityQuestion) throws URISyntaxException {
        log.debug("REST request to save DiversityQuestion : {}", diversityQuestion);
        if (diversityQuestion.getId() != null) {
            throw new BadRequestAlertException("A new diversityQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiversityQuestion result = diversityQuestionRepository.save(diversityQuestion);
        return ResponseEntity.created(new URI("/api/diversity-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diversity-questions} : Updates an existing diversityQuestion.
     *
     * @param diversityQuestion the diversityQuestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diversityQuestion,
     * or with status {@code 400 (Bad Request)} if the diversityQuestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diversityQuestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diversity-questions")
    public ResponseEntity<DiversityQuestion> updateDiversityQuestion(@RequestBody DiversityQuestion diversityQuestion) throws URISyntaxException {
        log.debug("REST request to update DiversityQuestion : {}", diversityQuestion);
        if (diversityQuestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiversityQuestion result = diversityQuestionRepository.save(diversityQuestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diversityQuestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diversity-questions} : get all the diversityQuestions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diversityQuestions in body.
     */
    @GetMapping("/diversity-questions")
    public List<DiversityQuestion> getAllDiversityQuestions() {
        log.debug("REST request to get all DiversityQuestions");
        return diversityQuestionRepository.findAll();
    }

    /**
     * {@code GET  /diversity-questions/:id} : get the "id" diversityQuestion.
     *
     * @param id the id of the diversityQuestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diversityQuestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diversity-questions/{id}")
    public ResponseEntity<DiversityQuestion> getDiversityQuestion(@PathVariable Long id) {
        log.debug("REST request to get DiversityQuestion : {}", id);
        Optional<DiversityQuestion> diversityQuestion = diversityQuestionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diversityQuestion);
    }

    /**
     * {@code DELETE  /diversity-questions/:id} : delete the "id" diversityQuestion.
     *
     * @param id the id of the diversityQuestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diversity-questions/{id}")
    public ResponseEntity<Void> deleteDiversityQuestion(@PathVariable Long id) {
        log.debug("REST request to delete DiversityQuestion : {}", id);
        diversityQuestionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
