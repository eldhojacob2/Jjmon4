package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JjApp4App;
import com.mycompany.myapp.domain.DiversityQuestion;
import com.mycompany.myapp.repository.DiversityQuestionRepository;

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
 * Integration tests for the {@link DiversityQuestionResource} REST controller.
 */
@SpringBootTest(classes = JjApp4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiversityQuestionResourceIT {

    private static final Integer DEFAULT_QUESTION_SEQ_NO = 1;
    private static final Integer UPDATED_QUESTION_SEQ_NO = 2;

    private static final String DEFAULT_QUESTION_NO = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION_NO = "BBBBBBBBBB";

    private static final String DEFAULT_QUESTION_DESC = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION_DESC = "BBBBBBBBBB";

    @Autowired
    private DiversityQuestionRepository diversityQuestionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiversityQuestionMockMvc;

    private DiversityQuestion diversityQuestion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityQuestion createEntity(EntityManager em) {
        DiversityQuestion diversityQuestion = new DiversityQuestion()
            .questionSeqNo(DEFAULT_QUESTION_SEQ_NO)
            .questionNo(DEFAULT_QUESTION_NO)
            .questionDesc(DEFAULT_QUESTION_DESC);
        return diversityQuestion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityQuestion createUpdatedEntity(EntityManager em) {
        DiversityQuestion diversityQuestion = new DiversityQuestion()
            .questionSeqNo(UPDATED_QUESTION_SEQ_NO)
            .questionNo(UPDATED_QUESTION_NO)
            .questionDesc(UPDATED_QUESTION_DESC);
        return diversityQuestion;
    }

    @BeforeEach
    public void initTest() {
        diversityQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiversityQuestion() throws Exception {
        int databaseSizeBeforeCreate = diversityQuestionRepository.findAll().size();
        // Create the DiversityQuestion
        restDiversityQuestionMockMvc.perform(post("/api/diversity-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityQuestion)))
            .andExpect(status().isCreated());

        // Validate the DiversityQuestion in the database
        List<DiversityQuestion> diversityQuestionList = diversityQuestionRepository.findAll();
        assertThat(diversityQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        DiversityQuestion testDiversityQuestion = diversityQuestionList.get(diversityQuestionList.size() - 1);
        assertThat(testDiversityQuestion.getQuestionSeqNo()).isEqualTo(DEFAULT_QUESTION_SEQ_NO);
        assertThat(testDiversityQuestion.getQuestionNo()).isEqualTo(DEFAULT_QUESTION_NO);
        assertThat(testDiversityQuestion.getQuestionDesc()).isEqualTo(DEFAULT_QUESTION_DESC);
    }

    @Test
    @Transactional
    public void createDiversityQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diversityQuestionRepository.findAll().size();

        // Create the DiversityQuestion with an existing ID
        diversityQuestion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiversityQuestionMockMvc.perform(post("/api/diversity-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityQuestion in the database
        List<DiversityQuestion> diversityQuestionList = diversityQuestionRepository.findAll();
        assertThat(diversityQuestionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiversityQuestions() throws Exception {
        // Initialize the database
        diversityQuestionRepository.saveAndFlush(diversityQuestion);

        // Get all the diversityQuestionList
        restDiversityQuestionMockMvc.perform(get("/api/diversity-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diversityQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].questionSeqNo").value(hasItem(DEFAULT_QUESTION_SEQ_NO)))
            .andExpect(jsonPath("$.[*].questionNo").value(hasItem(DEFAULT_QUESTION_NO)))
            .andExpect(jsonPath("$.[*].questionDesc").value(hasItem(DEFAULT_QUESTION_DESC)));
    }
    
    @Test
    @Transactional
    public void getDiversityQuestion() throws Exception {
        // Initialize the database
        diversityQuestionRepository.saveAndFlush(diversityQuestion);

        // Get the diversityQuestion
        restDiversityQuestionMockMvc.perform(get("/api/diversity-questions/{id}", diversityQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diversityQuestion.getId().intValue()))
            .andExpect(jsonPath("$.questionSeqNo").value(DEFAULT_QUESTION_SEQ_NO))
            .andExpect(jsonPath("$.questionNo").value(DEFAULT_QUESTION_NO))
            .andExpect(jsonPath("$.questionDesc").value(DEFAULT_QUESTION_DESC));
    }
    @Test
    @Transactional
    public void getNonExistingDiversityQuestion() throws Exception {
        // Get the diversityQuestion
        restDiversityQuestionMockMvc.perform(get("/api/diversity-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiversityQuestion() throws Exception {
        // Initialize the database
        diversityQuestionRepository.saveAndFlush(diversityQuestion);

        int databaseSizeBeforeUpdate = diversityQuestionRepository.findAll().size();

        // Update the diversityQuestion
        DiversityQuestion updatedDiversityQuestion = diversityQuestionRepository.findById(diversityQuestion.getId()).get();
        // Disconnect from session so that the updates on updatedDiversityQuestion are not directly saved in db
        em.detach(updatedDiversityQuestion);
        updatedDiversityQuestion
            .questionSeqNo(UPDATED_QUESTION_SEQ_NO)
            .questionNo(UPDATED_QUESTION_NO)
            .questionDesc(UPDATED_QUESTION_DESC);

        restDiversityQuestionMockMvc.perform(put("/api/diversity-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiversityQuestion)))
            .andExpect(status().isOk());

        // Validate the DiversityQuestion in the database
        List<DiversityQuestion> diversityQuestionList = diversityQuestionRepository.findAll();
        assertThat(diversityQuestionList).hasSize(databaseSizeBeforeUpdate);
        DiversityQuestion testDiversityQuestion = diversityQuestionList.get(diversityQuestionList.size() - 1);
        assertThat(testDiversityQuestion.getQuestionSeqNo()).isEqualTo(UPDATED_QUESTION_SEQ_NO);
        assertThat(testDiversityQuestion.getQuestionNo()).isEqualTo(UPDATED_QUESTION_NO);
        assertThat(testDiversityQuestion.getQuestionDesc()).isEqualTo(UPDATED_QUESTION_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingDiversityQuestion() throws Exception {
        int databaseSizeBeforeUpdate = diversityQuestionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiversityQuestionMockMvc.perform(put("/api/diversity-questions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityQuestion in the database
        List<DiversityQuestion> diversityQuestionList = diversityQuestionRepository.findAll();
        assertThat(diversityQuestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiversityQuestion() throws Exception {
        // Initialize the database
        diversityQuestionRepository.saveAndFlush(diversityQuestion);

        int databaseSizeBeforeDelete = diversityQuestionRepository.findAll().size();

        // Delete the diversityQuestion
        restDiversityQuestionMockMvc.perform(delete("/api/diversity-questions/{id}", diversityQuestion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DiversityQuestion> diversityQuestionList = diversityQuestionRepository.findAll();
        assertThat(diversityQuestionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
