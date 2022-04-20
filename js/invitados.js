const URL = '/invitados';

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
        .catch(error => console.log(error))
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
                let tr = document.createElement('tr');
                tr.setAttribute('id', 'row-result');
                let tdNombre = document.createElement('td');
                tdNombre.appendChild(
                    document.createTextNode(`${invitado.nombre} ${invitado.apellido}`)
                );
                let tdButton = document.createElement('td');
                let button = document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Sí');
                button.setAttribute('onclick', `confirmarInvitado(${invitado.id}, '${invitado.nombre}', '${invitado.apellido}')`);
                tdButton.appendChild(button);
                tr.appendChild(tdNombre);
                tr.appendChild(tdButton);
                tbody.appendChild(tr);
            });

        })
        .catch(error => console.log(error));

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
        .then((response => response.json()))
        .then(invitados => console.log(invitados))
        .catch(error => console.log(error))
}