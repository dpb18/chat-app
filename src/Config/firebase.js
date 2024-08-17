
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyD51eeMFQrpYs2E9Y9DnBtS5aVKgXNjfeM",
  authDomain: "chat-app-gs-94a0f.firebaseapp.com",
  projectId: "chat-app-gs-94a0f",
  storageBucket: "chat-app-gs-94a0f.appspot.com",
  messagingSenderId: "814667624644",
  appId: "1:814667624644:web:f5f7ac1d84c22a2b721991"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);

const signup = async(username,email,password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey Moi Chat App use kori asu",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async()=>{
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
   
}

const resetPass = async (email) =>{
    if(!email){
        toast.error("Enter Your Email");
        return null;
    }
    try {
        const userRef = collection(db,'users');
        const q =query(userRef,where("email","==",email));
        const querySnap = await getDoc(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Sent");
        }
        else{
            toast.error("Email doesn't exists")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}

export {signup,login,logout,auth,db,resetPass}