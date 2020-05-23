window.addEventListener('load', function () {
    document.getElementById('kt_aside_menu').classList.add('color-transparent');
    ColorBlancoVerde();
});


function ColorBlancoVerde() {

    const SubMenus = document.getElementsByClassName('kt-menu__submenu');
    for (var i = 0, Largo = SubMenus.length; i < Largo; i++) {
        SubMenus[i].classList.add('SubCeleste');
    }
    ////Blanco verde Active.
    //document.getElementById('kt_header_superior').classList.add('verde-primavera-2');
    //document.getElementById('kt-header__topbar_superior').classList.add('verde-primavera-2-top-bar');
    //document.getElementById('kt_aside').classList.add('color-Blanco-2');
    //document.getElementById('kt_aside_brand').classList.add('color-Blanco-2');
    //document.getElementById('kt_aside_menu').classList.add('verde2');
}