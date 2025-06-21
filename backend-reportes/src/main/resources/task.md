Modificar agregar localizacion contenedores
Agregar funcion de actualizar ubicaciones
Agregar imagenes 


Modificar logica de reportes
Mapa que solo recupere contenedores 
Reporte que recupera las clasificaciones en base a join
    SELECT  
    cl.nombre  AS clasificacion
    FROM
    contenedores c
    JOIN
    localizacion_contenedores cc ON c.id = cc.contenedor_id
    JOIN
    clasificaciones cl ON cc.clasificacion_id = cl.id
    WHERE c.nombre = 'Contenedor A';