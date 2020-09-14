package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DiversityTheme.
 */
@Entity
@Table(name = "diversity_theme")
public class DiversityTheme implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "theme_seq_no")
    private Integer themeSeqNo;

    @Column(name = "theme_name")
    private String themeName;

    @ManyToOne
    @JsonIgnoreProperties(value = "diversityThemes", allowSetters = true)
    private DiversitySurveyData theme;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getThemeSeqNo() {
        return themeSeqNo;
    }

    public DiversityTheme themeSeqNo(Integer themeSeqNo) {
        this.themeSeqNo = themeSeqNo;
        return this;
    }

    public void setThemeSeqNo(Integer themeSeqNo) {
        this.themeSeqNo = themeSeqNo;
    }

    public String getThemeName() {
        return themeName;
    }

    public DiversityTheme themeName(String themeName) {
        this.themeName = themeName;
        return this;
    }

    public void setThemeName(String themeName) {
        this.themeName = themeName;
    }

    public DiversitySurveyData getTheme() {
        return theme;
    }

    public DiversityTheme theme(DiversitySurveyData diversitySurveyData) {
        this.theme = diversitySurveyData;
        return this;
    }

    public void setTheme(DiversitySurveyData diversitySurveyData) {
        this.theme = diversitySurveyData;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DiversityTheme)) {
            return false;
        }
        return id != null && id.equals(((DiversityTheme) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiversityTheme{" +
            "id=" + getId() +
            ", themeSeqNo=" + getThemeSeqNo() +
            ", themeName='" + getThemeName() + "'" +
            "}";
    }
}
