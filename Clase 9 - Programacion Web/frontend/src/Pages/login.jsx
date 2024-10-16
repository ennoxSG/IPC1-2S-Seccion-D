import React, {useState} from 'react'; 
import './styles/login.css'
import { loginAuth } from '../server/autenticacion';
import Cookies from 'js-cookie'; 

import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate(); 
    const [carnet, setCarnet] = useState(""); 
    const [password, setPass] = useState(""); 
    const [rol, setRol] = useState('admin'); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const credenciales = {
            carnet, 
            password,
            rol
        }

        const response = await loginAuth(credenciales); 

        console.log(response)

        if(response.state){
            alert("Ingreso correcto")
            if(rol === "admin"){
                navigate('/admin/empleado'); 
            }else if (rol === "empleado"){
                Cookies.set("nombre", response.nombre)
                Cookies.set("codigo", response.code)
                navigate('/empleado/general'); 
            }else if (rol === "gerente"){
                Cookies.set("nombre", response.nombre)
                Cookies.set("codigo", response.code)
                navigate('/gerente/proyectos'); 
            }
        }else{
            alert("Datos incorrectos")
        }


    }



    return (
        <div className='login-body'>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}> {/* Formulario con manejador de envío */}
                    <div className="form-group"> {/* Contenedor para el grupo de entrada del carnet */}
                        <label>Carnet:</label>
                        <input
                            type="text" // Tipo de entrada: texto
                            value={carnet} // Valor del campo de entrada vinculado al estado 'carnet'
                            onChange={(e) => setCarnet(e.target.value)} // Actualiza el estado al cambiar
                            required // Este campo es obligatorio
                            placeholder='Ej: 202011535' //Muestra de fondo el input el texto
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password" // Tipo de entrada: contraseña (oculta)
                            value={password} // Valor del campo vinculado al estado 'password'
                            onChange={(e) => setPass(e.target.value)} // Actualiza el estado al cambiar
                            required // Este campo es obligatorio
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Rol:</label>
                        <select value={rol} onChange={(e) => setRol(e.target.value)} className="form-input"> {/* Selección del rol */}
                            <option value="admin">Admin</option> {/* Opción para Admin */}
                            <option value="gerente">Gerente</option> {/* Opción para Gerente */}
                            <option value="empleado">Empleado</option> {/* Opción para Empleado */}
                        </select>
                    </div>
                    <button type="submit" className="login-button">Ingresar</button> {/* Botón para enviar el formulario */}
                </form>
            </div>

        </div>
    ); 


}

export default Login; 