package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DiversityTheme;
import com.mycompany.myapp.repository.DiversityThemeRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DiversityTheme}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiversityThemeResource {

    private final Logger log = LoggerFactory.getLogger(DiversityThemeResource.class);

    private static final String ENTITY_NAME = "diversityTheme";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiversityThemeRepository diversityThemeRepository;

    public DiversityThemeResource(DiversityThemeRepository diversityThemeRepository) {
        this.diversityThemeRepository = diversityThemeRepository;
    }

    /**
     * {@code POST  /diversity-themes} : Create a new diversityTheme.
     *
     * @param diversityTheme the diversityTheme to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diversityTheme, or with status {@code 400 (Bad Request)} if the diversityTheme has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diversity-themes")
    public ResponseEntity<DiversityTheme> createDiversityTheme(@RequestBody DiversityTheme diversityTheme) throws URISyntaxException {
        log.debug("REST request to save DiversityTheme : {}", diversityTheme);
        if (diversityTheme.getId() != null) {
            throw new BadRequestAlertException("A new diversityTheme cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiversityTheme result = diversityThemeRepository.save(diversityTheme);
        return ResponseEntity.created(new URI("/api/diversity-themes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diversity-themes} : Updates an existing diversityTheme.
     *
     * @param diversityTheme the diversityTheme to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diversityTheme,
     * or with status {@code 400 (Bad Request)} if the diversityTheme is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diversityTheme couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diversity-themes")
    public ResponseEntity<DiversityTheme> updateDiversityTheme(@RequestBody DiversityTheme diversityTheme) throws URISyntaxException {
        log.debug("REST request to update DiversityTheme : {}", diversityTheme);
        if (diversityTheme.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiversityTheme result = diversityThemeRepository.save(diversityTheme);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diversityTheme.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diversity-themes} : get all the diversityThemes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diversityThemes in body.
     */
    @GetMapping("/diversity-themes")
    public List<DiversityTheme> getAllDiversityThemes() {
        log.debug("REST request to get all DiversityThemes");
        return diversityThemeRepository.findAll();
    }

    /**
     * {@code GET  /diversity-themes/:id} : get the "id" diversityTheme.
     *
     * @param id the id of the diversityTheme to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diversityTheme, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diversity-themes/{id}")
    public ResponseEntity<DiversityTheme> getDiversityTheme(@PathVariable Long id) {
        log.debug("REST request to get DiversityTheme : {}", id);
        Optional<DiversityTheme> diversityTheme = diversityThemeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diversityTheme);
    }

    /**
     * {@code DELETE  /diversity-themes/:id} : delete the "id" diversityTheme.
     *
     * @param id the id of the diversityTheme to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diversity-themes/{id}")
    public ResponseEntity<Void> deleteDiversityTheme(@PathVariable Long id) {
        log.debug("REST request to delete DiversityTheme : {}", id);
        diversityThemeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
