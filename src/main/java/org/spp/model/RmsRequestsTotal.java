package org.spp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "rms_requests_total")
public class RmsRequestsTotal {

    @Id
    private String id;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date firstOfMonth;
    private String status;
    private Integer value;

    public RmsRequestsTotal() { }

    public RmsRequestsTotal(Date firstOfMonth, String status, Integer value) {
        this.firstOfMonth = firstOfMonth;
        this.status = status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "RmsRequestsTotal{" +
                "id='" + id + '\'' +
                ", firstOfMonth=" + firstOfMonth +
                ", status='" + status + '\'' +
                ", value=" + value +
                '}';
    }
}
