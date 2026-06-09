import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db, auth } from '../../firebase/config';
import { View, Text, Pressable} from 'react-native';


function Posts(props) {
    const [usuarioLike, setUsuarioLike] = useState(false);

    useEffect(() => {
        if (props.data.likes.includes(auth.currentUser.email)
        ) {
            setUsuarioLike(true)
        } else {
            setUsuarioLike(false)
        }

    }, [props.data.likes]);
    function like() {
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                console.log('Like Agregado')

            })
    }

    function dislike() {
        db.collection('posts')
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => {
                console.log('Like Eliminado')

            })
            .catch(error => console.log(error))
    }

    return (
        <View>
            <Text>Email: {props.data.email}</Text>
            <Text>Description: {props.data.description}</Text>

           {/*
                <Image
                    source={}
                    style={{
                        width: 150,
                        height: 150
                    }}
                /> */}

            <Text>Likes: {props.data.likes.length}</Text>
            


            {usuarioLike
                ?

                <Pressable onPress={dislike}>
                    <Text>Dislike</Text>
                </Pressable>

                :

                <Pressable onPress={like}>
                    <Text>Like</Text>
                </Pressable>
            }
        </View>
    )
}

export default Posts;