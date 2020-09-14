package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DiversitySurveyDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiversitySurveyData.class);
        DiversitySurveyData diversitySurveyData1 = new DiversitySurveyData();
        diversitySurveyData1.setId(1L);
        DiversitySurveyData diversitySurveyData2 = new DiversitySurveyData();
        diversitySurveyData2.setId(diversitySurveyData1.getId());
        assertThat(diversitySurveyData1).isEqualTo(diversitySurveyData2);
        diversitySurveyData2.setId(2L);
        assertThat(diversitySurveyData1).isNotEqualTo(diversitySurveyData2);
        diversitySurveyData1.setId(null);
        assertThat(diversitySurveyData1).isNotEqualTo(diversitySurveyData2);
    }
}
