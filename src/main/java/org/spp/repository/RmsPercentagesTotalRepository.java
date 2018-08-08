package org.spp.repository;

import org.spp.model.RmsPercentagesTotal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "rms-percentage-total", path = "rms-percentage-total")
public interface RmsPercentagesTotalRepository extends MongoRepository<RmsPercentagesTotal, String> {
    List<RmsPercentagesTotal> findByPercentageType(@Param("type") String type);

    List<RmsPercentagesTotal> findByFirstOfMonthBetween(
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("startDate") Date startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("endDate") Date endDate);

    List<RmsPercentagesTotal> findByPercentageTypeAndFirstOfMonthBetween(@Param("type") String type,
                                                                         @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("startDate") Date startDate,
                                                                         @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("endDate") Date endDate);
}
