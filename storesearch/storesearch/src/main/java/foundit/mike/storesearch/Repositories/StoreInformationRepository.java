package foundit.mike.storesearch.Repositories;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import foundit.mike.storesearch.Entities.StoreInformation;

@Repository
public interface StoreInformationRepository extends ElasticsearchRepository<StoreInformation, String>, StoreInformationCustomRepository {

}
