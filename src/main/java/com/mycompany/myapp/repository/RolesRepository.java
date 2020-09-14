package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Roles;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Roles entity.
 */
@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {

    @Query(value = "select distinct roles from Roles roles left join fetch roles.employees",
        countQuery = "select count(distinct roles) from Roles roles")
    Page<Roles> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct roles from Roles roles left join fetch roles.employees")
    List<Roles> findAllWithEagerRelationships();

    @Query("select roles from Roles roles left join fetch roles.employees where roles.id =:id")
    Optional<Roles> findOneWithEagerRelationships(@Param("id") Long id);
}
