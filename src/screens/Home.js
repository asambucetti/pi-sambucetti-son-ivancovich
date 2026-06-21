import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Posts from '../components/Posts';
import { FontAwesome } from '@expo/vector-icons';

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot( //metodo onsnapshot logra que firebase entregue la info actulizada. coleccion de posts ya existe (fue creada en CrearPost)
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    setPosts(posts)
                    setLoading(false)
                })
            }
        )
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Pawly <FontAwesome name="paw" size={30} color="#F28C28" /></Text>
            {(loading) ?
                (<View style={styles.container} >
                    <Text>Cargando...</Text>
                </View>)
                :
                (<View style={styles.container}>
                    <FlatList
                        data={posts} // esto esta llamando a la const de arriba y esta linkeado a la screen de posts asi muestra todos y es scrolleable
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <Posts
                                id={item.id}
                                data={item.data}
                                navigation={props.navigation} //le paso la prop a post.js porque al ser un componente no la tiene, asi dsp me puede redirigir a la screen ComentarPosteo
                            />

                        } 
                    />
                </View >)}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EF',
        paddingHorizontal: 15,
        paddingTop: 20
    },
    logo: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#F28C28',
        textAlign: 'center',
        marginBottom: 5
    }
});

export default Home;


