import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Posts from '../components/Posts';

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
            <Text>Pawly</Text>
            <FlatList
                data={posts} // esto esta llamando a la const de arriba y esta linkeado a la screen de posts asi muestra todos y es scrolleable
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <Posts
                        id={item.id} 
                        data={item.data} 
                        navigation={props.navigation} //le paso la prop a post.js porque al ser un componente no la tiene, asi dsp me puede redirigir a la screen ComentarPosteo
                    />
                    
              } // en este atributo(renderItem) renderizamos cada cosa que me pide la consigna, los datos los saco de la const posts donde, entrando a data, entro al objeto literal con todos sus atributos (email, nombre, descripcion)
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20
    }
})

export default Home;


