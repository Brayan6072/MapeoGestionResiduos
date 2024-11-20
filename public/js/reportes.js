 async function reportar(){ 


    const clasificacion = document.getElementById('TpBt').value;
    const estado = document.querySelector('input[name="Estado"]:checked').value;
    const etiquetau = document.getElementById('ub').value;
    console.log(clasificacion);
    console.log(estado);
    console.log(etiquetau);


    const reporte = {
        clasificacion: clasificacion,
        estado: estado,            
        etiquetau: etiquetau
    };

    
   
    const response = await fetch('http://node208363-env-8685750.sp1.br.saveincloud.net.br:13372/reportes/reportar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reporte)
    });
    
    if (response.ok) {
        const message = await response.text();
        console.log(message); // Muestra "Reporte guardado correctamente."
        ocultarCuadroTexto();
        showAlert();    
    } else {
        const errorMessage = await response.text();
        console.log(errorMessage); // Muestra "Reporte repetido."
        ocultarCuadroTexto();
        alert(errorMessage)
    }
       

    
}



const alertContainer = document.getElementById('alert-container');
const showAlertButton = document.getElementById('show-alert-button');
const closeButton = document.querySelector('.close-button');
const acknowledgeButton = document.querySelector('.alert-button');

function showAlert() {
    alertContainer.classList.add('show');
    alertContainer.setAttribute('aria-hidden', 'false');
    alertContainer.style.zIndex ="1500";
    showAlertButton.style.display = 'none';
}

function hideAlert() {
    alertContainer.classList.remove('show');
    alertContainer.setAttribute('aria-hidden', 'true');
    showAlertButton.style.display = 'block';
}


closeButton.addEventListener('click', hideAlert);
acknowledgeButton.addEventListener('click', hideAlert);


