import firebase from '@/config/firebase'

let usersServices = {
    getCurrentUserDetails: () => {
        let uid = ''
        return new Promise((resolve, reject) => {
            uid = firebase.auth.currentUser.uid

            firebase.firestore.collection('team').where("uid", "==", uid).get().then(docs => {
                docs.forEach(doc => {
                    resolve({
                        success: true,
                        data: doc.data(),
                        uid: uid
                    })
                })
            }).catch(e => {
                reject({
                    success: false,
                    msg: e
                })
            })
        })
    },

    getUserRole: () => {
        let uid = ''
        return new Promise((resolve, reject) => {
            uid = firebase.auth.currentUser.uid

            firebase.firestore.collection('users').doc(uid).get().then(docs => {
                // console.log(docs)
                resolve({
                    success: true,
                    data: docs.data(),
                    exists: docs.exists
                })
            }).catch(e => {
                reject({
                    success: false,
                    msg: e
                })
                // console.log(e)
            })
        })
    },
};
export default usersServices;