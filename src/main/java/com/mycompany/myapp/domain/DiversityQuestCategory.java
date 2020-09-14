package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DiversityQuestCategory.
 */
@Entity
@Table(name = "diversity_quest_category")
public class DiversityQuestCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_seq_no")
    private Integer categorySeqNo;

    @Column(name = "category_no")
    private String categoryNo;

    @Column(name = "category_desc")
    private String categoryDesc;

    @ManyToOne
    @JsonIgnoreProperties(value = "diversityQuestCategories", allowSetters = true)
    private DiversityQuestion question;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCategorySeqNo() {
        return categorySeqNo;
    }

    public DiversityQuestCategory categorySeqNo(Integer categorySeqNo) {
        this.categorySeqNo = categorySeqNo;
        return this;
    }

    public void setCategorySeqNo(Integer categorySeqNo) {
        this.categorySeqNo = categorySeqNo;
    }

    public String getCategoryNo() {
        return categoryNo;
    }

    public DiversityQuestCategory categoryNo(String categoryNo) {
        this.categoryNo = categoryNo;
        return this;
    }

    public void setCategoryNo(String categoryNo) {
        this.categoryNo = categoryNo;
    }

    public String getCategoryDesc() {
        return categoryDesc;
    }

    public DiversityQuestCategory categoryDesc(String categoryDesc) {
        this.categoryDesc = categoryDesc;
        return this;
    }

    public void setCategoryDesc(String categoryDesc) {
        this.categoryDesc = categoryDesc;
    }

    public DiversityQuestion getQuestion() {
        return question;
    }

    public DiversityQuestCategory question(DiversityQuestion diversityQuestion) {
        this.question = diversityQuestion;
        return this;
    }

    public void setQuestion(DiversityQuestion diversityQuestion) {
        this.question = diversityQuestion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DiversityQuestCategory)) {
            return false;
        }
        return id != null && id.equals(((DiversityQuestCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiversityQuestCategory{" +
            "id=" + getId() +
            ", categorySeqNo=" + getCategorySeqNo() +
            ", categoryNo='" + getCategoryNo() + "'" +
            ", categoryDesc='" + getCategoryDesc() + "'" +
            "}";
    }
}
