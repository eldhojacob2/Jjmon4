package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DiversityQuestionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiversityQuestion.class);
        DiversityQuestion diversityQuestion1 = new DiversityQuestion();
        diversityQuestion1.setId(1L);
        DiversityQuestion diversityQuestion2 = new DiversityQuestion();
        diversityQuestion2.setId(diversityQuestion1.getId());
        assertThat(diversityQuestion1).isEqualTo(diversityQuestion2);
        diversityQuestion2.setId(2L);
        assertThat(diversityQuestion1).isNotEqualTo(diversityQuestion2);
        diversityQuestion1.setId(null);
        assertThat(diversityQuestion1).isNotEqualTo(diversityQuestion2);
    }
}
