import { Fetch, bouncejsShow, bouncejsClose } from "../Globales/Global.js";

$('[data-toggle="popover"]').popover();

window.addEventListener('load', function () {
    $('#HoraInicio').bootstrapMaterialDatePicker
        ({
            date: false,
            shortTime: false,
            format: 'HH:mm'
        });

    $('#HoraTermino').bootstrapMaterialDatePicker
        ({
            date: false,
            shortTime: false,
            format: 'HH:mm'
        });

    $('#FechaDesde').bootstrapMaterialDatePicker
        ({
            format: 'DD/MM/YYYY HH:mm',
            time: false,
            clearButton: true
        });
    $('#FechaHasta').bootstrapMaterialDatePicker
        ({
            format: 'DD/MM/YYYY HH:mm',
            time: false,
            clearButton: true
        });
});

document.getElementById('Agregar_Disponibilidad_Profesional').addEventListener('click', async function () {
    let Errores = 0;

    let ContadorCheck = 0;
    const Profesional = document.getElementById('Profesional');
    const tabla_dias_head = document.getElementById('tabla_dias_head');
    const HoraInicio = document.getElementById('HoraInicio');
    const HoraTermino = document.getElementById('HoraTermino');
    const FechaDesde = document.getElementById('FechaDesde');
    const FechaHasta = document.getElementById('FechaHasta');
    const Duracion = document.getElementById('Duracion');
    const Espacio = document.getElementById('Espacio');
    const Jornada = document.getElementById('Jornada');
    const WebSi = document.getElementById('WebSi');

    const th = tabla_dias_head.getElementsByTagName('tr')[0].getElementsByTagName('th');
    for (const Item of th) {
        const input = Item.getElementsByTagName('span')[0].getElementsByTagName('input')[0];
        if (input.checked) {
            ContadorCheck++;
        }
    }

    if (Profesional.value === "0") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes seleccionar un profesional.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (ContadorCheck === 0) {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes seleccionar al menos un dia.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (HoraInicio.value === "") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes ingresar una hora de inicio.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (HoraTermino.value === "") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes ingresar una hora de termino.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (FechaDesde.value === "") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes ingresar una fecha de inicio..',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (FechaHasta.value === "") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes ingresar una fecha de termino.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (Duracion.value === "") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes ingresar la duracion de la cita.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (Espacio.value === "") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes ingresar el espacio entre cada cita..',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (Jornada.value === "0") {
        Errores++;
        new Noty({
            text: '<strong>Advertencia</strong> Debes seleccionar una jornada.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
    }

    if (Errores === 0) {

        const ArrayDias = new Array();

        for (const Item of th) {
            const input = Item.getElementsByTagName('span')[0].getElementsByTagName('input')[0];
            if (input.checked) {
                ArrayDias.push({ ID_DIA_SEMANA: input.value });
            }
        }

        const Horario_Profesional = new Object();
        Horario_Profesional.HORA_INICIO = HoraInicio.value;
        Horario_Profesional.HORA_TERMINO = HoraTermino.value;
        Horario_Profesional.FECHA_DESDE = FechaDesde.value;
        Horario_Profesional.FECHA_HASTA = FechaHasta.value;
        Horario_Profesional.DURACION_CITA = Duracion.value;
        Horario_Profesional.ESPACIO_ENTRE_CITA = Espacio.value;
        Horario_Profesional.COD_PROFESIONAL = Profesional.value;
        Horario_Profesional.COD_JORNADA = Jornada.value;
        Horario_Profesional.ATENCION_WEB = WebSi.checked === true ? 1 : 0;

        const Fetchs = Fetch('../Agenda/Agregar_Horario_Profesional', { Horario_Profesional: Horario_Profesional, Detalle_dias: ArrayDias });
        const Resultado = await Fetchs.FetchWithData();
        console.log(Resultado);
        if (Resultado.Respuesta) {
            new Noty({
                text: '<strong>Información</strong> Disponibilidad Creada con exito.',
                type: 'info',
                theme: 'metroui',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }
    }
});

document.getElementById('Agregar_Jornada').addEventListener('click', function () {
    $('#Modal_Agregar_Jornada').modal('show');
});