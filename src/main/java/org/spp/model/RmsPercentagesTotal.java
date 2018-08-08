package org.spp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "rms_percentages_total")
public class RmsPercentagesTotal {
    @Id
    private String id;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date firstOfMonth;
    private String percentageType;
    private Integer value;

    public RmsPercentagesTotal() { }

    public RmsPercentagesTotal(Date firstOfMonth, String percentageType, Integer value) {
        this.firstOfMonth = firstOfMonth;
        this.percentageType = percentageType;
        this.value = value;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getFirstOfMonth() {
        return firstOfMonth;
    }

    public void setFirstOfMonth(Date firstOfMonth) {
        this.firstOfMonth = firstOfMonth;
    }

    public String getPercentageType() {
        return percentageType;
    }

    public void setPercentageType(String percentageType) {
        this.percentageType = percentageType;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "RmsPercentagesTotal{" +
                "id='" + id + '\'' +
                ", firstOfMonth=" + firstOfMonth +
                ", percentageType='" + percentageType + '\'' +
                ", value=" + value +
                '}';
    }
}
