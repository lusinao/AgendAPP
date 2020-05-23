using System.Web;
using System.Web.Optimization;

namespace AGENDAPP
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/Jquery/jquery-3.5.1.min.js",
                        "~/Scripts/JqueryCore/jquery-1.12.4.min.js"));
      
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                       "~/Content/bootstrap-4.4.1-dist/js/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/JsTemplate").Include(
                        "~/Assets/plugins/global/plugins.bundle.js",
                        "~/Assets/JsTemplate/scripts.bundle.js",
                        "~/Assets/plugins/custom/fullcalendar/fullcalendar.bundle.js",
                        "~/Assets/plugins/custom/gmaps/gmaps.js",
                        "~/Assets/js/pages/dashboard.js",
                        "~/ActionJs/Layout/ColoresTemplate.js"));

            bundles.Add(new StyleBundle("~/Content/CssTemplate").Include(
                       "~/Assets/plugins/custom/fullcalendar/fullcalendar.bundle.css",
                       "~/Assets/plugins/global/plugins.bundle.css",
                       "~/Assets/CssTemplate/Layout/style.bundle.css",
                       "~/CssPages/Layout/ColoresTemplate.css",
                       "~/Assets/js/pages/dashboard.js"));

            bundles.Add(new ScriptBundle("~/bundles/JsPlugins").Include(
                        "~/Assets/plugins/moment/moment.js",
                        "~/Assets/plugins/moment/min/moment-with-locales.min.js",
                        "~/Assets/plugins/Timepicker/js/bootstrap-material-datetimepicker.js"));

            bundles.Add(new StyleBundle("~/Content/CssPlugins").Include(
                       "~/Assets/plugins/Timepicker/css/bootstrap-material-datetimepicker.css"));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap-4.4.1-dist/css/bootstrap.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/javascriptNoti")
                                   .Include("~/Assets/plugins/noty/lib/Velocity.js")
                                   .Include("~/Assets/plugins/noty/lib/build/mo.js")
                                   .Include("~/Assets/plugins/noty/lib/bounce.min.js")
                                   .Include("~/Assets/plugins/noty/lib/noty.js")
                                   );
            bundles.Add(new StyleBundle("~/Content/cssNoti")
                                        .Include("~/Assets/plugins/noty/lib/noty.css")
                                        .Include("~/Assets/plugins/noty/lib/themes/sunset.css")
                                        .Include("~/Assets/plugins/noty/lib/themes/metroui.css")
                                        .Include("~/Assets/plugins/noty/lib/themes/semanticui.css")
                                        );
        }
    }
}
