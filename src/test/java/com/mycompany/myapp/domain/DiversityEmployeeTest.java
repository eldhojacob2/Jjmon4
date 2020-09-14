package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DiversityEmployeeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiversityEmployee.class);
        DiversityEmployee diversityEmployee1 = new DiversityEmployee();
        diversityEmployee1.setId(1L);
        DiversityEmployee diversityEmployee2 = new DiversityEmployee();
        diversityEmployee2.setId(diversityEmployee1.getId());
        assertThat(diversityEmployee1).isEqualTo(diversityEmployee2);
        diversityEmployee2.setId(2L);
        assertThat(diversityEmployee1).isNotEqualTo(diversityEmployee2);
        diversityEmployee1.setId(null);
        assertThat(diversityEmployee1).isNotEqualTo(diversityEmployee2);
    }
}
