//this context is for firestore and storage database function calls
//the firestore database will store the user's text data
//the storage will store the user's file data e.g images, videos
import { createContext, useContext } from "react";
import { getDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, deleteObject } from "firebase/storage";
import { textDB, fileDB } from "../config/firebase";

const DBContext = createContext();

//this will be use for easy importing of DBContext
export const useDBContext = () => {
  return useContext(DBContext);
};

export const DBProvider = ({ children }) => {
  //function call for adding user data to database
  const addUser = async (userId, username) => {
    const userDocRef = doc(textDB, "Users", userId); //user document reference
    const docSnap = await getDoc(userDocRef); //snapshot of the user document in the database

    //this will check if there is already an existing user data
    //if there is no existing user data add an initial data values
    if (!docSnap.exists()) {
      return await setDoc(userDocRef, {
        id: userId,
        username: username || "",
        subscriptions: [],
        library: {
          movies: [],
          series: [],
          videos: [],
        },
        history: {
          movies: [],
          series: [],
          videos: [],
        },
        storeHistory: true, //so users can choose if they want to store their watch history or not
      });
    }
  };

  //function call for getting the user data in the database
  const getUserData = async (userId) => {
    const userDocRef = doc(textDB, "Users", userId); //user document reference

    //try catch block..
    try {
      //get the user document using the user document reference
      const doc = await getDoc(userDocRef);
      return doc.data(); //return the document data in json
    } catch (e) {
      //for debugging purposes i added an error message
      console.log("Error getting user doc: ", e);
    }
  };

  //this function will upload the either cover or profile image uploaded by the user in our storage database
  const addImage = (userId, type, imageUpload) => {
    //this line will create a reference to where the image will be uploaded
    //since storage database in firebase is like a folder base structure
    const imageRef = ref(
      fileDB,
      `${userId}/${type}/${imageUpload.name}` //e.g. userId/coverImage/filename.jpg
    );

    //reference of the folder where the image is stored
    const folderRef = ref(fileDB, `${userId}/${type}/`);

    //this function from storage database will upload the image
    //in the file location specified in the imageRef
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image uploaded");
    });

    //this line will just insure that the image folder is updated
    //and only one image file will be in the folder of cover and profile image
    listAll(folderRef).then((response) => {
      if (response.items.length > 0) {
        deleteObject(ref(fileDB, response.items[0]._location.path_));
      }
    });
  };

  //this function is for the subscription feature.
  //this will add the channel id that the user is subscribed at
  const addSubcription = async (userId, channelId) => {
    const userDocRef = doc(textDB, "Users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const subscriptions = userDocSnapshot.data().subscriptions;

    //this will check if the channel id is not yet in the array
    if (!subscriptions.includes(channelId)) {
      //insures that there are no empty array in the list
      let newSub = subscriptions.filter((item) => item != "");
      newSub.push(channelId); //add the channel id in the list

      //update the document in the database with the new lists of subscriptions
      updateDoc(userDocRef, {
        ...userDocSnapshot.data(),
        subscriptions: newSub,
      });
    }
  };

  //this function is for unsubscribing the profile or channel
  const removeSubscription = async (userId, channelId) => {
    const userDocRef = doc(textDB, "Users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const subscriptions = userDocSnapshot.data().subscriptions;

    //check if the channel id that user want to unsubscribe is in the list
    if (subscriptions.includes(channelId)) {
      //filter the old list with the channel id that user want to unsubscribe
      let newSub = subscriptions.filter((item) => item != channelId);

      //update the document in the database with the new lists of subscriptions
      updateDoc(userDocRef, {
        ...userDocSnapshot.data(),
        subscriptions: newSub,
      });
    }
  };

  //this is for toggling the history status
  //the function will update the value be true or false depending if user
  //wants to store the watch history or not
  const switchHistory = async (userId) => {
    const userDocRef = doc(textDB, "Users", userId); //user doc reference
    const userDocSnapshot = await getDoc(userDocRef); //snapshot of the document
    const storeHistory = userDocSnapshot.data().storeHistory;
    let newStatus;
    if (storeHistory) {
      newStatus = false;
    } else {
      newStatus = true;
    }

    updateDoc(userDocRef, {
      ...userDocSnapshot.data(),
      storeHistory: newStatus,
    });
  };

  //this function will be incharge of the adding of watch history or library contents in the database
  const addHistoryOrLibrary = async (userId, path, type, contentId) => {
    const userDocRef = doc(textDB, "Users", userId); //user doc reference
    const userDocSnapshot = await getDoc(userDocRef); //snapshot of the document
    //check if the type passed in the function is correct
    if (!userDocSnapshot.data()?.[path]?.[type]) {
      console.error(`Invalid type: ${type}`);
      return;
    }
    //add the new id to the path value using Set that will insure a unique set of ids in the array
    const updatedArray = [
      ...new Set([...userDocSnapshot.data()[path][type], contentId]),
    ];
    //pass the update array in the updateDoc function of firestore to add it in the database
    updateDoc(userDocRef, {
      ...userDocSnapshot.data(),
      [path]: { ...userDocSnapshot.data()[path], [type]: updatedArray },
    });
  };

  //this function will update the watch history or library base on the path
  //for the user that wants to delete a single value
  const updateHistoryOrLibrary = async (userId, path, type, newIds) => {
    const userDocRef = doc(textDB, "Users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    //pass the update array in the updateDoc function of firestore to add it in the database
    updateDoc(userDocRef, {
      ...userDocSnapshot.data(),
      [path]: { ...userDocSnapshot.data()[path], [type]: newIds },
    });
  };

  //this function will clear the watch history or library base on the path
  const clearHistoryOrLibrary = async (userId, path) => {
    const userDocRef = doc(textDB, "Users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    //reset the values of movies, series and videos
    updateDoc(userDocRef, {
      ...userDocSnapshot.data(),
      [path]: {
        movies: [],
        series: [],
        videos: [],
      },
    });
  };

  //------------ THIS IS NOT YET TESTED -----------------//
  //function to add video in the firebase storage
  const addVideo = async (userId, title, description, tags, video) => {
    //a video reference folder where the video will be uploaded
    const videoRef = ref(fileDB, `${userId}/videos/${v4() + video.name}`);

    //metadata that will be filled out by user when uploading the video
    const metadata = {
      customMetadata: {
        title: title,
        description: description,
        tags: tags,
      },
    };

    //upload the video in the videoRef with the metadata
    uploadBytes(videoRef, video, metadata).then(() => {
      alert("Upload successful!");
    });
  };

  return (
    <DBContext.Provider
      value={{
        addUser,
        getUserData,
        addImage,
        addSubcription,
        removeSubscription,
        switchHistory,
        addHistoryOrLibrary,
        updateHistoryOrLibrary,
        clearHistoryOrLibrary,
        addVideo,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};
