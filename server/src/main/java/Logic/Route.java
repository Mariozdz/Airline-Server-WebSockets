package Logic;


public class Route {

  private int id;
  private int duration;
  private int origenid;
  private int destinoid;
  private double price;
  private double discount;


  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }


  public int getDuration() {
    return duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }


  public int getOrigenid() {
    return origenid;
  }

  public void setOrigenid(int origenid) {
    this.origenid = origenid;
  }


  public int getDestinoid() {
    return destinoid;
  }

  public void setDestinoid(int destinoid) {
    this.destinoid = destinoid;
  }


  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }


  public double getDiscount() {
    return discount;
  }

  public void setDiscount(double discount) {
    this.discount = discount;
  }

}
