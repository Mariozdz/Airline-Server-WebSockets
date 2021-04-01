package Logic;


public class Purchase {

  private int id;
  private int flightid;
  private String userid;
  private double totalprice;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getFlightid() {
    return flightid;
  }

  public void setFlightid(int flightid) {
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
