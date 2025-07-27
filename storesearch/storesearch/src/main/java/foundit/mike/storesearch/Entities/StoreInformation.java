package foundit.mike.storesearch.Entities;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(indexName = "storeinformation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreInformation {
    @Id
    private String id;
    private String storeName;
    @Field(type = FieldType.Nested)
    private List<Section> sections;
}
