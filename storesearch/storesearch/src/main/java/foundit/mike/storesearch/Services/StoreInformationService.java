package foundit.mike.storesearch.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import foundit.mike.storesearch.Entities.StoreInformation;
import foundit.mike.storesearch.Repositories.StoreInformationRepository;
@Service
public class StoreInformationService {

    private final StoreInformationRepository storeInformationRepository;

    public StoreInformationService(StoreInformationRepository storeInformationRepository) {
        this.storeInformationRepository = storeInformationRepository;
    }

    public List<StoreInformation> searchNestedItems(String searchTerm) {
        return storeInformationRepository.searchNestedItems(searchTerm);
    }
}
