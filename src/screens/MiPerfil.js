import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Posts';

function MiPerfil(props) {

    const [usuario, setUsuario] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let userFound = {};
                docs.forEach(doc => {
                    userFound = doc.data();
                });
                setUsuario(userFound)
            })
    }, []);

    useEffect(() => {
        db.collection('posts').where('email', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                 setPosts(posts)
            })
    }, []);

    function Logout() {
    auth.signOut()
    props.navigation.navigate('Login');
}

return (
    <View style={styles.container}>
        <Text style={styles.titulo}>
            Mi Perfil
        </Text>

        <Text>
            Usuario: {usuario.username}
        </Text>

        <Text>
            Email: {auth.currentUser.email}
        </Text>

        <Text>
            Mis posteos
        </Text>

        {
            posts.length > 0 ? (<FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Post  id={item.id} data={item.data}/>
                )} />) : (<Text>No tenés posteos</Text>)
        }




        <Pressable style={styles.boton} onPress={() => Logout()}>
            <Text>Desloguearse</Text>
        </Pressable>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 20,
        marginBottom: 15,
    },

    boton: {
        backgroundColor: '#fda84d',
        borderRadius: 10,
    },
});

export default MiPerfil;