package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JjApp4App;
import com.mycompany.myapp.domain.DiversityTheme;
import com.mycompany.myapp.repository.DiversityThemeRepository;

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
 * Integration tests for the {@link DiversityThemeResource} REST controller.
 */
@SpringBootTest(classes = JjApp4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiversityThemeResourceIT {

    private static final Integer DEFAULT_THEME_SEQ_NO = 1;
    private static final Integer UPDATED_THEME_SEQ_NO = 2;

    private static final String DEFAULT_THEME_NAME = "AAAAAAAAAA";
    private static final String UPDATED_THEME_NAME = "BBBBBBBBBB";

    @Autowired
    private DiversityThemeRepository diversityThemeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiversityThemeMockMvc;

    private DiversityTheme diversityTheme;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityTheme createEntity(EntityManager em) {
        DiversityTheme diversityTheme = new DiversityTheme()
            .themeSeqNo(DEFAULT_THEME_SEQ_NO)
            .themeName(DEFAULT_THEME_NAME);
        return diversityTheme;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityTheme createUpdatedEntity(EntityManager em) {
        DiversityTheme diversityTheme = new DiversityTheme()
            .themeSeqNo(UPDATED_THEME_SEQ_NO)
            .themeName(UPDATED_THEME_NAME);
        return diversityTheme;
    }

    @BeforeEach
    public void initTest() {
        diversityTheme = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiversityTheme() throws Exception {
        int databaseSizeBeforeCreate = diversityThemeRepository.findAll().size();
        // Create the DiversityTheme
        restDiversityThemeMockMvc.perform(post("/api/diversity-themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityTheme)))
            .andExpect(status().isCreated());

        // Validate the DiversityTheme in the database
        List<DiversityTheme> diversityThemeList = diversityThemeRepository.findAll();
        assertThat(diversityThemeList).hasSize(databaseSizeBeforeCreate + 1);
        DiversityTheme testDiversityTheme = diversityThemeList.get(diversityThemeList.size() - 1);
        assertThat(testDiversityTheme.getThemeSeqNo()).isEqualTo(DEFAULT_THEME_SEQ_NO);
        assertThat(testDiversityTheme.getThemeName()).isEqualTo(DEFAULT_THEME_NAME);
    }

    @Test
    @Transactional
    public void createDiversityThemeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diversityThemeRepository.findAll().size();

        // Create the DiversityTheme with an existing ID
        diversityTheme.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiversityThemeMockMvc.perform(post("/api/diversity-themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityTheme)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityTheme in the database
        List<DiversityTheme> diversityThemeList = diversityThemeRepository.findAll();
        assertThat(diversityThemeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiversityThemes() throws Exception {
        // Initialize the database
        diversityThemeRepository.saveAndFlush(diversityTheme);

        // Get all the diversityThemeList
        restDiversityThemeMockMvc.perform(get("/api/diversity-themes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diversityTheme.getId().intValue())))
            .andExpect(jsonPath("$.[*].themeSeqNo").value(hasItem(DEFAULT_THEME_SEQ_NO)))
            .andExpect(jsonPath("$.[*].themeName").value(hasItem(DEFAULT_THEME_NAME)));
    }
    
    @Test
    @Transactional
    public void getDiversityTheme() throws Exception {
        // Initialize the database
        diversityThemeRepository.saveAndFlush(diversityTheme);

        // Get the diversityTheme
        restDiversityThemeMockMvc.perform(get("/api/diversity-themes/{id}", diversityTheme.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diversityTheme.getId().intValue()))
            .andExpect(jsonPath("$.themeSeqNo").value(DEFAULT_THEME_SEQ_NO))
            .andExpect(jsonPath("$.themeName").value(DEFAULT_THEME_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingDiversityTheme() throws Exception {
        // Get the diversityTheme
        restDiversityThemeMockMvc.perform(get("/api/diversity-themes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiversityTheme() throws Exception {
        // Initialize the database
        diversityThemeRepository.saveAndFlush(diversityTheme);

        int databaseSizeBeforeUpdate = diversityThemeRepository.findAll().size();

        // Update the diversityTheme
        DiversityTheme updatedDiversityTheme = diversityThemeRepository.findById(diversityTheme.getId()).get();
        // Disconnect from session so that the updates on updatedDiversityTheme are not directly saved in db
        em.detach(updatedDiversityTheme);
        updatedDiversityTheme
            .themeSeqNo(UPDATED_THEME_SEQ_NO)
            .themeName(UPDATED_THEME_NAME);

        restDiversityThemeMockMvc.perform(put("/api/diversity-themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiversityTheme)))
            .andExpect(status().isOk());

        // Validate the DiversityTheme in the database
        List<DiversityTheme> diversityThemeList = diversityThemeRepository.findAll();
        assertThat(diversityThemeList).hasSize(databaseSizeBeforeUpdate);
        DiversityTheme testDiversityTheme = diversityThemeList.get(diversityThemeList.size() - 1);
        assertThat(testDiversityTheme.getThemeSeqNo()).isEqualTo(UPDATED_THEME_SEQ_NO);
        assertThat(testDiversityTheme.getThemeName()).isEqualTo(UPDATED_THEME_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDiversityTheme() throws Exception {
        int databaseSizeBeforeUpdate = diversityThemeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiversityThemeMockMvc.perform(put("/api/diversity-themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityTheme)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityTheme in the database
        List<DiversityTheme> diversityThemeList = diversityThemeRepository.findAll();
        assertThat(diversityThemeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiversityTheme() throws Exception {
        // Initialize the database
        diversityThemeRepository.saveAndFlush(diversityTheme);

        int databaseSizeBeforeDelete = diversityThemeRepository.findAll().size();

        // Delete the diversityTheme
        restDiversityThemeMockMvc.perform(delete("/api/diversity-themes/{id}", diversityTheme.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DiversityTheme> diversityThemeList = diversityThemeRepository.findAll();
        assertThat(diversityThemeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
