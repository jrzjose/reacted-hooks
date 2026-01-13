import { setDoc, doc, serverTimestamp, collection, getDocs, QuerySnapshot} from "firebase/firestore"
import { db } from "../lib/firebase.config"
import type { Media } from "./Types";

const Firestore = {
    readDocs: (...args:any) => {
        const [collection_name] = args
        let docs:Media[] = []
        const ref = collection(db, collection_name)
        return new Promise<Media[]>(async (resolve) => {
            try {
                const snapshots = await getDocs(ref);

                docs = snapshots.docs.map((doc:any) => ({
                    id: doc.id,
                    ...doc.data()
                })) as Media[];

                resolve(docs)
            } 
            catch(e) {
                console.log(e)
            }
        })
    },
    writeDoc: (...args:any) => {
        const [inputs, collection_name] = args
        return new Promise<string>(async resolve => {
            const randomIndex:number = Math.floor(Math.random() * 1000000000)
            try {
                const docRef = doc(db, collection_name, `${randomIndex}`);
                await setDoc(docRef , { title: inputs.title, path: inputs.path , createdAt: serverTimestamp(), user: inputs.user});
                resolve('new doc successfully inserted')
            } 
            catch(e) {
                resolve('could not insert new doc')
            }
        })
    }
}
export default Firestore