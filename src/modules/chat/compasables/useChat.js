import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from '@/firebase';
import { ref } from 'vue';
import { getAllCollections } from '../services/chat';

export default function useChat () {
  const chats = ref([]);
  const newMessage = ref('');
  const messages = ref([]);
  const activeChat = ref(null);
  const getCollectinos = async () => {
    const { data } = await getAllCollections();
    chats.value = data.data;
  };
  const getMessages = async () => {
    const q = query(collection(db, activeChat.value), orderBy("date",
      "asc"
    ));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      messages.value = [];
      querySnapshot.forEach((doc) => {
        messages.value.push({ ...doc.data(), id: doc.id });
      });
    });
  };

  const sendMessage = async () => {
    if (!newMessage.value) return;
    const docRef = await addDoc(collection(db, activeChat.value), {
      message: newMessage.value,
      date: serverTimestamp(),
      is_user_message: false,
    });
    newMessage.value = '';
  };

  const setActiveChat = (id) => {
    // return console.log(id);
    activeChat.value = id;
  };

  const getFirstChat = async () => {
    await getCollectinos();
    setActiveChat(chats.value[ 0 ]);
    getMessages();
  };
  getFirstChat();

  return {
    chats,
    newMessage,
    messages,
    getMessages,
    sendMessage,
    setActiveChat
  };
}
