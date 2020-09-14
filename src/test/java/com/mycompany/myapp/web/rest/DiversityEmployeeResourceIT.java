package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JjApp4App;
import com.mycompany.myapp.domain.DiversityEmployee;
import com.mycompany.myapp.repository.DiversityEmployeeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DiversityEmployeeResource} REST controller.
 */
@SpringBootTest(classes = JjApp4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiversityEmployeeResourceIT {

    private static final String DEFAULT_EMPLOYEE_ID = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYEE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private DiversityEmployeeRepository diversityEmployeeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiversityEmployeeMockMvc;

    private DiversityEmployee diversityEmployee;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityEmployee createEntity(EntityManager em) {
        DiversityEmployee diversityEmployee = new DiversityEmployee()
            .employeeId(DEFAULT_EMPLOYEE_ID)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL);
        return diversityEmployee;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityEmployee createUpdatedEntity(EntityManager em) {
        DiversityEmployee diversityEmployee = new DiversityEmployee()
            .employeeId(UPDATED_EMPLOYEE_ID)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL);
        return diversityEmployee;
    }

    @BeforeEach
    public void initTest() {
        diversityEmployee = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiversityEmployee() throws Exception {
        int databaseSizeBeforeCreate = diversityEmployeeRepository.findAll().size();
        // Create the DiversityEmployee
        restDiversityEmployeeMockMvc.perform(post("/api/diversity-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityEmployee)))
            .andExpect(status().isCreated());

        // Validate the DiversityEmployee in the database
        List<DiversityEmployee> diversityEmployeeList = diversityEmployeeRepository.findAll();
        assertThat(diversityEmployeeList).hasSize(databaseSizeBeforeCreate + 1);
        DiversityEmployee testDiversityEmployee = diversityEmployeeList.get(diversityEmployeeList.size() - 1);
        assertThat(testDiversityEmployee.getEmployeeId()).isEqualTo(DEFAULT_EMPLOYEE_ID);
        assertThat(testDiversityEmployee.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testDiversityEmployee.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testDiversityEmployee.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createDiversityEmployeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diversityEmployeeRepository.findAll().size();

        // Create the DiversityEmployee with an existing ID
        diversityEmployee.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiversityEmployeeMockMvc.perform(post("/api/diversity-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityEmployee)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityEmployee in the database
        List<DiversityEmployee> diversityEmployeeList = diversityEmployeeRepository.findAll();
        assertThat(diversityEmployeeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiversityEmployees() throws Exception {
        // Initialize the database
        diversityEmployeeRepository.saveAndFlush(diversityEmployee);

        // Get all the diversityEmployeeList
        restDiversityEmployeeMockMvc.perform(get("/api/diversity-employees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diversityEmployee.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeeId").value(hasItem(DEFAULT_EMPLOYEE_ID)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }
    
    @Test
    @Transactional
    public void getDiversityEmployee() throws Exception {
        // Initialize the database
        diversityEmployeeRepository.saveAndFlush(diversityEmployee);

        // Get the diversityEmployee
        restDiversityEmployeeMockMvc.perform(get("/api/diversity-employees/{id}", diversityEmployee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diversityEmployee.getId().intValue()))
            .andExpect(jsonPath("$.employeeId").value(DEFAULT_EMPLOYEE_ID))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }
    @Test
    @Transactional
    public void getNonExistingDiversityEmployee() throws Exception {
        // Get the diversityEmployee
        restDiversityEmployeeMockMvc.perform(get("/api/diversity-employees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiversityEmployee() throws Exception {
        // Initialize the database
        diversityEmployeeRepository.saveAndFlush(diversityEmployee);

        int databaseSizeBeforeUpdate = diversityEmployeeRepository.findAll().size();

        // Update the diversityEmployee
        DiversityEmployee updatedDiversityEmployee = diversityEmployeeRepository.findById(diversityEmployee.getId()).get();
        // Disconnect from session so that the updates on updatedDiversityEmployee are not directly saved in db
        em.detach(updatedDiversityEmployee);
        updatedDiversityEmployee
            .employeeId(UPDATED_EMPLOYEE_ID)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL);

        restDiversityEmployeeMockMvc.perform(put("/api/diversity-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiversityEmployee)))
            .andExpect(status().isOk());

        // Validate the DiversityEmployee in the database
        List<DiversityEmployee> diversityEmployeeList = diversityEmployeeRepository.findAll();
        assertThat(diversityEmployeeList).hasSize(databaseSizeBeforeUpdate);
        DiversityEmployee testDiversityEmployee = diversityEmployeeList.get(diversityEmployeeList.size() - 1);
        assertThat(testDiversityEmployee.getEmployeeId()).isEqualTo(UPDATED_EMPLOYEE_ID);
        assertThat(testDiversityEmployee.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testDiversityEmployee.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testDiversityEmployee.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingDiversityEmployee() throws Exception {
        int databaseSizeBeforeUpdate = diversityEmployeeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiversityEmployeeMockMvc.perform(put("/api/diversity-employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityEmployee)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityEmployee in the database
        List<DiversityEmployee> diversityEmployeeList = diversityEmployeeRepository.findAll();
        assertThat(diversityEmployeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiversityEmployee() throws Exception {
        // Initialize the database
        diversityEmployeeRepository.saveAndFlush(diversityEmployee);

        int databaseSizeBeforeDelete = diversityEmployeeRepository.findAll().size();

        // Delete the diversityEmployee
        restDiversityEmployeeMockMvc.perform(delete("/api/diversity-employees/{id}", diversityEmployee.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DiversityEmployee> diversityEmployeeList = diversityEmployeeRepository.findAll();
        assertThat(diversityEmployeeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
