import firebase from "firebase";
import { setCookieNotification } from "./Cookie";

const  firebaseConfig = {
    apiKey: "AIzaSyCyIC4ThphESsewSBdCfoPP21XdMlb2G3c",
    authDomain: "push-notification-8a11e.firebaseapp.com",
    projectId: "push-notification-8a11e",
    storageBucket: "push-notification-8a11e.appspot.com",
    messagingSenderId: "652126511609",
    appId: "1:652126511609:web:74ddb4f69f795bb4cc9d28",
    measurementId: "G-85534ZWSE9"
};

export const initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
}

export const ReceiveNotificationsToken = async () => {
    try {
    const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
        setCookieNotification("_noti", token);
      return token;
    } catch (error) {
        console.error(error);
    }
}

export const ReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        const noti = await messaging.onMessage();
        console.log(noti);
        return noti;
    } catch (error) {
        console.error(error);
    }
}
