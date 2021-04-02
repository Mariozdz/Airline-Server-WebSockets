package Auxiliar;


import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;


import jakarta.websocket.EndpointConfig;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.StringReader;

public class DecoderJson implements Decoder.Text<JSONObject> {

    @Override
    public JSONObject decode(String s) throws DecodeException {
        return new JSONObject(s);
    }

    @Override
    public boolean willDecode(String s) {
        try {
            new JSONObject(s);
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
