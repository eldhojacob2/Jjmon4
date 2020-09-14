package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JjApp4App;
import com.mycompany.myapp.domain.DiversityAnswer;
import com.mycompany.myapp.repository.DiversityAnswerRepository;

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

import com.mycompany.myapp.domain.enumeration.AnswerInputType;
/**
 * Integration tests for the {@link DiversityAnswerResource} REST controller.
 */
@SpringBootTest(classes = JjApp4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiversityAnswerResourceIT {

    private static final Integer DEFAULT_ANSWER_SEQ_NO = 1;
    private static final Integer UPDATED_ANSWER_SEQ_NO = 2;

    private static final AnswerInputType DEFAULT_ANSWER_TYPE = AnswerInputType.RADIO;
    private static final AnswerInputType UPDATED_ANSWER_TYPE = AnswerInputType.CHECKBOX;

    private static final String DEFAULT_ANSWER_CUSTOM_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER_CUSTOM_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_ANSWER_DESC = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER_DESC = "BBBBBBBBBB";

    @Autowired
    private DiversityAnswerRepository diversityAnswerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiversityAnswerMockMvc;

    private DiversityAnswer diversityAnswer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityAnswer createEntity(EntityManager em) {
        DiversityAnswer diversityAnswer = new DiversityAnswer()
            .answerSeqNo(DEFAULT_ANSWER_SEQ_NO)
            .answerType(DEFAULT_ANSWER_TYPE)
            .answerCustomLabel(DEFAULT_ANSWER_CUSTOM_LABEL)
            .answerDesc(DEFAULT_ANSWER_DESC);
        return diversityAnswer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DiversityAnswer createUpdatedEntity(EntityManager em) {
        DiversityAnswer diversityAnswer = new DiversityAnswer()
            .answerSeqNo(UPDATED_ANSWER_SEQ_NO)
            .answerType(UPDATED_ANSWER_TYPE)
            .answerCustomLabel(UPDATED_ANSWER_CUSTOM_LABEL)
            .answerDesc(UPDATED_ANSWER_DESC);
        return diversityAnswer;
    }

    @BeforeEach
    public void initTest() {
        diversityAnswer = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiversityAnswer() throws Exception {
        int databaseSizeBeforeCreate = diversityAnswerRepository.findAll().size();
        // Create the DiversityAnswer
        restDiversityAnswerMockMvc.perform(post("/api/diversity-answers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityAnswer)))
            .andExpect(status().isCreated());

        // Validate the DiversityAnswer in the database
        List<DiversityAnswer> diversityAnswerList = diversityAnswerRepository.findAll();
        assertThat(diversityAnswerList).hasSize(databaseSizeBeforeCreate + 1);
        DiversityAnswer testDiversityAnswer = diversityAnswerList.get(diversityAnswerList.size() - 1);
        assertThat(testDiversityAnswer.getAnswerSeqNo()).isEqualTo(DEFAULT_ANSWER_SEQ_NO);
        assertThat(testDiversityAnswer.getAnswerType()).isEqualTo(DEFAULT_ANSWER_TYPE);
        assertThat(testDiversityAnswer.getAnswerCustomLabel()).isEqualTo(DEFAULT_ANSWER_CUSTOM_LABEL);
        assertThat(testDiversityAnswer.getAnswerDesc()).isEqualTo(DEFAULT_ANSWER_DESC);
    }

    @Test
    @Transactional
    public void createDiversityAnswerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diversityAnswerRepository.findAll().size();

        // Create the DiversityAnswer with an existing ID
        diversityAnswer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiversityAnswerMockMvc.perform(post("/api/diversity-answers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityAnswer)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityAnswer in the database
        List<DiversityAnswer> diversityAnswerList = diversityAnswerRepository.findAll();
        assertThat(diversityAnswerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiversityAnswers() throws Exception {
        // Initialize the database
        diversityAnswerRepository.saveAndFlush(diversityAnswer);

        // Get all the diversityAnswerList
        restDiversityAnswerMockMvc.perform(get("/api/diversity-answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diversityAnswer.getId().intValue())))
            .andExpect(jsonPath("$.[*].answerSeqNo").value(hasItem(DEFAULT_ANSWER_SEQ_NO)))
            .andExpect(jsonPath("$.[*].answerType").value(hasItem(DEFAULT_ANSWER_TYPE.toString())))
            .andExpect(jsonPath("$.[*].answerCustomLabel").value(hasItem(DEFAULT_ANSWER_CUSTOM_LABEL)))
            .andExpect(jsonPath("$.[*].answerDesc").value(hasItem(DEFAULT_ANSWER_DESC)));
    }
    
    @Test
    @Transactional
    public void getDiversityAnswer() throws Exception {
        // Initialize the database
        diversityAnswerRepository.saveAndFlush(diversityAnswer);

        // Get the diversityAnswer
        restDiversityAnswerMockMvc.perform(get("/api/diversity-answers/{id}", diversityAnswer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diversityAnswer.getId().intValue()))
            .andExpect(jsonPath("$.answerSeqNo").value(DEFAULT_ANSWER_SEQ_NO))
            .andExpect(jsonPath("$.answerType").value(DEFAULT_ANSWER_TYPE.toString()))
            .andExpect(jsonPath("$.answerCustomLabel").value(DEFAULT_ANSWER_CUSTOM_LABEL))
            .andExpect(jsonPath("$.answerDesc").value(DEFAULT_ANSWER_DESC));
    }
    @Test
    @Transactional
    public void getNonExistingDiversityAnswer() throws Exception {
        // Get the diversityAnswer
        restDiversityAnswerMockMvc.perform(get("/api/diversity-answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiversityAnswer() throws Exception {
        // Initialize the database
        diversityAnswerRepository.saveAndFlush(diversityAnswer);

        int databaseSizeBeforeUpdate = diversityAnswerRepository.findAll().size();

        // Update the diversityAnswer
        DiversityAnswer updatedDiversityAnswer = diversityAnswerRepository.findById(diversityAnswer.getId()).get();
        // Disconnect from session so that the updates on updatedDiversityAnswer are not directly saved in db
        em.detach(updatedDiversityAnswer);
        updatedDiversityAnswer
            .answerSeqNo(UPDATED_ANSWER_SEQ_NO)
            .answerType(UPDATED_ANSWER_TYPE)
            .answerCustomLabel(UPDATED_ANSWER_CUSTOM_LABEL)
            .answerDesc(UPDATED_ANSWER_DESC);

        restDiversityAnswerMockMvc.perform(put("/api/diversity-answers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiversityAnswer)))
            .andExpect(status().isOk());

        // Validate the DiversityAnswer in the database
        List<DiversityAnswer> diversityAnswerList = diversityAnswerRepository.findAll();
        assertThat(diversityAnswerList).hasSize(databaseSizeBeforeUpdate);
        DiversityAnswer testDiversityAnswer = diversityAnswerList.get(diversityAnswerList.size() - 1);
        assertThat(testDiversityAnswer.getAnswerSeqNo()).isEqualTo(UPDATED_ANSWER_SEQ_NO);
        assertThat(testDiversityAnswer.getAnswerType()).isEqualTo(UPDATED_ANSWER_TYPE);
        assertThat(testDiversityAnswer.getAnswerCustomLabel()).isEqualTo(UPDATED_ANSWER_CUSTOM_LABEL);
        assertThat(testDiversityAnswer.getAnswerDesc()).isEqualTo(UPDATED_ANSWER_DESC);
    }

    @Test
    @Transactional
    public void updateNonExistingDiversityAnswer() throws Exception {
        int databaseSizeBeforeUpdate = diversityAnswerRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiversityAnswerMockMvc.perform(put("/api/diversity-answers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diversityAnswer)))
            .andExpect(status().isBadRequest());

        // Validate the DiversityAnswer in the database
        List<DiversityAnswer> diversityAnswerList = diversityAnswerRepository.findAll();
        assertThat(diversityAnswerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiversityAnswer() throws Exception {
        // Initialize the database
        diversityAnswerRepository.saveAndFlush(diversityAnswer);

        int databaseSizeBeforeDelete = diversityAnswerRepository.findAll().size();

        // Delete the diversityAnswer
        restDiversityAnswerMockMvc.perform(delete("/api/diversity-answers/{id}", diversityAnswer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DiversityAnswer> diversityAnswerList = diversityAnswerRepository.findAll();
        assertThat(diversityAnswerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
