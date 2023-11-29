// import {
//     collection,
//     addDoc,
//     doc,
//     updateDoc,
//     serverTimestamp,
//     orderBy,
//     query,
//     onSnapshot,
//     where,
//     or,
// } from "firebase/firestore";
// import { db } from '@/firebase'
import { ref } from 'vue'
import firebase from 'firebase/app';
import 'firebase/firestore';

// const db = firestore();
export default function useFirebase() {
    const allCollections = ref()
    async function getAllCollections() {
        const db = firebase.firestore();
        try {
            const collectionRefs = await db.listCollections();
            const collectionNames = collectionRefs.map((collectionRef) => {
                return { id: collectionRef.id };
            });
            allCollections.value = collectionNames;
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
        // firestore().listCollections()
        //     .then(snapshot=>{
        //         console.log('snapshot', snapshot)
        //         allCollections.value = snapshot
        //         // snapshot.forEach(snaps => {
        //         //     console.log(snaps["_queryOptions"].collectionId); // LIST OF ALL COLLECTIONS
        //         // })
        //     })
        //     .catch(error => console.error(error));
    }
    return{
        getAllCollections,
        allCollections
    }
}
