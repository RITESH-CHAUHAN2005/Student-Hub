import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./keys"; // already correct

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
