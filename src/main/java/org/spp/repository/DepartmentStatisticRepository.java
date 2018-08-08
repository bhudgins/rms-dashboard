package org.spp.repository;

import org.spp.model.DepartmentStatistic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "department-statistics", path = "department-statistics")
public interface DepartmentStatisticRepository extends MongoRepository<DepartmentStatistic, String> {

    List<DepartmentStatistic> findByDepartmentName(@Param("name") String name);

    List<DepartmentStatistic> findByQuarterBeginBetween(
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("startDate") Date startDate,
            @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("endDate") Date endDate);

    List<DepartmentStatistic> findByDepartmentNameAndQuarterBeginBetween(@Param("name") String name,
             @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("startDate") Date startDate,
             @DateTimeFormat(pattern = "yyyy-MM-dd")@Param("endDate") Date endDate);
}
