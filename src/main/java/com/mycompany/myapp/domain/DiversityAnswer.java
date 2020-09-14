package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

import com.mycompany.myapp.domain.enumeration.AnswerInputType;

/**
 * A DiversityAnswer.
 */
@Entity
@Table(name = "diversity_answer")
public class DiversityAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answer_seq_no")
    private Integer answerSeqNo;

    @Enumerated(EnumType.STRING)
    @Column(name = "answer_type")
    private AnswerInputType answerType;

    @Column(name = "answer_custom_label")
    private String answerCustomLabel;

    @Column(name = "answer_desc")
    private String answerDesc;

    @ManyToOne
    @JsonIgnoreProperties(value = "diversityAnswers", allowSetters = true)
    private DiversityQuestion question;

    @ManyToOne
    @JsonIgnoreProperties(value = "diversityAnswers", allowSetters = true)
    private DiversityQuestCategory questCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnswerSeqNo() {
        return answerSeqNo;
    }

    public DiversityAnswer answerSeqNo(Integer answerSeqNo) {
        this.answerSeqNo = answerSeqNo;
        return this;
    }

    public void setAnswerSeqNo(Integer answerSeqNo) {
        this.answerSeqNo = answerSeqNo;
    }

    public AnswerInputType getAnswerType() {
        return answerType;
    }

    public DiversityAnswer answerType(AnswerInputType answerType) {
        this.answerType = answerType;
        return this;
    }

    public void setAnswerType(AnswerInputType answerType) {
        this.answerType = answerType;
    }

    public String getAnswerCustomLabel() {
        return answerCustomLabel;
    }

    public DiversityAnswer answerCustomLabel(String answerCustomLabel) {
        this.answerCustomLabel = answerCustomLabel;
        return this;
    }

    public void setAnswerCustomLabel(String answerCustomLabel) {
        this.answerCustomLabel = answerCustomLabel;
    }

    public String getAnswerDesc() {
        return answerDesc;
    }

    public DiversityAnswer answerDesc(String answerDesc) {
        this.answerDesc = answerDesc;
        return this;
    }

    public void setAnswerDesc(String answerDesc) {
        this.answerDesc = answerDesc;
    }

    public DiversityQuestion getQuestion() {
        return question;
    }

    public DiversityAnswer question(DiversityQuestion diversityQuestion) {
        this.question = diversityQuestion;
        return this;
    }

    public void setQuestion(DiversityQuestion diversityQuestion) {
        this.question = diversityQuestion;
    }

    public DiversityQuestCategory getQuestCategory() {
        return questCategory;
    }

    public DiversityAnswer questCategory(DiversityQuestCategory diversityQuestCategory) {
        this.questCategory = diversityQuestCategory;
        return this;
    }

    public void setQuestCategory(DiversityQuestCategory diversityQuestCategory) {
        this.questCategory = diversityQuestCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DiversityAnswer)) {
            return false;
        }
        return id != null && id.equals(((DiversityAnswer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiversityAnswer{" +
            "id=" + getId() +
            ", answerSeqNo=" + getAnswerSeqNo() +
            ", answerType='" + getAnswerType() + "'" +
            ", answerCustomLabel='" + getAnswerCustomLabel() + "'" +
            ", answerDesc='" + getAnswerDesc() + "'" +
            "}";
    }
}
