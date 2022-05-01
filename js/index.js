document.querySelector('.btn-menu').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('show');
});

function limpiarTabla() {
    const tbody = document.querySelector('#body-result');
    const trs = tbody.childNodes;
    tbody.remo
    trs.forEach((result, index) => {
        console.log(index);const tr = document.querySelector('#row-result');
        tbody.removeChild(tr);
    });
    
}