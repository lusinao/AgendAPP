import { Fetch, bouncejsShow, bouncejsClose } from "../Globales/Global.js";
var Boton_Anterior = '';
window.addEventListener('load', async function () {

    $('.time-picker').bootstrapMaterialDatePicker
        ({
            date: false,
            shortTime: false,
            format: 'HH:mm'
        });



    const Fetchs = Fetch('../Agenda/List_of_availability_settings', null);
    const Resultado = await Fetchs.FetchWithOutData();
    console.log(Resultado);

    if (Resultado.Respuesta) {
        let Contenido = '';
        const TbodyAjusteDisponibilidad = document.getElementById('TbodyAjusteDisponibilidad');
        TbodyAjusteDisponibilidad.innerHTML = '';

        for (const Item of Resultado.Availability_Adjustments) {
            Contenido += `<tr>
                                <td>${Item.DIA_SEMANA}</td>                                
                                <td>${moment(Item.HORA_INICIO).format('HH:mm')}</td>                                
                                <td>${moment(Item.HORA_TERMINO).format('HH:mm')}</td>                                
                                <td><button class="btn btn-info" value="${Item.ID_AJUSTE_DISPONIBILIDAD}" onclick="Edit_availability_adjustment(this)">Editar</button></td>                                
                                <td><button class="btn btn-secondary" value="${Item.ID_AJUSTE_DISPONIBILIDAD}" onclick="Delete_availability_adjustment(this)">Quitar</button></td>                                
                          </tr>`;
        }
        TbodyAjusteDisponibilidad.innerHTML = Contenido;
    }
});

document.getElementById('Save_adjustment').addEventListener('click', async function () {
    let Errores = 0;
    let Check_Count = 0;

    const txt_time_from = document.getElementById('txt_time_from');
    const txt_hour_until = document.getElementById('txt_hour_until');

    const Thead_Dias = document.getElementById('Thead_Days');
    const Columns_th = Thead_Dias.getElementsByTagName('tr')[0].getElementsByTagName('th');
    for (const Item of Columns_th) {
        const Input_Check = Item.getElementsByTagName('span')[0].getElementsByTagName('input')[0];

        if (Input_Check.checked) {
            Check_Count++;
        }
    }

    if (Check_Count === 0) {
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
        Errores++;
    }

    if (txt_time_from.value === '') {
        new Noty({
            text: '<strong>Advertencia</strong> Debes ingresar una hora de comienzo.',
            type: 'alert',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();
        Errores++;
    }

    if (txt_hour_until.value === '') {
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
        Errores++;
    }

    if (Errores === 0) {
        const Ajustes_de_disponibilidad = new Array();
        for (const Item of Columns_th) {
            const Input_Check = Item.getElementsByTagName('span')[0].getElementsByTagName('input')[0];

            if (Input_Check.checked) {
                const Nuevo_Ajuste = new Object();
                Nuevo_Ajuste.HORA_INICIO = txt_time_from.value;
                Nuevo_Ajuste.HORA_TERMINO = txt_hour_until.value;
                Nuevo_Ajuste.COD_DIA_SEMANA = Input_Check.value;
                Nuevo_Ajuste.COD_ESTADO = 1;
                Ajustes_de_disponibilidad.push(Nuevo_Ajuste);
            }
        }
        console.log(Ajustes_de_disponibilidad);

        const Fetchs = Fetch('../Agenda/Save_Availability_Setting', { availability_adjustment: Ajustes_de_disponibilidad });
        const Resultado = await Fetchs.FetchWithData();
        console.log(Resultado);

        if (Resultado.Respuesta) {
            let Contenido = '';

            const TbodyAjusteDisponibilidad = document.getElementById('TbodyAjusteDisponibilidad');

            for (const Item of Resultado.Availability_Adjustments) {
                let tr = document.createElement('tr');
                Contenido += `
                                <td>${Item.DIA_SEMANA}</td>                                
                                <td>${moment(Item.HORA_INICIO).format('HH:mm')}</td>                                
                                <td>${moment(Item.HORA_TERMINO).format('HH:mm')}</td>                                
                                <td><button class="btn btn-info" value="${Item.ID_AJUSTE_DISPONIBILIDAD}" onclick="Edit_availability_adjustment(this)">Editar</button></td>                                
                                <td><button class="btn btn-secondary" value="${Item.ID_AJUSTE_DISPONIBILIDAD}" onclick="Delete_availability_adjustment(this)">Quitar</button></td>`;
                tr.innerHTML = Contenido;
                TbodyAjusteDisponibilidad.appendChild(tr);
                Contenido = '';

            }

            if (Resultado.Unavailable_Adjustment_Adjustments.length !== 0) {

                Contenido = '';
                const TbodyAjusteDisponibilidadNoAgregados = document.getElementById('TbodyAjusteDisponibilidadNoAgregados');
                TbodyAjusteDisponibilidadNoAgregados.innerHTML = '';

                for (const Item of Resultado.Unavailable_Adjustment_Adjustments) {
                    Contenido += `<tr>
                                <td>${Item.DIA_SEMANA}</td>                                
                                <td>${moment(Item.HORA_INICIO).format('HH:mm')}</td>                                
                                <td>${moment(Item.HORA_TERMINO).format('HH:mm')}</td>                                
                             </tr>`;
                }
                TbodyAjusteDisponibilidadNoAgregados.innerHTML = Contenido;
                $("#Days_not_added_Modal").modal('show');
            }

            if (Resultado.Availability_Adjustments.length !== 0) {
                new Noty({
                    text: '<strong>Información</strong> Ajuste de disponibilidad Creada con exito.',
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
    }
});

window.Edit_availability_adjustment = function Edit_availability_adjustment(Btn) {
    const txt_edit_time_from = document.getElementById('txt_edit_time_from');
    const txt_edit_hour_until = document.getElementById('txt_edit_hour_until');
    const Edit_day = document.getElementById('Edit_day');

    document.getElementById('Guardar_Horario_Editado').value = Btn.value;
    const tr = Btn.parentNode.parentNode;
    Edit_day.innerText = tr.getElementsByTagName('td')[0].innerText;
    txt_edit_time_from.value = tr.getElementsByTagName('td')[1].innerText;
    txt_edit_hour_until.value = tr.getElementsByTagName('td')[2].innerText;

    Boton_Anterior = Btn;

    $("#Edit_availability_adjustment_Modal").modal('show');
};
window.Delete_availability_adjustment = function Delete_availability_adjustment(Btn) {

    let Contenido = '';
    const tbody_quitar_dia = document.getElementById('tbody_quitar_dia');
    tbody_quitar_dia.innerHTML = '';

    document.getElementById('Quitar_Horario').value = Btn.value;

    const tr = Btn.parentNode.parentNode;
    Edit_day.innerText = tr.getElementsByTagName('td')[0].innerText;
    txt_edit_time_from.value = tr.getElementsByTagName('td')[1].innerText;
    txt_edit_hour_until.value = tr.getElementsByTagName('td')[2].innerText;

    Contenido += `<tr>
                    <td>${tr.getElementsByTagName('td')[0].innerText}</td>                                
                    <td>${tr.getElementsByTagName('td')[1].innerText}</td>                                
                    <td>${tr.getElementsByTagName('td')[2].innerText}</td>                                
                 </tr>`;

    tbody_quitar_dia.innerHTML = Contenido;

    Boton_Anterior = Btn;

    $("#Delete_availability_adjustment_Modal").modal('show');

};

document.getElementById('Guardar_Horario_Editado').addEventListener('click', async function () {
    const txt_edit_time_from = document.getElementById('txt_edit_time_from');
    const txt_edit_hour_until = document.getElementById('txt_edit_hour_until');

    let Bloquear_Registros = document.getElementById('Lock_records').checked === true ? 1 : 0;

    const Fetchs = Fetch('../Agenda/Edit_Availability_Setting', { Code: this.value, Edit_time_from: txt_edit_time_from.value, Edit_hour_until: txt_edit_hour_until.value, Bloquear_Registros: Bloquear_Registros});
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {

        const tr = Boton_Anterior.parentNode.parentNode;
        tr.getElementsByTagName('td')[1].innerText = txt_edit_time_from.value;
        tr.getElementsByTagName('td')[2].innerText = txt_edit_hour_until.value;

        new Noty({
            text: '<strong>Información</strong> Ajuste de disponibilidad modificado con exito.',
            type: 'info',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();

        $("#Edit_availability_adjustment_Modal").modal('hide');
    }
});

document.getElementById('Quitar_Horario').addEventListener('click', async function () {

    let Bloquear_Registros = document.getElementById('Delete_lock_records').checked === true ? 1 : 0;
    const Fetchs = Fetch('../Agenda/Delete_Availability_Setting', { Code: this.value, Bloquear_Registros: Bloquear_Registros });
    const Resultado = await Fetchs.FetchWithData();

    if (Resultado.Respuesta) {

        const tbody = Boton_Anterior.parentNode.parentNode.parentNode;
        const tr = Boton_Anterior.parentNode.parentNode;

        tbody.removeChild(tr);


        new Noty({
            text: '<strong>Información</strong> Ajuste de disponibilidad eliminado con exito.',
            type: 'info',
            theme: 'metroui',
            layout: 'topRight',
            timeout: 4000,
            animation: {
                open: bouncejsShow,
                close: bouncejsClose
            }
        }).show();

        $("#Delete_availability_adjustment_Modal").modal('hide');
    }
});
