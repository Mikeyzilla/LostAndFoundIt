package foundit.mike.storesearch.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import foundit.mike.storesearch.Entities.StoreInformation;
import foundit.mike.storesearch.Services.StoreInformationService;

@RestController
public class StoreInformationController {

    private final StoreInformationService storeInformationService;

    @Autowired
    public StoreInformationController(StoreInformationService storeInformationService) {
        this.storeInformationService = storeInformationService;
    }

    @GetMapping("/findItem")
    public List<StoreInformation> searchByTerm(@RequestParam String term) {
        return storeInformationService.searchNestedItems(term);
    }
}
