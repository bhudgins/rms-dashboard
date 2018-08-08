package org.spp.repository;

import org.spp.model.RmsRequestsTotal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "rms-requests-total", path = "rms-requests-total")
public interface RmsRequestsTotalRepository extends MongoRepository<RmsRequestsTotal, String> {
    List<RmsRequestsTotal> findByFirstOfMonthBetween(
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("startDate") Date startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("endDate") Date endDate);
}
