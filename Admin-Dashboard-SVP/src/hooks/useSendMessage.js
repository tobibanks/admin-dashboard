// import { db } from "../firebase/config"
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
// import { useAuthContext } from "./useAuthContext"

export default function useSendMessage() {
  const [error, setError] = useState(null);
  //   const { user } = useAuthContext();
  const sendMessage = async (threadID, message, timeStamp) => {
    setError(null);
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

    try {
      await addDoc(collection(db, "messages", threadID, "messages"), {
        message: message,
        sender: adminInfo.id,
        sender_name: adminInfo.firstname,
        time_stamp: timeStamp,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, sendMessage };
}
