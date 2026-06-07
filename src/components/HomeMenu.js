import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false, tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} />

            <Tab.Screen // chequear que de esta tab en adelante las llamen con el nombre que las puse aca (todavia no fueron creadas)
                name='Profile'
                component={Profile}
                options={{ headerShown: false, tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }} />

            <Tab.Screen
                name='Usuarios'
                component={Usuarios}
                options={{ headerShown: false, tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }} />

            <Tab.Screen
                name='NuevoPost'
                component={NuevoPost}
                options={{ headerShown: false, tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" /> }} />
        </Tab.Navigator>
    );
}

export default HomeMenu;


