package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DiversityQuestCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DiversityQuestCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiversityQuestCategoryRepository extends JpaRepository<DiversityQuestCategory, Long> {
}
