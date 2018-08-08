package org.spp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "department_statistic")
public class DepartmentStatistic {

    @Id
    private String id;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date quarterBegin;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date quarterEnd;

    private String departmentName;
    private Integer numberOfTasksAssigned;
    private String averageTimeToResolution;

    public DepartmentStatistic() {
    }

    public DepartmentStatistic(Date quarterBegin, Date quarterEnd, String departmentName, Integer numberOfTasksAssigned, String averageTimeToResolution) {
        this.quarterBegin = quarterBegin;
        this.quarterEnd = quarterEnd;
        this.departmentName = departmentName;
        this.numberOfTasksAssigned = numberOfTasksAssigned;
        this.averageTimeToResolution = averageTimeToResolution;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getQuarterBegin() {
        return quarterBegin;
    }

    public void setQuarterBegin(Date quarterBegin) {
        this.quarterBegin = quarterBegin;
    }

    public Date getQuarterEnd() {
        return quarterEnd;
    }

    public void setQuarterEnd(Date quarterEnd) {
        this.quarterEnd = quarterEnd;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Integer getNumberOfTasksAssigned() {
        return numberOfTasksAssigned;
    }

    public void setNumberOfTasksAssigned(Integer numberOfTasksAssigned) {
        this.numberOfTasksAssigned = numberOfTasksAssigned;
    }

    public String getAverageTimeToResolution() {
        return averageTimeToResolution;
    }

    public void setAverageTimeToResolution(String averageTimeToResolution) {
        this.averageTimeToResolution = averageTimeToResolution;
    }

    @Override
    public String toString() {
        return "DepartmentStatistic{" +
                "id='" + id + '\'' +
                ", quarterBegin=" + quarterBegin +
                ", quarterEnd=" + quarterEnd +
                ", departmentName='" + departmentName + '\'' +
                ", numberOfTasksAssigned=" + numberOfTasksAssigned +
                ", averageTimeToResolution='" + averageTimeToResolution + '\'' +
                '}';
    }
}
