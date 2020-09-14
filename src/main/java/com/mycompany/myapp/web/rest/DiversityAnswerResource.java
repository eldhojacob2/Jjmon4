package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DiversityAnswer;
import com.mycompany.myapp.repository.DiversityAnswerRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DiversityAnswer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiversityAnswerResource {

    private final Logger log = LoggerFactory.getLogger(DiversityAnswerResource.class);

    private static final String ENTITY_NAME = "diversityAnswer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiversityAnswerRepository diversityAnswerRepository;

    public DiversityAnswerResource(DiversityAnswerRepository diversityAnswerRepository) {
        this.diversityAnswerRepository = diversityAnswerRepository;
    }

    /**
     * {@code POST  /diversity-answers} : Create a new diversityAnswer.
     *
     * @param diversityAnswer the diversityAnswer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diversityAnswer, or with status {@code 400 (Bad Request)} if the diversityAnswer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diversity-answers")
    public ResponseEntity<DiversityAnswer> createDiversityAnswer(@RequestBody DiversityAnswer diversityAnswer) throws URISyntaxException {
        log.debug("REST request to save DiversityAnswer : {}", diversityAnswer);
        if (diversityAnswer.getId() != null) {
            throw new BadRequestAlertException("A new diversityAnswer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiversityAnswer result = diversityAnswerRepository.save(diversityAnswer);
        return ResponseEntity.created(new URI("/api/diversity-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diversity-answers} : Updates an existing diversityAnswer.
     *
     * @param diversityAnswer the diversityAnswer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diversityAnswer,
     * or with status {@code 400 (Bad Request)} if the diversityAnswer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diversityAnswer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diversity-answers")
    public ResponseEntity<DiversityAnswer> updateDiversityAnswer(@RequestBody DiversityAnswer diversityAnswer) throws URISyntaxException {
        log.debug("REST request to update DiversityAnswer : {}", diversityAnswer);
        if (diversityAnswer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiversityAnswer result = diversityAnswerRepository.save(diversityAnswer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diversityAnswer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diversity-answers} : get all the diversityAnswers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diversityAnswers in body.
     */
    @GetMapping("/diversity-answers")
    public List<DiversityAnswer> getAllDiversityAnswers() {
        log.debug("REST request to get all DiversityAnswers");
        return diversityAnswerRepository.findAll();
    }

    /**
     * {@code GET  /diversity-answers/:id} : get the "id" diversityAnswer.
     *
     * @param id the id of the diversityAnswer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diversityAnswer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diversity-answers/{id}")
    public ResponseEntity<DiversityAnswer> getDiversityAnswer(@PathVariable Long id) {
        log.debug("REST request to get DiversityAnswer : {}", id);
        Optional<DiversityAnswer> diversityAnswer = diversityAnswerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diversityAnswer);
    }

    /**
     * {@code DELETE  /diversity-answers/:id} : delete the "id" diversityAnswer.
     *
     * @param id the id of the diversityAnswer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diversity-answers/{id}")
    public ResponseEntity<Void> deleteDiversityAnswer(@PathVariable Long id) {
        log.debug("REST request to delete DiversityAnswer : {}", id);
        diversityAnswerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
