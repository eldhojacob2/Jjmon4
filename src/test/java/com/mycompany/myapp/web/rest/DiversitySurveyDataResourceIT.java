package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JjApp4App;
import com.mycompany.myapp.domain.DiversitySurveyData;
import com.mycompany.myapp.repository.DiversitySurveyDataRepository;

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
 * Integration tests for the {@link DiversitySurveyDataResource} REST controller.
 */
@SpringBootTest(classes = JjApp4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiversitySurveyDataResourceIT {

    private static final String DEFAULT_CUSTOM_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOM_ANSWER = "BBBBBBBBBB";

    @Autowired
    private DiversitySurveyDataRepository diversitySurveyDataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiversitySurveyDataMockMvc;

    private DiversitySurveyData diversitySurveyData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversitySurveyData createEntity(EntityManager em) {
        DiversitySurveyData diversitySurveyData = new DiversitySurveyData()
            .customAnswer(DEFAULT_CUSTOM_ANSWER);
        return diversitySurveyData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversitySurveyData createUpdatedEntity(EntityManager em) {
        DiversitySurveyData diversitySurveyData = new DiversitySurveyData()
            .customAnswer(UPDATED_CUSTOM_ANSWER);
        return diversitySurveyData;
    }

    @BeforeEach
    public void initTest() {
        diversitySurveyData = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiversitySurveyData() throws Exception {
        int databaseSizeBeforeCreate = diversitySurveyDataRepository.findAll().size();
        // Create the DiversitySurveyData
        restDiversitySurveyDataMockMvc.perform(post("/api/diversity-survey-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversitySurveyData)))
            .andExpect(status().isCreated());

        // Validate the DiversitySurveyData in the database
        List<DiversitySurveyData> diversitySurveyDataList = diversitySurveyDataRepository.findAll();
        assertThat(diversitySurveyDataList).hasSize(databaseSizeBeforeCreate + 1);
        DiversitySurveyData testDiversitySurveyData = diversitySurveyDataList.get(diversitySurveyDataList.size() - 1);
        assertThat(testDiversitySurveyData.getCustomAnswer()).isEqualTo(DEFAULT_CUSTOM_ANSWER);
    }

    @Test
    @Transactional
    public void createDiversitySurveyDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diversitySurveyDataRepository.findAll().size();

        // Create the DiversitySurveyData with an existing ID
        diversitySurveyData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiversitySurveyDataMockMvc.perform(post("/api/diversity-survey-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversitySurveyData)))
            .andExpect(status().isBadRequest());

        // Validate the DiversitySurveyData in the database
        List<DiversitySurveyData> diversitySurveyDataList = diversitySurveyDataRepository.findAll();
        assertThat(diversitySurveyDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiversitySurveyData() throws Exception {
        // Initialize the database
        diversitySurveyDataRepository.saveAndFlush(diversitySurveyData);

        // Get all the diversitySurveyDataList
        restDiversitySurveyDataMockMvc.perform(get("/api/diversity-survey-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diversitySurveyData.getId().intValue())))
            .andExpect(jsonPath("$.[*].customAnswer").value(hasItem(DEFAULT_CUSTOM_ANSWER)));
    }
    
    @Test
    @Transactional
    public void getDiversitySurveyData() throws Exception {
        // Initialize the database
        diversitySurveyDataRepository.saveAndFlush(diversitySurveyData);

        // Get the diversitySurveyData
        restDiversitySurveyDataMockMvc.perform(get("/api/diversity-survey-data/{id}", diversitySurveyData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diversitySurveyData.getId().intValue()))
            .andExpect(jsonPath("$.customAnswer").value(DEFAULT_CUSTOM_ANSWER));
    }
    @Test
    @Transactional
    public void getNonExistingDiversitySurveyData() throws Exception {
        // Get the diversitySurveyData
        restDiversitySurveyDataMockMvc.perform(get("/api/diversity-survey-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiversitySurveyData() throws Exception {
        // Initialize the database
        diversitySurveyDataRepository.saveAndFlush(diversitySurveyData);

        int databaseSizeBeforeUpdate = diversitySurveyDataRepository.findAll().size();

        // Update the diversitySurveyData
        DiversitySurveyData updatedDiversitySurveyData = diversitySurveyDataRepository.findById(diversitySurveyData.getId()).get();
        // Disconnect from session so that the updates on updatedDiversitySurveyData are not directly saved in db
        em.detach(updatedDiversitySurveyData);
        updatedDiversitySurveyData
            .customAnswer(UPDATED_CUSTOM_ANSWER);

        restDiversitySurveyDataMockMvc.perform(put("/api/diversity-survey-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiversitySurveyData)))
            .andExpect(status().isOk());

        // Validate the DiversitySurveyData in the database
        List<DiversitySurveyData> diversitySurveyDataList = diversitySurveyDataRepository.findAll();
        assertThat(diversitySurveyDataList).hasSize(databaseSizeBeforeUpdate);
        DiversitySurveyData testDiversitySurveyData = diversitySurveyDataList.get(diversitySurveyDataList.size() - 1);
        assertThat(testDiversitySurveyData.getCustomAnswer()).isEqualTo(UPDATED_CUSTOM_ANSWER);
    }

    @Test
    @Transactional
    public void updateNonExistingDiversitySurveyData() throws Exception {
        int databaseSizeBeforeUpdate = diversitySurveyDataRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiversitySurveyDataMockMvc.perform(put("/api/diversity-survey-data")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversitySurveyData)))
            .andExpect(status().isBadRequest());

        // Validate the DiversitySurveyData in the database
        List<DiversitySurveyData> diversitySurveyDataList = diversitySurveyDataRepository.findAll();
        assertThat(diversitySurveyDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiversitySurveyData() throws Exception {
        // Initialize the database
        diversitySurveyDataRepository.saveAndFlush(diversitySurveyData);

        int databaseSizeBeforeDelete = diversitySurveyDataRepository.findAll().size();

        // Delete the diversitySurveyData
        restDiversitySurveyDataMockMvc.perform(delete("/api/diversity-survey-data/{id}", diversitySurveyData.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DiversitySurveyData> diversitySurveyDataList = diversitySurveyDataRepository.findAll();
        assertThat(diversitySurveyDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
