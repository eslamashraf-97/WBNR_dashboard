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
// import { ref } from 'vue'

// export default function useFirebase() {
//     const allChats = ref()

//     const allChatQuery = collection(db, '19')
//     async function fetchAllChat () {
//         const chat = query(
//             allChatQuery,
//             where('')
//         )
//     }
//     return{
//         allChats,
//         fetchAllChat
//     }
// }
