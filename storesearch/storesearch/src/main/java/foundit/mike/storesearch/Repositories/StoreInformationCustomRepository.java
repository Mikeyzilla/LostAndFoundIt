package foundit.mike.storesearch.Repositories;

import java.util.List;

import foundit.mike.storesearch.Entities.StoreInformation;

public interface StoreInformationCustomRepository {
    List<StoreInformation> searchNestedItems(String term);
}
