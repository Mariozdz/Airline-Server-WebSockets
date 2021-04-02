package Logic;


import java.sql.Date;

public class Flight {

  private int id;
  private int leave;
  private java.sql.Date ltime;
  private int arrive;
  private java.sql.Date Atime;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getLeave() {
    return leave;
  }

  public void setLeave(int leave) {
    this.leave = leave;
  }


  public int getArrive() {
    return arrive;
  }

  public void setArrive(int arrive) {
    this.arrive = arrive;
  }

  public java.sql.Date getLtime() {
    return ltime;
  }

  public java.sql.Date getAtime() {
    return Atime;
  }

  public void setLtime(Date ltime) {
    this.ltime = ltime;
  }

  public void setAtime(Date latime) {
    this.Atime = latime;
  }
}
