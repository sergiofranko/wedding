//const base = 'http://localhost:3000';
const base = 'https://isabelysergioboda.herokuapp.com';

let idBuscados = [];

const URL = `${base}/invitados`;

function registarInvitado(event) {
    
    let invitado = {
        nombre: event.nombre.value,
        apellido: event.apellido.value,
        confirmar: false
    };

    const headers = { 'Content-Type': 'application/json' };
    const payload = {
        method: 'POST',
        headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(invitado)
    }

    

    const HTMLResponse = document.querySelector('#app');
    const container = document.createElement("div");

    fetch(URL, payload)
        .then((response => response.json()))
        .then(invitados => console.log(invitados))
        .catch(error => console.error(error))
}

function fillGuestManagerTable(param) {
    limpiarTablaAsistencia();

    let endpoint;
    if (param != 'todos') {
        endpoint = URL + `/guestManager/${param}`;
    } else {
        endpoint = URL;
    }
    
    const headers = { 'Content-Type': 'application/json' };
    const init = {
        method: 'GET',
        headers,
        mode: 'cors',
        cache: 'default'
    }

    const tbody = document.querySelector('#body-result');

    let contador = 1;
    fetch(endpoint, init)
        .then(response => response.json())
        .then(invitados => {
            invitados.forEach(invitado => {
                let tr = document.createElement('tr');
                tr.setAttribute('id', 'row-result');
                let tdContador = document.createElement('td');
                let tdNombre = document.createElement('td');
                let tdApellido = document.createElement('td');
                let tdConfirmar = document.createElement('td');
                let tdButtonEliminar = document.createElement('td');
                let button = document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Eliminar');
                button.setAttribute('class', 'button-eliminar');
                button.setAttribute('onclick', `eliminarInvitado(${invitado.id}, '${invitado.nombre}', '${invitado.apellido}')`);


                tdContador.appendChild(
                    document.createTextNode(`${contador++}`)
                );
                tdNombre.appendChild(
                    document.createTextNode(`${invitado.nombre}`)
                );
                tdApellido.appendChild(
                    document.createTextNode(`${invitado.apellido}`)
                );
                let confirm = (invitado.confirmar) ? "Si" : "No";
                tdConfirmar.appendChild(
                    document.createTextNode(`${confirm}`)
                );
                tdButtonEliminar.appendChild(button);


                tr.appendChild(tdContador);
                tr.appendChild(tdNombre);
                tr.appendChild(tdApellido);
                tr.appendChild(tdConfirmar);
                tr.appendChild(tdButtonEliminar);

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error(error));
} 

function buscarInvitado(event) {
    const param = event.name.value;

    const headers = { 'Content-Type': 'application/json' };
    const init = {
        method: 'GET',
        headers,
        mode: 'cors',
        cache: 'default'
    }

    const tbody = document.querySelector('#body-result');

    fetch(`${URL}/${param}`, init)
        .then((response => response.json()))
        .then(invitados => {
            
            invitados.forEach(invitado => {
                if (!idBuscados.includes(invitado.id)) {
                    idBuscados.push(invitado.id);
                    let tr = document.createElement('tr');
                    tr.setAttribute('id', 'row-result');
                    let tdNombre = document.createElement('td');
                    tdNombre.appendChild(
                        document.createTextNode(`${invitado.nombre} ${invitado.apellido}`)
                    );
                    
                    tr.appendChild(tdNombre);

                    if (!invitado.confirmar) {
                        let tdButton = document.createElement('td');
                        let button = document.createElement('input');
                        button.setAttribute('type', 'button');
                        button.setAttribute('value', 'Sí');
                        button.setAttribute('onclick', `confirmarInvitado(${invitado.id}, '${invitado.nombre}', '${invitado.apellido}')`);
                        tdButton.appendChild(button);
                        tr.appendChild(tdButton);
                    } else {
                        let tdConfirmado = document.createElement('td');
                        tdConfirmado.appendChild(
                            document.createTextNode('Confirmado')
                        );
                        tr.appendChild(tdConfirmado);
                    }
                    tbody.appendChild(tr);
                }
            });

        })
        .catch(error => console.error(error));

}

function confirmarInvitado(id, nombre, apellido) {

    const invitado = {
        id,
        nombre,
        apellido,
        confirmar: true
    }

    const headers = { 'Content-Type': 'application/json' };
    const payload = {
        method: 'PUT',
        headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(invitado)
    }

    fetch(URL, payload)
        .then((response =>  response.json()))
        .then(response => {
            const mensaje = (response.invitado.confirmar) ? 
                "Gracias por aceptar, será un gusto tenerte con nosotros":
                "Error con tu confirmación, por favor intenta de nuevo más tarde"

            window.alert(mensaje);
            window.location.href = "./home.htm";
        })
        .catch(error => console.error(error))
}

function limpiarTablaAsistencia() {
    const tbody = document.querySelector('#body-result');
    const trs = tbody.childNodes;
    let control = trs.length-1;
    while(control > 0) {
        const tr = document.querySelector('#row-result');
        tbody.removeChild(tr);
        control--;
    };
    idBuscados = [];
}

function eliminarInvitado(id, nombre, apelido) {

    let endpoint = `${URL}/${id}`;
    
    const headers = { 'Content-Type': 'application/json' };
    const payload = {
        method: 'DELETE',
        headers,
        mode: 'cors',
        cache: 'default'
    }

    fetch(endpoint, payload)
        .then((response =>  response.json()))
        .then(response => {
            if (window.confirm(`¿'Desea eliminar a ${nombre} ${apelido} de la lista de invitados?`)) {
                window.alert(`${nombre} ${apelido} eliminiado exitosamente`);
                limpiarTablaAsistencia();
            } else {
                window.alert(`${nombre} ${apelido} no pudo ser eliminado`);
            }
        })
        .catch(error => console.error(error))
}