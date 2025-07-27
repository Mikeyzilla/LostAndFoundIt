package foundit.mike.storesearch.Repositories;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Repository;

import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import foundit.mike.storesearch.Entities.StoreInformation;

@Repository
public class StoreInformationRepositoryImpl implements StoreInformationCustomRepository {

    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;
    @Override
    public List<StoreInformation> searchNestedItems(String searchTerm) {

        Query itemNameQuery = Query.of(q -> q
            .nested(nq -> nq
                .path("sections.aisles.items")
                .query(q2 -> q2
                    .matchPhrasePrefix(m -> m
                        .field("sections.aisles.items.itemName")
                        .query(searchTerm)
                    )
                )
            )
        );

        Query variationNameQuery = Query.of(q -> q
            .nested(nq -> nq
                .path("sections.aisles.items.variations")
                .query(q2 -> q2
                    .matchPhrasePrefix(m -> m
                        .field("sections.aisles.items.variations.variationName")
                        .query(searchTerm)
                    )
                )
            )
        );

        Query combinedQuery = Query.of(q -> q
            .bool(b -> b
                .should(itemNameQuery)
                .should(variationNameQuery)
            )
        );

        NativeQuery searchQuery = NativeQuery.builder()
            .withQuery(combinedQuery)
            .build();

        SearchHits<StoreInformation> hits = elasticsearchTemplate.search(searchQuery, StoreInformation.class);

        return hits.getSearchHits().stream()
            .map(SearchHit::getContent)
            .collect(Collectors.toList());
    }

}

