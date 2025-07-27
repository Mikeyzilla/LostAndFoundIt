package foundit.mike.storesearch.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Variation {
    private String variationName;
    private String brandName;
    private int amount;
}
