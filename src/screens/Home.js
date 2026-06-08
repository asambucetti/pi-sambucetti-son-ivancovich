import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-web';
import { db } from '../firebase/config';

function Home(props) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        db.collection('posts').onSnapshot( //metodo onsnapshot logra que firebase entregue la info actulizada. coleccion de posts ya existe (fue creada en CrearPost)
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


    function onSubmit(props) {
        props.navigation.navigate('ComentarPosteo'); // futura screen donde usu podra agregar comentarios
    }


    return (
        <View>
            <Text>NOMBRE DE LA APP</Text>
            <FlatList
                data={posts} // esto esta llamando a la const de arriba y esta linkeado a la screen de posts asi muestra todos y es scrolleable
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>// todo lo que vaya despues del data va a depender como lo defina mi compañera en crearPosts/posts
                    <View>
                        <Text>Nombre del usuario: {item.data.name}</Text>
                        <Text>{item.data.img}</Text>
                        <Text>{item.data.descripcion}</Text>
                        <Text>{item.data.img}</Text>
                        <Text>{item.data.likes}</Text>

                        <Pressable onPress={() => onSubmit()}>
                            <Text>Comment</Text>
                        </Pressable>
                    </View>} // en este atributo(renderItem) renderizamos cada cosa que me pide la consigna, los datos los saco de la const posts donde, entrando a data, entro al objeto literal con todos sus atributos (email, nombre, descripcion)
            />
        </View >
    )
}

export default Home;