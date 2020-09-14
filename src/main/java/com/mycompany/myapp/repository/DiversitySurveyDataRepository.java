package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DiversitySurveyData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DiversitySurveyData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiversitySurveyDataRepository extends JpaRepository<DiversitySurveyData, Long> {
}
