// Firebase configuration for LinkForge Kei
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

// Firebase config from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Current user state (will be updated by auth state listener)
let currentUser = null;

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    currentUser = user;
});

// Auth functions
export const authFunctions = {
    // Sign in with Google
    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    },

    // Sign out
    async signOutUser() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    },

    // Get current user
    getCurrentUser() {
        return auth.currentUser;
    },

    // Subscribe to auth state changes
    onAuthStateChange(callback) {
        return onAuthStateChanged(auth, callback);
    }
};

// Helper to get user ID (authenticated or anonymous)
const getUserId = () => {
    // If user is signed in, use their UID
    if (auth.currentUser) {
        return auth.currentUser.uid;
    }
    // Fallback to anonymous ID
    let userId = localStorage.getItem('kei_user_id');
    if (!userId) {
        userId = 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('kei_user_id', userId);
    }
    return userId;
};

// Firestore operations for chat history
export const chatDB = {
    // Get user's conversation list
    async getConversationList() {
        const userId = getUserId();
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
        const userId = getUserId();
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
        const userId = getUserId();
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
        const userId = getUserId();
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
        const userId = getUserId();
        const safeCompany = company.replace(/[\/\.#$\[\]]/g, '_');
        try {
            const docRef = doc(db, 'conversations', userId, 'chats', safeCompany);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting conversation:', error);
        }
    },

    // Migrate anonymous data to authenticated user
    async migrateAnonymousData(anonymousId, authenticatedId) {
        // This could be implemented later to merge anonymous history with authenticated user
        console.log(`Migration from ${anonymousId} to ${authenticatedId} - not yet implemented`);
    }
};

export { db, auth, getUserId };
