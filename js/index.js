document.querySelector('.btn-menu').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('show');
});

function limpiarTabla() {
    const tbody = document.querySelector('#body-result');
    const trs = tbody.childNodes;
    trs.forEach((result, index) => {
        const tr = document.querySelector('#row-result');
        tbody.removeChild(tr);
    });
    
}