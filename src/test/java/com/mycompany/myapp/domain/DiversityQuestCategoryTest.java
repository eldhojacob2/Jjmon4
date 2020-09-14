package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DiversityQuestCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiversityQuestCategory.class);
        DiversityQuestCategory diversityQuestCategory1 = new DiversityQuestCategory();
        diversityQuestCategory1.setId(1L);
        DiversityQuestCategory diversityQuestCategory2 = new DiversityQuestCategory();
        diversityQuestCategory2.setId(diversityQuestCategory1.getId());
        assertThat(diversityQuestCategory1).isEqualTo(diversityQuestCategory2);
        diversityQuestCategory2.setId(2L);
        assertThat(diversityQuestCategory1).isNotEqualTo(diversityQuestCategory2);
        diversityQuestCategory1.setId(null);
        assertThat(diversityQuestCategory1).isNotEqualTo(diversityQuestCategory2);
    }
}
