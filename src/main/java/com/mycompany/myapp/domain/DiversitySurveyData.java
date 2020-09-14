package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A DiversitySurveyData.
 */
@Entity
@Table(name = "diversity_survey_data")
public class DiversitySurveyData implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "custom_answer")
    private String customAnswer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomAnswer() {
        return customAnswer;
    }

    public DiversitySurveyData customAnswer(String customAnswer) {
        this.customAnswer = customAnswer;
        return this;
    }

    public void setCustomAnswer(String customAnswer) {
        this.customAnswer = customAnswer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DiversitySurveyData)) {
            return false;
        }
        return id != null && id.equals(((DiversitySurveyData) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiversitySurveyData{" +
            "id=" + getId() +
            ", customAnswer='" + getCustomAnswer() + "'" +
            "}";
    }
}
