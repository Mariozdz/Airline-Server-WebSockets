package Logic;


public class Schedule {

  private int id;
  private int planeid;
  private int routeid;
  private java.sql.Date stime;
  private java.sql.Date sdate;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getPlaneid() {
    return planeid;
  }

  public void setPlaneid(int planeid) {
    this.planeid = planeid;
  }


  public int getRouteid() {
    return routeid;
  }

  public void setRouteid(int routeid) {
    this.routeid = routeid;
  }


  public java.sql.Date getStime() {
    return stime;
  }

  public void setStime(java.sql.Date stime) {
    this.stime = stime;
  }


  public java.sql.Date getSdate() {
    return sdate;
  }

  public void setSdate(java.sql.Date sdate) {
    this.sdate = sdate;
  }

}
