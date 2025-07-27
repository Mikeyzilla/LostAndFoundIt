package foundit.mike.storesearch;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import foundit.mike.storesearch.Entities.Aisle;
import foundit.mike.storesearch.Entities.Item;
import foundit.mike.storesearch.Entities.Section;
import foundit.mike.storesearch.Entities.StoreInformation;
import foundit.mike.storesearch.Entities.Variation;
import foundit.mike.storesearch.Repositories.StoreInformationRepository;

@Component
public class DummyData implements CommandLineRunner {

    @Autowired
    private StoreInformationRepository repository;
    @Override
    public void run(String... args) throws Exception {
        repository.deleteAll();

        Variation grannyApple = new Variation("Granny Apple", "Brand A", 10);
        Variation redApple = new Variation("Red Apple", "Brand B", 5);
        Variation spicyChips = new Variation("Spicy Chips", "Brand C", 5);
        Item appleItem = new Item("Apple", Arrays.asList(grannyApple, redApple));
        Item chips = new Item("Chips", Arrays.asList(spicyChips));
        Aisle produceAisle = new Aisle("Aisle B3", Arrays.asList(appleItem));
        Aisle fastAisle = new Aisle("Aisle A5", Arrays.asList(chips));
        Section produceSection = new Section("Produce", Arrays.asList(produceAisle));
        Section fastSection = new Section("JunkFood", Arrays.asList(fastAisle));
        StoreInformation store = new StoreInformation();
        StoreInformation secondStore = new StoreInformation();
        store.setStoreName("Store A");
        secondStore.setStoreName("Store B");
        store.setSections(Arrays.asList(produceSection));
        secondStore.setSections(Arrays.asList(fastSection));
        repository.save(store);
        repository.save(secondStore);
    }

}

