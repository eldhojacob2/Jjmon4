package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.EmployeeRoleType;

/**
 * A Roles.
 */
@Entity
@Table(name = "roles")
public class Roles implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type")
    private EmployeeRoleType roleType;

    @ManyToMany
    @JoinTable(name = "roles_employee",
               joinColumns = @JoinColumn(name = "roles_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"))
    private Set<DiversityEmployee> employees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmployeeRoleType getRoleType() {
        return roleType;
    }

    public Roles roleType(EmployeeRoleType roleType) {
        this.roleType = roleType;
        return this;
    }

    public void setRoleType(EmployeeRoleType roleType) {
        this.roleType = roleType;
    }

    public Set<DiversityEmployee> getEmployees() {
        return employees;
    }

    public Roles employees(Set<DiversityEmployee> diversityEmployees) {
        this.employees = diversityEmployees;
        return this;
    }

    public Roles addEmployee(DiversityEmployee diversityEmployee) {
        this.employees.add(diversityEmployee);
        diversityEmployee.getRoles().add(this);
        return this;
    }

    public Roles removeEmployee(DiversityEmployee diversityEmployee) {
        this.employees.remove(diversityEmployee);
        diversityEmployee.getRoles().remove(this);
        return this;
    }

    public void setEmployees(Set<DiversityEmployee> diversityEmployees) {
        this.employees = diversityEmployees;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Roles)) {
            return false;
        }
        return id != null && id.equals(((Roles) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Roles{" +
            "id=" + getId() +
            ", roleType='" + getRoleType() + "'" +
            "}";
    }
}
