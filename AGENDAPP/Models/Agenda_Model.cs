using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AGENDAPP.Models;


namespace AGENDAPP.Models
{
    public class Agenda_Model
    {
        #region availability adjustment
        public static object List_of_availability_settings()
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    object Availability_Adjustments = (from a in db.MPS_AJUSTE_DISPONIBILIDAD
                                                       join ds in db.MPS_DIAS_SEMANA
                                                       on a.COD_DIA_SEMANA equals ds.ID_DIA_SEMANA
                                                       select new
                                                       {
                                                           a.ID_AJUSTE_DISPONIBILIDAD,
                                                           a.HORA_INICIO,
                                                           a.HORA_TERMINO,
                                                           ds.DIA_SEMANA
                                                       }).ToList();
                    return new { Respuesta = true, Availability_Adjustments };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }
        public static object Save_Availability_Setting(MPS_AJUSTE_DISPONIBILIDAD[] availability_adjustment)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    List<MPS_AJUSTE_DISPONIBILIDAD> New_Adjustments_Availability = new List<MPS_AJUSTE_DISPONIBILIDAD>();
                    List<MPS_AJUSTE_DISPONIBILIDAD> Non_Existing_Availability_Adjustment = new List<MPS_AJUSTE_DISPONIBILIDAD>();

                    foreach (var item in availability_adjustment)
                    {
                        MPS_AJUSTE_DISPONIBILIDAD Existing_Availability_Adjustment = db.MPS_AJUSTE_DISPONIBILIDAD.Where(a => a.COD_DIA_SEMANA == item.COD_DIA_SEMANA).FirstOrDefault();

                        if (Existing_Availability_Adjustment == null)
                        {
                            MPS_AJUSTE_DISPONIBILIDAD New_Adjustment_Availability = new MPS_AJUSTE_DISPONIBILIDAD();
                            New_Adjustment_Availability.HORA_INICIO = item.HORA_INICIO;
                            New_Adjustment_Availability.HORA_TERMINO = item.HORA_TERMINO;
                            New_Adjustment_Availability.COD_DIA_SEMANA = item.COD_DIA_SEMANA;
                            New_Adjustment_Availability.COD_ESTADO = item.COD_ESTADO;

                            db.MPS_AJUSTE_DISPONIBILIDAD.Add(New_Adjustment_Availability);
                            db.SaveChanges();
                            New_Adjustments_Availability.Add(New_Adjustment_Availability);
                        }
                        else
                        {
                            Non_Existing_Availability_Adjustment.Add(Existing_Availability_Adjustment);
                        }

                    }

                    object Availability_Adjustments = (from a in New_Adjustments_Availability
                                                       join ds in db.MPS_DIAS_SEMANA
                                                       on a.COD_DIA_SEMANA equals ds.ID_DIA_SEMANA
                                                       select new
                                                       {
                                                           a.ID_AJUSTE_DISPONIBILIDAD,
                                                           a.HORA_INICIO,
                                                           a.HORA_TERMINO,
                                                           ds.DIA_SEMANA
                                                       }).ToList();

                    object Unavailable_Adjustment_Adjustments = (from a in Non_Existing_Availability_Adjustment
                                                                 join ds in db.MPS_DIAS_SEMANA
                                                                 on a.COD_DIA_SEMANA equals ds.ID_DIA_SEMANA
                                                                 select new
                                                                 {
                                                                     a.ID_AJUSTE_DISPONIBILIDAD,
                                                                     a.HORA_INICIO,
                                                                     a.HORA_TERMINO,
                                                                     ds.DIA_SEMANA
                                                                 }).ToList();


                    return new { Respuesta = true, Availability_Adjustments, Unavailable_Adjustment_Adjustments };

                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }

        }
        public static object Edit_Availability_Setting(int Code, DateTime Edit_time_from, DateTime Edit_hour_until, int Bloquear_Registros)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    MPS_AJUSTE_DISPONIBILIDAD Ajuste_Existente = db.MPS_AJUSTE_DISPONIBILIDAD.Where(a => a.ID_AJUSTE_DISPONIBILIDAD == Code).FirstOrDefault();

                    Ajuste_Existente.HORA_INICIO = Edit_time_from;
                    Ajuste_Existente.HORA_TERMINO = Edit_hour_until;
                    db.SaveChanges();

                    return new { Respuesta = true };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }
        public static object Delete_Availability_Setting(int Code, int Bloquear_Registros)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    db.Database.ExecuteSqlCommand($"DELETE FROM MPS_AJUSTE_DISPONIBILIDAD WHERE ID_AJUSTE_DISPONIBILIDAD = {Code}");
                    return new { Respuesta = true };
                }
            }
            catch (Exception Error)
            {

                return new { Respuesta = false, Error.Message };
            }
        }

        #endregion

        #region Horario Profesional
        public static object Agregar_Horario_Profesional(MPS_HORARIO_PROFESIONAL Horario_Profesional, MPS_DIAS_SEMANA[] Detalle_dias)
        {
            try
            {
                using (MPS_DB db = new MPS_DB())
                {
                    db.MPS_HORARIO_PROFESIONAL.Add(Horario_Profesional);
                    db.SaveChanges();

                    foreach (var item in Detalle_dias)
                    {
                        MPS_DETALLE_DIAS_ATENCION Horario_detalle_dia = new MPS_DETALLE_DIAS_ATENCION();
                        Horario_detalle_dia.COD_DIA_SEMANA = item.ID_DIA_SEMANA;
                        Horario_detalle_dia.COD_HORARIO_PROFESIONAL = Horario_Profesional.ID_HORARIO_PROFESIONAL;
                        db.MPS_DETALLE_DIAS_ATENCION.Add(Horario_detalle_dia);
                        db.SaveChanges();
                    }

                    DateTime Fecha_Inicio = Horario_Profesional.FECHA_DESDE.Value;

                    while (Fecha_Inicio <= Horario_Profesional.FECHA_HASTA)
                    {
                        DateTime Hora_Inicio = Horario_Profesional.HORA_INICIO.Value;

                        int Codigo_dia = (int)Convert.ToDateTime(Fecha_Inicio).DayOfWeek;
                        bool Dia_Semana_Existe = Detalle_dias.Any(a => a.ID_DIA_SEMANA == Codigo_dia);
                        if (Dia_Semana_Existe)
                        {
                            while (Hora_Inicio <= Horario_Profesional.HORA_TERMINO)
                            {
                                MPS_DETALLE_HORARIO_PROFESIONAL Detalle_Horario = new MPS_DETALLE_HORARIO_PROFESIONAL();
                                Detalle_Horario.FECHA_ATENCION = Fecha_Inicio;
                                Detalle_Horario.HORA_ATENCION = Hora_Inicio;
                                Detalle_Horario.COD_HORARIO_PROFESIONAL = Horario_Profesional.ID_HORARIO_PROFESIONAL;
                                Detalle_Horario.COD_ESTADO = 1;

                                db.MPS_DETALLE_HORARIO_PROFESIONAL.Add(Detalle_Horario);
                                db.SaveChanges();

                                int Minutos = Horario_Profesional.DURACION_CITA.Value + Horario_Profesional.ESPACIO_ENTRE_CITA.Value;
                                Hora_Inicio = Convert.ToDateTime(Hora_Inicio).AddMinutes(Minutos);
                            }
                            Fecha_Inicio = Convert.ToDateTime(Fecha_Inicio).AddDays(1);
                        }
                        else
                        {
                            Fecha_Inicio = Convert.ToDateTime(Fecha_Inicio).AddDays(1);
                        }
                    }

                    return new { Respuesta = true };

                }
            }
            catch (Exception Error)
            {
                return new { Respuesta = false, Error.Message };
            }
        }
        #endregion
    }
}