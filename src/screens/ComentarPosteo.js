import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FlatList, TextInput } from 'react-native-web';
import { db, auth } from '../firebase/config';


function ComentarPosteo(props) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');


    console.log(props);
    

    useEffect(() => {
        db.collection('posts').where('id', '==', props.id).onSnapshot( //utilizo metodo where porque Permite recuperar documentos que cumplan una condición determinada
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

    function onSubmit() {
        db.collection('comments').add({
            owner: auth.currentUser.email,
            commentPost: comment,
            createdAt: Date.now()
        })
            .then()
            .catch(error => console.log(error))
    };


    return (
        <View>
            <Text>Pawly</Text>
            <FlatList
                data={posts} // esto esta llamando a la const de arriba y esta linkeado a la screen de posts asi muestra todos y es scrolleable
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>// todo lo que vaya despues del data va a depender como lo defina mi compañera en crearPosts/posts
                    <View>
                        <Text>{item.data.name}</Text>
                        <Text>{item.data.descripcion}</Text>
                        <Text>{item.data.likes.length}</Text>

                        <TextInput
                            keyboardType='default'
                            placeholder='comment'
                            onChangeText={text => setComment(text)}
                            value={comment}
                        />

                        <Pressable onPress={() => onSubmit()}>
                            <Text>Comment</Text>
                        </Pressable>

                    </View>}
            />
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20
    }
})

export default ComentarPosteo;