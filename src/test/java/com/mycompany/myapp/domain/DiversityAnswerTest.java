package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DiversityAnswerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiversityAnswer.class);
        DiversityAnswer diversityAnswer1 = new DiversityAnswer();
        diversityAnswer1.setId(1L);
        DiversityAnswer diversityAnswer2 = new DiversityAnswer();
        diversityAnswer2.setId(diversityAnswer1.getId());
        assertThat(diversityAnswer1).isEqualTo(diversityAnswer2);
        diversityAnswer2.setId(2L);
        assertThat(diversityAnswer1).isNotEqualTo(diversityAnswer2);
        diversityAnswer1.setId(null);
        assertThat(diversityAnswer1).isNotEqualTo(diversityAnswer2);
    }
}
