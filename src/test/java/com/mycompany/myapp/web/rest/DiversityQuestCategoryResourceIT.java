package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JjApp4App;
import com.mycompany.myapp.domain.DiversityQuestCategory;
import com.mycompany.myapp.repository.DiversityQuestCategoryRepository;

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
 * Integration tests for the {@link DiversityQuestCategoryResource} REST controller.
 */
@SpringBootTest(classes = JjApp4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiversityQuestCategoryResourceIT {

    private static final Integer DEFAULT_CATEGORY_SEQ_NO = 1;
    private static final Integer UPDATED_CATEGORY_SEQ_NO = 2;

    private static final String DEFAULT_CATEGORY_NO = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_NO = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY_DESC = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY_DESC = "BBBBBBBBBB";

    @Autowired
    private DiversityQuestCategoryRepository diversityQuestCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiversityQuestCategoryMockMvc;

    private DiversityQuestCategory diversityQuestCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityQuestCategory createEntity(EntityManager em) {
        DiversityQuestCategory diversityQuestCategory = new DiversityQuestCategory()
            .categorySeqNo(DEFAULT_CATEGORY_SEQ_NO)
            .categoryNo(DEFAULT_CATEGORY_NO)
            .categoryDesc(DEFAULT_CATEGORY_DESC);
        return diversityQuestCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityQuestCategory createUpdatedEntity(EntityManager em) {
        DiversityQuestCategory diversityQuestCategory = new DiversityQuestCategory()
            .categorySeqNo(UPDATED_CATEGORY_SEQ_NO)
            .categoryNo(UPDATED_CATEGORY_NO)
            .categoryDesc(UPDATED_CATEGORY_DESC);
        return diversityQuestCategory;
    }

    @BeforeEach
    public void initTest() {
        diversityQuestCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiversityQuestCategory() throws Exception {
        int databaseSizeBeforeCreate = diversityQuestCategoryRepository.findAll().size();
        // Create the DiversityQuestCategory
        restDiversityQuestCategoryMockMvc.perform(post("/api/diversity-quest-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityQuestCategory)))
            .andExpect(status().isCreated());

        // Validate the DiversityQuestCategory in the database
        List<DiversityQuestCategory> diversityQuestCategoryList = diversityQuestCategoryRepository.findAll();
        assertThat(diversityQuestCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        DiversityQuestCategory testDiversityQuestCategory = diversityQuestCategoryList.get(diversityQuestCategoryList.size() - 1);
        assertThat(testDiversityQuestCategory.getCategorySeqNo()).isEqualTo(DEFAULT_CATEGORY_SEQ_NO);
        assertThat(testDiversityQuestCategory.getCategoryNo()).isEqualTo(DEFAULT_CATEGORY_NO);
        assertThat(testDiversityQuestCategory.getCategoryDesc()).isEqualTo(DEFAULT_CATEGORY_DESC);
    }

    @Test
    @Transactional
    public void createDiversityQuestCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diversityQuestCategoryRepository.findAll().size();

        // Create the DiversityQuestCategory with an existing ID
        diversityQuestCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiversityQuestCategoryMockMvc.perform(post("/api/diversity-quest-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityQuestCategory)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityQuestCategory in the database
        List<DiversityQuestCategory> diversityQuestCategoryList = diversityQuestCategoryRepository.findAll();
        assertThat(diversityQuestCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiversityQuestCategories() throws Exception {
        // Initialize the database
        diversityQuestCategoryRepository.saveAndFlush(diversityQuestCategory);

        // Get all the diversityQuestCategoryList
        restDiversityQuestCategoryMockMvc.perform(get("/api/diversity-quest-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diversityQuestCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].categorySeqNo").value(hasItem(DEFAULT_CATEGORY_SEQ_NO)))
            .andExpect(jsonPath("$.[*].categoryNo").value(hasItem(DEFAULT_CATEGORY_NO)))
            .andExpect(jsonPath("$.[*].categoryDesc").value(hasItem(DEFAULT_CATEGORY_DESC)));
    }
    
    @Test
    @Transactional
    public void getDiversityQuestCategory() throws Exception {
        // Initialize the database
        diversityQuestCategoryRepository.saveAndFlush(diversityQuestCategory);

        // Get the diversityQuestCategory
        restDiversityQuestCategoryMockMvc.perform(get("/api/diversity-quest-categories/{id}", diversityQuestCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diversityQuestCategory.getId().intValue()))
            .andExpect(jsonPath("$.categorySeqNo").value(DEFAULT_CATEGORY_SEQ_NO))
            .andExpect(jsonPath("$.categoryNo").value(DEFAULT_CATEGORY_NO))
            .andExpect(jsonPath("$.categoryDesc").value(DEFAULT_CATEGORY_DESC));
    }
    @Test
    @Transactional
    public void getNonExistingDiversityQuestCategory() throws Exception {
        // Get the diversityQuestCategory
        restDiversityQuestCategoryMockMvc.perform(get("/api/diversity-quest-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiversityQuestCategory() throws Exception {
        // Initialize the database
        diversityQuestCategoryRepository.saveAndFlush(diversityQuestCategory);

        int databaseSizeBeforeUpdate = diversityQuestCategoryRepository.findAll().size();

        // Update the diversityQuestCategory
        DiversityQuestCategory updatedDiversityQuestCategory = diversityQuestCategoryRepository.findById(diversityQuestCategory.getId()).get();
        // Disconnect from session so that the updates on updatedDiversityQuestCategory are not directly saved in db
        em.detach(updatedDiversityQuestCategory);
        updatedDiversityQuestCategory
            .categorySeqNo(UPDATED_CATEGORY_SEQ_NO)
            .categoryNo(UPDATED_CATEGORY_NO)
            .categoryDesc(UPDATED_CATEGORY_DESC);

        restDiversityQuestCategoryMockMvc.perform(put("/api/diversity-quest-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiversityQuestCategory)))
            .andExpect(status().isOk());

        // Validate the DiversityQuestCategory in the database
        List<DiversityQuestCategory> diversityQuestCategoryList = diversityQuestCategoryRepository.findAll();
        assertThat(diversityQuestCategoryList).hasSize(databaseSizeBeforeUpdate);
        DiversityQuestCategory testDiversityQuestCategory = diversityQuestCategoryList.get(diversityQuestCategoryList.size() - 1);
        assertThat(testDiversityQuestCategory.getCategorySeqNo()).isEqualTo(UPDATED_CATEGORY_SEQ_NO);
        assertThat(testDiversityQuestCategory.getCategoryNo()).isEqualTo(UPDATED_CATEGORY_NO);
        assertThat(testDiversityQuestCategory.getCategoryDesc()).isEqualTo(UPDATED_CATEGORY_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingDiversityQuestCategory() throws Exception {
        int databaseSizeBeforeUpdate = diversityQuestCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiversityQuestCategoryMockMvc.perform(put("/api/diversity-quest-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityQuestCategory)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityQuestCategory in the database
        List<DiversityQuestCategory> diversityQuestCategoryList = diversityQuestCategoryRepository.findAll();
        assertThat(diversityQuestCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiversityQuestCategory() throws Exception {
        // Initialize the database
        diversityQuestCategoryRepository.saveAndFlush(diversityQuestCategory);

        int databaseSizeBeforeDelete = diversityQuestCategoryRepository.findAll().size();

        // Delete the diversityQuestCategory
        restDiversityQuestCategoryMockMvc.perform(delete("/api/diversity-quest-categories/{id}", diversityQuestCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DiversityQuestCategory> diversityQuestCategoryList = diversityQuestCategoryRepository.findAll();
        assertThat(diversityQuestCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
