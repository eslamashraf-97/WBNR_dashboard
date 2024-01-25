import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { computed, ref } from "vue";
import { getAllCollections } from "../services/chat";
import { useStore } from "vuex";
import sound from "@/assets/notification.wav";

export default function useChat() {
  const chats = ref([]);
  const newMessage = ref("");
  const messages = ref([]);
  const activeChat = ref(null);
  const notificationSOund = new Audio(sound);
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
  const store = useStore();
  const notifications = computed(
    () => store.getters["notifications/getNotifications"]
  );

  const getCollectinos = async () => {
    const { data } = await getAllCollections();
    chats.value = data.data;
  };
  const getMessages = async () => {
    const q = query(collection(db, activeChat.value), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      messages.value = [];
      querySnapshot.forEach((doc) => {
        messages.value.push({ ...doc.data(), id: doc.id });
      });
    });
  };
  const getNotifications = () => {
    const q = query(collection(db, "notifications"));
    onSnapshot(q, (snapshot) => {
      notificationSOund.play();
      snapshot.docs.map((doc) => {
        store.dispatch("notifications/updateNotifications", {
          ...doc.data(),
          id: doc.id,
        });
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
    newMessage.value = "";
  };

  const setActiveChat = (id) => {
    // return console.log(id);
    activeChat.value = id;
  };
  const resetNotification = async (id) => {
    const notification = notifications.value.find(
      (notification) => notification.userId == id
    );

    if (notification) {
      const notificationRef = doc(db, "notifications", notification.id);
      updateDoc(notificationRef, {
        count: 0,
        time: serverTimestamp(),
      });
    }

    // console.log(notifications.value.find((notification) => notification.userId == id));
  };

  const getFirstChat = async () => {
    await getCollectinos();
    setActiveChat(chats.value[0]);
    getMessages();
  };
  getFirstChat();

  return {
    chats,
    newMessage,
    messages,
    getMessages,
    sendMessage,
    setActiveChat,
    getNotifications,
    resetNotification,
  };
}
