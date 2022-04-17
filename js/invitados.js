function registarInvitado(event) {
    const URL = 'http://localhost:3000/invitados';
    

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