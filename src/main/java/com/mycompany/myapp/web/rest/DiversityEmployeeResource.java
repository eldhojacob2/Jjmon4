package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DiversityEmployee;
import com.mycompany.myapp.repository.DiversityEmployeeRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DiversityEmployee}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiversityEmployeeResource {

    private final Logger log = LoggerFactory.getLogger(DiversityEmployeeResource.class);

    private static final String ENTITY_NAME = "diversityEmployee";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiversityEmployeeRepository diversityEmployeeRepository;

    public DiversityEmployeeResource(DiversityEmployeeRepository diversityEmployeeRepository) {
        this.diversityEmployeeRepository = diversityEmployeeRepository;
    }

    /**
     * {@code POST  /diversity-employees} : Create a new diversityEmployee.
     *
     * @param diversityEmployee the diversityEmployee to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diversityEmployee, or with status {@code 400 (Bad Request)} if the diversityEmployee has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diversity-employees")
    public ResponseEntity<DiversityEmployee> createDiversityEmployee(@RequestBody DiversityEmployee diversityEmployee) throws URISyntaxException {
        log.debug("REST request to save DiversityEmployee : {}", diversityEmployee);
        if (diversityEmployee.getId() != null) {
            throw new BadRequestAlertException("A new diversityEmployee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DiversityEmployee result = diversityEmployeeRepository.save(diversityEmployee);
        return ResponseEntity.created(new URI("/api/diversity-employees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diversity-employees} : Updates an existing diversityEmployee.
     *
     * @param diversityEmployee the diversityEmployee to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diversityEmployee,
     * or with status {@code 400 (Bad Request)} if the diversityEmployee is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diversityEmployee couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diversity-employees")
    public ResponseEntity<DiversityEmployee> updateDiversityEmployee(@RequestBody DiversityEmployee diversityEmployee) throws URISyntaxException {
        log.debug("REST request to update DiversityEmployee : {}", diversityEmployee);
        if (diversityEmployee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DiversityEmployee result = diversityEmployeeRepository.save(diversityEmployee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diversityEmployee.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diversity-employees} : get all the diversityEmployees.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diversityEmployees in body.
     */
    @GetMapping("/diversity-employees")
    public List<DiversityEmployee> getAllDiversityEmployees() {
        log.debug("REST request to get all DiversityEmployees");
        return diversityEmployeeRepository.findAll();
    }

    /**
     * {@code GET  /diversity-employees/:id} : get the "id" diversityEmployee.
     *
     * @param id the id of the diversityEmployee to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diversityEmployee, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diversity-employees/{id}")
    public ResponseEntity<DiversityEmployee> getDiversityEmployee(@PathVariable Long id) {
        log.debug("REST request to get DiversityEmployee : {}", id);
        Optional<DiversityEmployee> diversityEmployee = diversityEmployeeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diversityEmployee);
    }

    /**
     * {@code DELETE  /diversity-employees/:id} : delete the "id" diversityEmployee.
     *
     * @param id the id of the diversityEmployee to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diversity-employees/{id}")
    public ResponseEntity<Void> deleteDiversityEmployee(@PathVariable Long id) {
        log.debug("REST request to delete DiversityEmployee : {}", id);
        diversityEmployeeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
