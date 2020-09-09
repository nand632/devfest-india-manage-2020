import firebase from '@/config/firebase'

let attendeesServices = {
    getAllAttendees:()=>{
        let edata = []
        return new Promise((resolve,reject)=>{
            firebase.firestore
            .collection("edata")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    edata.push(doc.data());
                })
                resolve({
                    success:true,
                    data:edata
                })
            })
            .catch(err => {
                reject(err)
            });
        })
    },
};
export default attendeesServices;