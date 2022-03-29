$(document).ready(function() {   
    var url = 'http://localhost:3000/api/articulos';

     $('#tablaArticulos').DataTable({            
         "ajax":{
             "url": url,
             "dataSrc":""
         },
         "columns":[
             {"data":"id"},
             {"data":"descripcion"},
             {"data":"precio"},
             {"data":"stock"},
         ],
         "columnDefs":[{
             "targets":[2],
             render(v){
                 return Number(v).toFixed(2)
             }
         }]
     });
});