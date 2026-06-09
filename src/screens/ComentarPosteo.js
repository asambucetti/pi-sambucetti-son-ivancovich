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
        <View style={styles.container}>
            <Text style={styles.logo}>Pawly</Text>
            <FlatList
                data={posts} // esto esta llamando a la const de arriba y esta linkeado a la screen de posts asi muestra todos y es scrolleable
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>// todo lo que vaya despues del data va a depender como lo defina mi compañera en crearPosts/posts
                    <View>
                        <Text style={styles.email}>{item.data.email}</Text>
                        <Text style={styles.descripcion}>{item.data.description}</Text>
                        <Text style={styles.likes}>Likes: {item.data.likes.length}</Text>

                        <TextInput
                            style={styles.input}
                            keyboardType='default'
                            placeholder='comment'
                            onChangeText={text => setComment(text)}
                            value={comment}
                        />

                        <Pressable onPress={() => onSubmit()}>
                            <Text style={StyleSheet.textoBoton}>Comment</Text>
                        </Pressable>

                        <Text style={styles.subtitulo}>Comentarios:</Text>

                        <FlatList
                            data={comments}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.commentCard}>
                                    <Text style={styles.commentOwner}>{item.data.owner}</Text>
                                    <Text style={styles.commentText}>{item.data.commentPost}</Text>
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
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E8DED5',
        marginBottom: 15
    },
    email: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 15,
        marginBottom: 8
    },
    descripcion: {
        color: '#444',
        fontSize: 16,
        marginBottom: 12
    },
    likes: {
        color: '#777',
        marginBottom: 15
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0D6CC',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12
    },
    boton: {
        backgroundColor: '#2F80ED',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10
    },
    commentCard: {
        backgroundColor: '#FFF7EF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E8DED5'
    },
    commentOwner: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4
    },
    commentText: {
        color: '#444'
    }
});
export default ComentarPosteo;