//Fortaleza de contraseña
const expRegAscNum = /012|123|234|345|456|567|678|789/;
const expRegDesNum = /987|876|765|654|543|432|321|210/;
const expRegRepeat = /((.+)?)((.)\4\4)((.+)?)/;
const reverseWhiteList = /[^a-zA-Z0-9]/;
const expRegStrong = /(?=^.{10,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
var fn = {
    validatePassword: function(pass) {
        if (pass.length < 3) {
            return 0;
        }
        if (pass.length < 10) {
            return 1;
        }
        if (!expRegStrong.test(pass) || (expRegAscNum.test(pass) || expRegDesNum.test(pass) || expRegRepeat.test(pass)) || reverseWhiteList.test(pass)) {
            return 2;
        }
        if (expRegStrong.test(pass)) {
            return 3;
        }
    }
}
var metrics = {
    0: {
        "color": "#D8D8D8",
        "size": "0.1",
        "text": "Fortaleza de la contraseña",
        "icono": "lock-icon-grey.png",
        "clase": "icono-size-4"
    },
    1: {
        "color": "#F35E61",
        "size": "0.2",
        "text": "Tu contraseña no es segura",
        "icono": "lock-icon-red.png",
        "clase": "icono-size-4"
    },
    2: {
        "color": "#F8CD51",
        "size": "0.5",
        "text": "Tu contraseña sigue sin ser segura",
        "icono": "lock-icon-yellow.png",
        "clase": "icono-size-4"
    },
    3: {
        "color": "#48AE64",
        "size": "1.03",
        "text": "¡Tu contraseña es segura!",
        "icono": "lock-icon-green.png",
        "clase": "icono-size-4"
    }
}
$("#password1").keyup(function() {
    result = metrics[fn.validatePassword($(this).val())];
    var position = fn.validatePassword($(this).val());
    $('#meterbar').css({
        '-webkit-transform': 'skewX(-50deg) scaleX(' + result.size + ')',
        '-moz-transform': 'skewX(-50deg) scaleX(' + result.size + ')',
        '-ms-transform': 'skewX(-50deg) scaleX(' + result.size + ')',
        '-o-transform': 'skewX(-50deg) scaleX(' + result.size + ')',
        'transform': 'skewX(-50deg) scaleX(' + result.size + ')',
        'background': result.color
    });

    $(".form-group-meter .isec img").attr('src', "images/icons/" + result.icono);
    if (position == "1" || position == "2" || position == "3" || position == "4") {
        $(".form-group-meter .isec").addClass(result.clase);
    } else {
        $(".form-group-meter .isec").removeClass(result.clase);
    }
    $(".form-group-meter p").text(result.text);
});
//Validación de contraseña
$("#password1").keypress(function(key) {
    if ((key.charCode < 48 || key.charCode > 57) //numbers
        &&
        (key.charCode < 97 || key.charCode > 122) //Uppercase letters
        &&
        (key.charCode < 65 || key.charCode > 90) //letters
        &&
        (key.charCode !== 0) //Borrar
    ) return false;
    return true;
});

//habilitar - deshabilitar botón
function checkInputs() {
    if (fn.validatePassword($("#password1").val()) == 3 && $("#password2").val() != "") {
        $("a[title='Continuar']").addClass("btn__medium-blue");
        $("a[title='Continuar']").removeClass("btn__disabled");
        $("a[title='Continuar']").click(function(event) {
            event.preventDefault();

            if (fn.validatePassword($("#password1").val()) == 3) {
                if ($("#password2").val() != $("#password1").val()) {
                    showInputError($("#password2"), "Las contraseñas no coinciden", {
                        "eventx": "keyup",
                        "validation": function() {
                            return $("#password2").val() == $("#password1").val();
                        }
                    });
                    return;
                } else {
                    //todo está bien
                    showWait();
                    setTimeout(() => {
                        document.forms[0].submit();
                    }, 1000);
                }
            }

        })
    } else {
        $("a[title='Continuar']").removeClass("btn__medium-blue");
        $("a[title='Continuar']").addClass("btn__disabled");
    }
}
$("#password1").keyup(checkInputs);
$("#password2").keyup(checkInputs);
$("a.btn__disabled").click(function(event) {
    event.preventDefault();
});