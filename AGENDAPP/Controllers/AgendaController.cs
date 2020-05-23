using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AGENDAPP.Models;

namespace AGENDAPP.Controllers
{
    public class AgendaController : Controller
    {
        // GET: Agenda
        public ActionResult AjusteDisponibilidad()
        {
            return View();
        } 

        public ActionResult HorarioProfesional()
        {
            return View();
        }

        #region availability adjustment
        public JsonResult List_of_availability_settings()
        {
            return Json(Agenda_Model.List_of_availability_settings(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Save_Availability_Setting(MPS_AJUSTE_DISPONIBILIDAD[] availability_adjustment)
        {
            return Json(Agenda_Model.Save_Availability_Setting(availability_adjustment), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Edit_Availability_Setting(int Code, DateTime Edit_time_from, DateTime Edit_hour_until,int Bloquear_Registros)
        {
            return Json(Agenda_Model.Edit_Availability_Setting(Code, Edit_time_from, Edit_hour_until, Bloquear_Registros), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete_Availability_Setting(int Code, int Bloquear_Registros)
        {
            return Json(Agenda_Model.Delete_Availability_Setting(Code, Bloquear_Registros), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Horario Profesional
        public JsonResult Agregar_Horario_Profesional(MPS_HORARIO_PROFESIONAL Horario_Profesional, MPS_DIAS_SEMANA[] Detalle_dias)
        {
            return Json(Agenda_Model.Agregar_Horario_Profesional(Horario_Profesional, Detalle_dias), JsonRequestBehavior.AllowGet);
        }
        #endregion

    }
}