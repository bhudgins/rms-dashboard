package org.spp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "rms_request_types_total")
public class RmsRequestTypesTotal {

    @Id
    public String id;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private Date firstOfMonth;
    public String requestType;
    public Integer value;

    public RmsRequestTypesTotal() {}

    public RmsRequestTypesTotal(Date firstOfMonth, String requestType, Integer value) {
        this.firstOfMonth = firstOfMonth;
        this.requestType = requestType;
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

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "RmsRequestTypesTotal{" +
                "id='" + id + '\'' +
                ", firstOfMonth=" + firstOfMonth +
                ", requestType='" + requestType + '\'' +
                ", value=" + value +
                '}';
    }
}
