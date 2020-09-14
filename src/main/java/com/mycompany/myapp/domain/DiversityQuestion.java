package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DiversityQuestion.
 */
@Entity
@Table(name = "diversity_question")
public class DiversityQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_seq_no")
    private Integer questionSeqNo;

    @Column(name = "question_no")
    private String questionNo;

    @Column(name = "question_desc")
    private String questionDesc;

    @ManyToOne
    @JsonIgnoreProperties(value = "diversityQuestions", allowSetters = true)
    private DiversityTheme theme;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuestionSeqNo() {
        return questionSeqNo;
    }

    public DiversityQuestion questionSeqNo(Integer questionSeqNo) {
        this.questionSeqNo = questionSeqNo;
        return this;
    }

    public void setQuestionSeqNo(Integer questionSeqNo) {
        this.questionSeqNo = questionSeqNo;
    }

    public String getQuestionNo() {
        return questionNo;
    }

    public DiversityQuestion questionNo(String questionNo) {
        this.questionNo = questionNo;
        return this;
    }

    public void setQuestionNo(String questionNo) {
        this.questionNo = questionNo;
    }

    public String getQuestionDesc() {
        return questionDesc;
    }

    public DiversityQuestion questionDesc(String questionDesc) {
        this.questionDesc = questionDesc;
        return this;
    }

    public void setQuestionDesc(String questionDesc) {
        this.questionDesc = questionDesc;
    }

    public DiversityTheme getTheme() {
        return theme;
    }

    public DiversityQuestion theme(DiversityTheme diversityTheme) {
        this.theme = diversityTheme;
        return this;
    }

    public void setTheme(DiversityTheme diversityTheme) {
        this.theme = diversityTheme;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DiversityQuestion)) {
            return false;
        }
        return id != null && id.equals(((DiversityQuestion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiversityQuestion{" +
            "id=" + getId() +
            ", questionSeqNo=" + getQuestionSeqNo() +
            ", questionNo='" + getQuestionNo() + "'" +
            ", questionDesc='" + getQuestionDesc() + "'" +
            "}";
    }
}
