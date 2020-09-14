package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DiversityQuestion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DiversityQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiversityQuestionRepository extends JpaRepository<DiversityQuestion, Long> {
}
