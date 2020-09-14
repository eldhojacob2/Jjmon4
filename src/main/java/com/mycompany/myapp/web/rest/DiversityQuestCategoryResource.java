package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DiversityQuestCategory;
import com.mycompany.myapp.repository.DiversityQuestCategoryRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DiversityQuestCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiversityQuestCategoryResource {

    private final Logger log = LoggerFactory.getLogger(DiversityQuestCategoryResource.class);

    private static final String ENTITY_NAME = "diversityQuestCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiversityQuestCategoryRepository diversityQuestCategoryRepository;

    public DiversityQuestCategoryResource(DiversityQuestCategoryRepository diversityQuestCategoryRepository) {
        this.diversityQuestCategoryRepository = diversityQuestCategoryRepository;
    }

    /**
     * {@code POST  /diversity-quest-categories} : Create a new diversityQuestCategory.
     *
     * @param diversityQuestCategory the diversityQuestCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diversityQuestCategory, or with status {@code 400 (Bad Request)} if the diversityQuestCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diversity-quest-categories")
    public ResponseEntity<DiversityQuestCategory> createDiversityQuestCategory(@RequestBody DiversityQuestCategory diversityQuestCategory) throws URISyntaxException {
        log.debug("REST request to save DiversityQuestCategory : {}", diversityQuestCategory);
        if (diversityQuestCategory.getId() != null) {
            throw new BadRequestAlertException("A new diversityQuestCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiversityQuestCategory result = diversityQuestCategoryRepository.save(diversityQuestCategory);
        return ResponseEntity.created(new URI("/api/diversity-quest-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diversity-quest-categories} : Updates an existing diversityQuestCategory.
     *
     * @param diversityQuestCategory the diversityQuestCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diversityQuestCategory,
     * or with status {@code 400 (Bad Request)} if the diversityQuestCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diversityQuestCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diversity-quest-categories")
    public ResponseEntity<DiversityQuestCategory> updateDiversityQuestCategory(@RequestBody DiversityQuestCategory diversityQuestCategory) throws URISyntaxException {
        log.debug("REST request to update DiversityQuestCategory : {}", diversityQuestCategory);
        if (diversityQuestCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiversityQuestCategory result = diversityQuestCategoryRepository.save(diversityQuestCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diversityQuestCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diversity-quest-categories} : get all the diversityQuestCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diversityQuestCategories in body.
     */
    @GetMapping("/diversity-quest-categories")
    public List<DiversityQuestCategory> getAllDiversityQuestCategories() {
        log.debug("REST request to get all DiversityQuestCategories");
        return diversityQuestCategoryRepository.findAll();
    }

    /**
     * {@code GET  /diversity-quest-categories/:id} : get the "id" diversityQuestCategory.
     *
     * @param id the id of the diversityQuestCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diversityQuestCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diversity-quest-categories/{id}")
    public ResponseEntity<DiversityQuestCategory> getDiversityQuestCategory(@PathVariable Long id) {
        log.debug("REST request to get DiversityQuestCategory : {}", id);
        Optional<DiversityQuestCategory> diversityQuestCategory = diversityQuestCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diversityQuestCategory);
    }

    /**
     * {@code DELETE  /diversity-quest-categories/:id} : delete the "id" diversityQuestCategory.
     *
     * @param id the id of the diversityQuestCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diversity-quest-categories/{id}")
    public ResponseEntity<Void> deleteDiversityQuestCategory(@PathVariable Long id) {
        log.debug("REST request to delete DiversityQuestCategory : {}", id);
        diversityQuestCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
