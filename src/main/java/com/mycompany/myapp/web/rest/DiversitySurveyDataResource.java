package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DiversitySurveyData;
import com.mycompany.myapp.repository.DiversitySurveyDataRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DiversitySurveyData}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiversitySurveyDataResource {

    private final Logger log = LoggerFactory.getLogger(DiversitySurveyDataResource.class);

    private static final String ENTITY_NAME = "diversitySurveyData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiversitySurveyDataRepository diversitySurveyDataRepository;

    public DiversitySurveyDataResource(DiversitySurveyDataRepository diversitySurveyDataRepository) {
        this.diversitySurveyDataRepository = diversitySurveyDataRepository;
    }

    /**
     * {@code POST  /diversity-survey-data} : Create a new diversitySurveyData.
     *
     * @param diversitySurveyData the diversitySurveyData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diversitySurveyData, or with status {@code 400 (Bad Request)} if the diversitySurveyData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diversity-survey-data")
    public ResponseEntity<DiversitySurveyData> createDiversitySurveyData(@RequestBody DiversitySurveyData diversitySurveyData) throws URISyntaxException {
        log.debug("REST request to save DiversitySurveyData : {}", diversitySurveyData);
        if (diversitySurveyData.getId() != null) {
            throw new BadRequestAlertException("A new diversitySurveyData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiversitySurveyData result = diversitySurveyDataRepository.save(diversitySurveyData);
        return ResponseEntity.created(new URI("/api/diversity-survey-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diversity-survey-data} : Updates an existing diversitySurveyData.
     *
     * @param diversitySurveyData the diversitySurveyData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diversitySurveyData,
     * or with status {@code 400 (Bad Request)} if the diversitySurveyData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diversitySurveyData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diversity-survey-data")
    public ResponseEntity<DiversitySurveyData> updateDiversitySurveyData(@RequestBody DiversitySurveyData diversitySurveyData) throws URISyntaxException {
        log.debug("REST request to update DiversitySurveyData : {}", diversitySurveyData);
        if (diversitySurveyData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiversitySurveyData result = diversitySurveyDataRepository.save(diversitySurveyData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diversitySurveyData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diversity-survey-data} : get all the diversitySurveyData.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diversitySurveyData in body.
     */
    @GetMapping("/diversity-survey-data")
    public List<DiversitySurveyData> getAllDiversitySurveyData() {
        log.debug("REST request to get all DiversitySurveyData");
        return diversitySurveyDataRepository.findAll();
    }

    /**
     * {@code GET  /diversity-survey-data/:id} : get the "id" diversitySurveyData.
     *
     * @param id the id of the diversitySurveyData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diversitySurveyData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diversity-survey-data/{id}")
    public ResponseEntity<DiversitySurveyData> getDiversitySurveyData(@PathVariable Long id) {
        log.debug("REST request to get DiversitySurveyData : {}", id);
        Optional<DiversitySurveyData> diversitySurveyData = diversitySurveyDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diversitySurveyData);
    }

    /**
     * {@code DELETE  /diversity-survey-data/:id} : delete the "id" diversitySurveyData.
     *
     * @param id the id of the diversitySurveyData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diversity-survey-data/{id}")
    public ResponseEntity<Void> deleteDiversitySurveyData(@PathVariable Long id) {
        log.debug("REST request to delete DiversitySurveyData : {}", id);
        diversitySurveyDataRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
