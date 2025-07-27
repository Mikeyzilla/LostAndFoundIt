package foundit.mike.storesearch.Entities;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class Section {
    private String sectionName;
    @Field(type = FieldType.Nested)
    private List<Aisle> aisles;
}
