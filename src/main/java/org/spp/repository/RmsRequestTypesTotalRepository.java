package org.spp.repository;


import org.spp.model.RmsRequestTypesTotal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "rms-request-types-total", path = "rms-request-types-total")
public interface RmsRequestTypesTotalRepository extends MongoRepository<RmsRequestTypesTotal, String> {
    List<RmsRequestTypesTotal> findByFirstOfMonthBetween(
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("startDate") Date startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("endDate") Date endDate);
}
