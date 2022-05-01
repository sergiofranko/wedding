document.querySelector('.btn-menu').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('show');
});

function limpiarTabla() {
    const tbody = document.querySelector('#body-result');
    const trs = tbody.childNodes;
    let control = trs.length-1;
    while(control > 0) {
        const tr = document.querySelector('#row-result');
        tbody.removeChild(tr);
        control--;
    };
    
}