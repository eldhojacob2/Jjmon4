package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DiversityAnswer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DiversityAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiversityAnswerRepository extends JpaRepository<DiversityAnswer, Long> {
}
