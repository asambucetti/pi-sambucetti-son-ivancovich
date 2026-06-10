import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Posts';
import { FontAwesome } from '@expo/vector-icons';


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
            <Text style={styles.logo}>Pawly <FontAwesome name="paw" size={30} color="#F28C28" /></Text>


            <View style={styles.cardPerfil}>
                <Image
                    source={require('../../assets/perro.jpeg')}
                    style={styles.foto}
                />
                <View>
                    <Text style={styles.nombre}>{usuario.username} <FontAwesome name="paw" size={20} color="#F28C28" />
                    </Text>
                    <Text style={styles.email}><FontAwesome name="envelope" size={18} color="#F28C28" /> {auth.currentUser.email}</Text>
                </View>
            </View>

            <Text style={styles.subtitulo}>
                Mis posteos
            </Text>
            <View style={styles.listaContainer}>
                {
                    posts.length > 0 ? (<FlatList
                        style={styles.listaPosts}
                        data={posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Post id={item.id} data={item.data} />
                        )} />) : (<Text style={styles.noPosts}>No tenés posteos</Text>)
                }
            </View>





            <Pressable style={styles.botonLogout} onPress={() => Logout()}>
                <Text style={styles.textoLogout}>Desloguearse</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EF',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 8
    },
    listaContainer: {
        flex: 1,
        marginBottom: 8
    },
    listaPosts: {
        flex: 1
    },
    logo: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#F28C28',
        textAlign: 'center',
        marginBottom: 25
    },
    cardPerfil: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 20,
        shadowRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: '#E8DED5',
    },
    foto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#F28C28',
        marginRight: 15
    },
    nombre: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12
    },

    email: {
        fontSize: 15,
        color: '#777'
    },
    subtitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        paddingTop: 20
    },
    noPosts: {
        color: '#999',
        textAlign: 'center',
        marginTop: 30,
        fontSize: 15
    },
    botonLogout: {
        backgroundColor: '#F6A85A',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowRadius: 6,
        marginBottom: '20'
    },
    textoLogout: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        fontWeight: 'bold',
    }
});


export default MiPerfil;


