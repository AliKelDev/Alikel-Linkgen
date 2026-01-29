// Firebase configuration for LinkForge Kei
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9LCG_BKNvf00Bg9AdL0t1qS2ef2lCEuk",
    authDomain: "linkforge-kei.firebaseapp.com",
    projectId: "linkforge-kei",
    storageBucket: "linkforge-kei.firebasestorage.app",
    messagingSenderId: "511986102536",
    appId: "1:511986102536:web:b933c06ac7523d627dfcbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to get or create anonymous user ID
const getAnonymousUserId = () => {
    let userId = localStorage.getItem('kei_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('kei_user_id', userId);
    }
    return userId;
};

// Firestore operations for chat history
export const chatDB = {
    // Get user's conversation list
    async getConversationList() {
        const userId = getAnonymousUserId();
        try {
            const docRef = doc(db, 'conversations', userId, 'metadata', 'companyList');
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data().companies : [];
        } catch (error) {
            console.error('Error fetching conversation list:', error);
            return [];
        }
    },

    // Save user's conversation list
    async saveConversationList(companies) {
        const userId = getAnonymousUserId();
        try {
            const docRef = doc(db, 'conversations', userId, 'metadata', 'companyList');
            await setDoc(docRef, {
                companies,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving conversation list:', error);
        }
    },

    // Get messages for a specific company chat
    async getMessages(company) {
        const userId = getAnonymousUserId();
        const safeCompany = company.replace(/[\/\.#$\[\]]/g, '_');
        try {
            const docRef = doc(db, 'conversations', userId, 'chats', safeCompany);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data().messages : [];
        } catch (error) {
            console.error('Error fetching messages:', error);
            return [];
        }
    },

    // Save messages for a specific company chat
    async saveMessages(company, messages) {
        const userId = getAnonymousUserId();
        const safeCompany = company.replace(/[\/\.#$\[\]]/g, '_');
        try {
            const docRef = doc(db, 'conversations', userId, 'chats', safeCompany);
            await setDoc(docRef, {
                messages,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error saving messages:', error);
        }
    },

    // Delete a conversation
    async deleteConversation(company) {
        const userId = getAnonymousUserId();
        const safeCompany = company.replace(/[\/\.#$\[\]]/g, '_');
        try {
            const docRef = doc(db, 'conversations', userId, 'chats', safeCompany);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting conversation:', error);
        }
    }
};

export { db, getAnonymousUserId };
