import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavegacionStackHome from './NavegacionStackHome';
import NuevoPost from '../screens/NuevoPost';
import MiPerfil from '../screens/MiPerfil';

const Tab = createBottomTabNavigator();

function NavegacionTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="NavegacionStackHome" component={NavegacionStackHome} />
            <Tab.Screen name="Mi Perfil" component={MiPerfil} />
            <Tab.Screen name="Crear Posteo" component={NuevoPost} />
        </Tab.Navigator>
    );
}

export default NavegacionTab;





