package org.spp.config;

import org.spp.transformer.MongoStuff;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class SpringDataRestConfig extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        config.getCorsRegistry().addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "PUT", "POST", "DELETE","OPTIONS");
    }
}
