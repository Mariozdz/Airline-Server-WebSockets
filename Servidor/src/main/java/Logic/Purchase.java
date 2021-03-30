package Logic;


public class Purchase {

  private String id;
  private String flightid;
  private String userid;
  private double totalprice;


  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }


  public String getFlightid() {
    return flightid;
  }

  public void setFlightid(String flightid) {
    this.flightid = flightid;
  }


  public String getUserid() {
    return userid;
  }

  public void setUserid(String userid) {
    this.userid = userid;
  }


  public double getTotalprice() {
    return totalprice;
  }

  public void setTotalprice(double totalprice) {
    this.totalprice = totalprice;
  }

}
