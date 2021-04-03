package Auxiliar;

import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;
import jakarta.websocket.EndpointConfig;
import org.json.JSONArray;
import org.json.JSONObject;

public class EncoderArrayJson implements Encoder.Text<JSONArray>  {

    @Override
    public String encode(JSONArray object) throws EncodeException {
        return object.toString();
    }

    @Override
    public void init(EndpointConfig config) { }

    @Override
    public void destroy() { }

}
