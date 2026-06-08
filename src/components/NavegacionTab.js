import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavegacionStackHome from './NavegacionStackHome'
import CrearPosteo from '../screens/CrearPosteo'
import MiPerfil from '../screens/MiPerfil'

const Tab = createBottomTabNavigator();

function NavegacionTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={NavegacionStackHome} />
            <Tab.Screen name="Mi Perfil" component={MiPerfil} />
            <Tab.Screen name="Crear Posteo" component={CrearPosteo} />
        </Tab.Navigator>
    );
}

export default NavegacionTab;





