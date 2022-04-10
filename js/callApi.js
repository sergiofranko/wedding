$(document).ready(function() {   
    var url = 'http://localhost:3000/invitados';

     $('#tablaArticulos').DataTable({            
         "ajax":{
             "url": url,
             "dataSrc":""
         },
         "columns":[
             {"data":"id"},
             {"data":"nombre"},
             {"data":"apellido"},
             {"data":"confirmar"},
         ],
         "columnDefs":[]
     });
});