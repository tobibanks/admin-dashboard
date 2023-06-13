import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (c, _q) => {
  const [documents, setDocuments] = useState([]);
  const [loader, setLoader] = useState(true);
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setLoader(false);
      setDocuments(
        results.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    });

    return () => unsub();
  }, [c, q]);

  return { documents, loader, setDocuments };
};
