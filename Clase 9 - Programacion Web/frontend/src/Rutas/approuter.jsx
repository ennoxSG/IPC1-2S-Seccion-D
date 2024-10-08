import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../Pages/login'
import Empleado from '../Pages/Admin/Empleados';
import Gerente from '../Pages/Admin/Gerentes';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/admin/empleado" element={<Empleado/>} />
                <Route path="/admin/gerente" element={<Gerente/>} />
            </Routes>
        </BrowserRouter>
    );
};