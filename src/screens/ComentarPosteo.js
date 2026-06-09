import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';

function ComentarPosteo(props) {

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');


    console.log(props); //sacar esto dsp. SOLO ME FUNCIONA PONIENOD PROPS.ROUTE.PARAMS.ID


    useEffect(() => {
        db.collection('posts').where('id', '==', props.route.params.id).onSnapshot( //utilizo metodo where porque Permite recuperar documentos que cumplan una condición determinada
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosts(posts);
                setLoading(false);
            });

        //creo otro db.collection porque estoy buscanod info en otra coleccion (la de comments)
        db.collection('comments').where('postId', '==', props.route.params.id).onSnapshot(
            docs => {
                let comments = [];
                docs.forEach(doc => {
                    comments.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setComments(comments);
            });
    }, []);

    function onSubmit() {
        db.collection('comments').add({
            owner: auth.currentUser.email,
            postId: props.route.params.id,
            commentPost: comment,
            createdAt: Date.now()
        })
            .then(() => {
                setComment('') //cuestion de estetica, utilizo esto para qwue despues de escribir el comentario y apretar el boton "comment" desaparezca lo que escribi
            })
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
                        <Text>{item.data.email}</Text>
                        <Text>{item.data.description}</Text>
                        <Text>Likes: {item.data.likes.length}</Text>

                        <TextInput
                            style={styles.input}
                            keyboardType='default'
                            placeholder='comment'
                            onChangeText={text => setComment(text)}
                            value={comment}
                        />

                        <Pressable onPress={() => onSubmit()}>
                            <Text>Comment</Text>
                        </Pressable>

                        <Text>Comentarios:</Text>

                        <FlatList
                            data={comments}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.comment}>
                                    <Text>{item.data.owner}</Text>
                                    <Text>{item.data.commentPost}</Text>
                                </View>
                            }
                        />

                    </View>}
            />
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 10
    },
    comment: {
        padding: 8,
    }
});

export default ComentarPosteo;