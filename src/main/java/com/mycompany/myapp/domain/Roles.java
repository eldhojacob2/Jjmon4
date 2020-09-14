package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

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

    @ManyToOne
    @JsonIgnoreProperties(value = "roles", allowSetters = true)
    private DiversityEmployee employee;

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

    public DiversityEmployee getEmployee() {
        return employee;
    }

    public Roles employee(DiversityEmployee diversityEmployee) {
        this.employee = diversityEmployee;
        return this;
    }

    public void setEmployee(DiversityEmployee diversityEmployee) {
        this.employee = diversityEmployee;
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
