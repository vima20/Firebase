// Functions.js

export const convertFirebaseTimeStampToJS = firebaseTimeStamp => {
    // Convert Firebase timestamp to JavaScript date object
    const jsDate = firebaseTimeStamp.toDate();
    return jsDate;
  };
  