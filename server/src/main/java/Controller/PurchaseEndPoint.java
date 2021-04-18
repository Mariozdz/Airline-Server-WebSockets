package Controller;

import Auxiliar.DecoderJson;
import Auxiliar.EncoderArrayJson;
import Auxiliar.EnconderJson;
import Logic.Country;
import Logic.Purchase;
import Logic.Ticket;
import Model.FlightModel;
import Model.PurchaseModel;
import Model.RouteModel;
import Model.TicketModel;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@ServerEndpoint(value = "/purchase",
        encoders = {EnconderJson.class, EncoderArrayJson.class},
        decoders = {DecoderJson.class})
public class PurchaseEndPoint {

    private static Set<Session> sessions = new HashSet<>();
    private static JSONObject nullobj = new JSONObject("{ none : \"none\"}");

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket opened: " + session.getId());
        sessions.add(session);
    }

    @OnMessage
    public void onMessage(JSONObject message, Session session) throws Throwable {
        System.out.println("Message received: " + message + " from " + session.getId());
        try {
            System.out.println(message.getString("Action"));
            interpretar(message,session);


        } catch ( EncodeException | IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("WebSocket error for " + session.getId() + " " + throwable.getMessage());
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        System.out.println("WebSocket closed for " + session.getId()
                + " with reason " + closeReason.getCloseCode());
        sessions.remove(session);
    }

    public void broadcast(JSONObject message) throws IOException, EncodeException {
        for (Session s : sessions)
        {

            s.getBasicRemote().sendObject(message);
        }
    }

    public void interpretar(JSONObject message, Session session) throws Throwable {
        String action = message.getString("Action").toUpperCase(Locale.ROOT);

        switch(action)
        {
            case "GET": {
                int id = message.getInt("id");
                JSONObject g = new JSONObject(PurchaseModel.getInstance().Get(id));
                session.getBasicRemote().sendObject(g);
                break;
            }
            case "GET_ALL": {
                JSONArray u = new JSONArray(PurchaseModel.getInstance().search());
                session.getBasicRemote().sendObject(u);
                break;
            }
            case "UPDATE":{
                Purchase l = new Purchase();
                l.setId(message.getInt("id"));
                l.setUserid( message.getString("userid"));
                PurchaseModel.getInstance().Update(l);

                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "CREATE":
            {
                Purchase p = new Purchase();

                p.setTickets(message.getInt("tickets"));
                p.setUserid(message.getString("userid"));
                p.setFlightid(message.getInt("flightid"));

                if (message.has("returnflightid")) {
                    p.setReturnflightid(message.getInt("returnflightid"));
                }else {
                    p.setReturnflightid(0);
                }
                PurchaseModel.getInstance().Insert(p);
                session.getBasicRemote().sendObject(new JSONObject("{ state: \"ok\" }"));
                broadcast(new JSONObject("{action: \"update\"}"));
                break;
            }
            case "CREATE_TICKETS":
            {

                /* alter table Ticket add IsReturn Number default 0;*/
                /* alter table Purchase add PurchaseDate DATE default to_date('10-01-21','DD-MM-yy')*/

                if (PurchaseModel.getInstance().createTickets(message)) {

                    JSONObject asientos = new JSONObject("{action: \"update\",}");
                    asientos.put("asientos", message.getJSONArray("asientos"));
                    session.getBasicRemote().sendObject(new JSONObject("{ state: \"ok\" }"));
                    broadcast(asientos);
                }
                else
                {
                    session.getBasicRemote().sendObject(nullobj);
                }

                break;
            }
            case "GET_BY_USER":
            {
                session.getBasicRemote().sendObject(PurchaseModel.getInstance().getbyuser(message.getString("userid")));
                break;
            }
            case "GET_TICKETS_BYPURCHASE":
            {
                session.getBasicRemote().sendObject(new JSONArray(TicketModel.getInstance().getbypurchase(message.getInt("purchaseid"))));
                break;
            }
            case "GET_PURCHASE_BY_MONTH":
            {
                session.getBasicRemote().sendObject(PurchaseModel.getInstance().getTotal());
                break;
            }
            case "GET_PURCHASE_BY_YEAR":
            {
                JSONObject temp = new JSONObject();
                temp.put("earnings",PurchaseModel.getInstance().getbyyear());
                session.getBasicRemote().sendObject(temp);
                break;
            }
            case "GET_FIRST_FIVE":
            {
                session.getBasicRemote().sendObject(RouteModel.getInstance().getfirstfive());
                break;
            }
            case "GET_FLIGHT_USERS":
            {
                session.getBasicRemote().sendObject(FlightModel.getInstance().getflightusers(message.getInt("flightid")));
                break;
            }
            default: System.out.println("LLEGA AL DEFAULT ni idea oir que XDXDXD");
                session.getBasicRemote().sendObject(nullobj);
                break;
        }

    }



}
