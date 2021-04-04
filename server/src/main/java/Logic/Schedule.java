package Logic;


public class Schedule {

  private int id;
  private int routeid;
  private int stime;
  private java.sql.Date sdate;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getRouteid() {
    return routeid;
  }

  public void setRouteid(int routeid) {
    this.routeid = routeid;
  }


  public int getStime() {
    return stime;
  }

  public void setStime(int stime) {
    this.stime = stime;
  }


  public java.sql.Date getSdate() {
    return sdate;
  }

  public void setSdate(java.sql.Date sdate) {
    this.sdate = sdate;
  }

}
