package org.spp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "rms")
@Component
public class RmsDashboardProperties {

    @NotNull
    private String jwtSecret;

    @NotNull
    private Integer jwtTimeout;

    public String getJwtSecret() {
        return jwtSecret;
    }

    public void setJwtSecret(String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    public Integer getJwtTimeout() {
        return jwtTimeout;
    }

    public void setJwtTimeout(Integer jwtTimeout) {
        this.jwtTimeout = jwtTimeout;
    }
}
