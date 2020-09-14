package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DiversityTheme;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DiversityTheme entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiversityThemeRepository extends JpaRepository<DiversityTheme, Long> {
}
