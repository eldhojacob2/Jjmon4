package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DiversityEmployee;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DiversityEmployee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiversityEmployeeRepository extends JpaRepository<DiversityEmployee, Long> {
}
