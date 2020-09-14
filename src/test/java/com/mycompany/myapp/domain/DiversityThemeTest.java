package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DiversityThemeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiversityTheme.class);
        DiversityTheme diversityTheme1 = new DiversityTheme();
        diversityTheme1.setId(1L);
        DiversityTheme diversityTheme2 = new DiversityTheme();
        diversityTheme2.setId(diversityTheme1.getId());
        assertThat(diversityTheme1).isEqualTo(diversityTheme2);
        diversityTheme2.setId(2L);
        assertThat(diversityTheme1).isNotEqualTo(diversityTheme2);
        diversityTheme1.setId(null);
        assertThat(diversityTheme1).isNotEqualTo(diversityTheme2);
    }
}
