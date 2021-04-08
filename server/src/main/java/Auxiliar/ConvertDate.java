package Auxiliar;

import Datos.CountryDao;
import Model.CountryModel;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class ConvertDate {

    private static ConvertDate instance = null;

    private ConvertDate() {

    }


    public static ConvertDate getInstance() {
        if (instance == null)
            instance = new ConvertDate();
        return instance;
    }


    public Date timetodate(String time)
    {

        String fecha = "2015-05-05 "+time;

        Calendar dat = Calendar.getInstance();
        dat.set(Calendar.YEAR, Integer.valueOf(fecha.substring(0,4)));
        dat.set(Calendar.MONTH, Integer.valueOf(fecha.substring(5,7)));
        dat.set(Calendar.DAY_OF_MONTH, Integer.valueOf(fecha.substring(8,10)));
        dat.set(Calendar.HOUR_OF_DAY, Integer.valueOf(fecha.substring(11,13)));
        dat.set(Calendar.MINUTE, Integer.valueOf(fecha.substring(14,16)));

        return new java.sql.Date(dat.getTime().getTime());
    }

    public Date getDate(String fecha)
    {
        Calendar dat = Calendar.getInstance();
        dat.set(Calendar.YEAR, Integer.valueOf(fecha.substring(0,4)));
        dat.set(Calendar.MONTH, Integer.valueOf(fecha.substring(5,7))-1);
        dat.set(Calendar.DAY_OF_MONTH, Integer.valueOf(fecha.substring(8,10)));
        dat.set(Calendar.HOUR_OF_DAY, Integer.valueOf(fecha.substring(11,13)));
        dat.set(Calendar.MINUTE, Integer.valueOf(fecha.substring(14,16)));

        return new java.sql.Date(dat.getTime().getTime());
    }


    public String getHour(Date date)
    {

        long val = date.getTime();
        Date dal = new Date(val);
        SimpleDateFormat df2 = new SimpleDateFormat("HH:mm");
        String dateText = df2.format(dal);
        System.out.println(dateText);

        return "";
    }
}
