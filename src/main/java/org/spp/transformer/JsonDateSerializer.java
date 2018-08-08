package org.spp.transformer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class JsonDateSerializer extends JsonSerializer<Date> {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Override
    public void serialize(Date date, JsonGenerator gen, SerializerProvider provider)
            throws IOException, JsonProcessingException {

        String formattedDate = format.format(date);

        gen.writeString(formattedDate);
    }
}
