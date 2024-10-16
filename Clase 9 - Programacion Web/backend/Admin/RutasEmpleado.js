const express = require('express');
const router = express.Router();
const Empleado = require("../clases/Empleado"); 

const {empleados } = require("../data"); 

router.get('/', (req, res) => {
    res.json(empleados);
})

router.post('/upload', (req, res) => {
    const nuevosEmpleados = req.body; 
    if(!Array.isArray(nuevosEmpleados)){
        return res.status(400).json({error: "Los datos enviados no son validos."})
    }

    const empleadosAAgregar = []; 

    nuevosEmpleados.forEach(emp => {
        if(!emp.codigo || !emp.nombre || !emp.contraseña || !emp.edad){
            console.log("El empleado con el codigo" , emp.codigo , "no tiene todos los datos requeridos")
            return; 
        }

        //Some devuelve verdadero si enceuntra el valor
        const codigoExite = empleados.some(e => e.codigo === emp.codigo ); 

        if(codigoExite){
            console.log("El codigo ya existe: ", emp.codigo)
            return; 
        }

        const nuevosEmpleado = new Empleado(emp.codigo, emp.nombre , emp.contraseña, emp.edad);
        empleadosAAgregar.push(nuevosEmpleado); 

    })

    if(empleadosAAgregar.length === 0){
        return res.json({mensaje: "No se añadio ningun empleado.", empleados: []})
    }


    empleados.push(...empleadosAAgregar);

    res.json({
        mensaje: "Empleados añadidos con exito",
        empleados: empleadosAAgregar
    })
})

router.put('/actualizar', (req, res) => {
    const {codigo, nombre, contraseña, edad} = req.body; 
    const empleadIndex = empleados.findIndex(emp => emp.codigo === codigo)

    if(empleadIndex ==! -1){
        empleados[empleadIndex] = {
            ...empleados[empleadIndex],
            nombre,
            contraseña,
            edad
        };
        res.status(200).json({ mensaje: 'Empleado actualizado correctamente', empleado: empleados[empleadIndex] });
    }else{
        res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
 
})


router.delete('/eliminar', (req, res) => {
    const codigo = req.body.codigo; 
    
    const empleadoIndex = empleados.findIndex(emp => emp.codigo === codigo);

    if (empleadoIndex !== -1) {
        // Eliminar al empleado de la lista
        const empleadoEliminado = empleados.splice(empleadoIndex, 1); // splice devuelve el empleado eliminado en un array
        res.status(200).json({ mensaje: 'Empleado eliminado correctamente', empleado: empleadoEliminado[0] });
    } else {
        res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
 
})


module.exports = router; 
