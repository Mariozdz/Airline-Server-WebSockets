package Auxiliar;

import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;
import jakarta.websocket.EndpointConfig;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DecoderArrayJson implements Decoder.Text<JSONArray>{

    @Override
    public JSONArray decode(String s) throws DecodeException {
        return new JSONArray(s);
    }

    @Override
    public boolean willDecode(String s) {
        try {
            new JSONArray(s);
            return true;
        } catch (JSONException ex) {
            return false;
        }
    }

    @Override
    public void init(EndpointConfig config) {
    }

    @Override
    public void destroy() {
    }
}
