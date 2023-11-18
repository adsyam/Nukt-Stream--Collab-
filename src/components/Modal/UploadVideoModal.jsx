import { useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useDBContext } from "../../context/DBContext";

const UploadVideoModal = ({ showModal, onClose }) => {
  if (!showModal) return;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [video, setVideo] = useState("");
  const videoRef = useRef(null);

  const { user } = useAuthContext();
  const { addVideo } = useDBContext();

  const handleUpload = (e) => {
    e.preventDefault();
    addVideo(user.uid, title, desc, tags, video);
    onClose();
  };

  return (
    <div
      className="fixed left-0 w-full h-[200vh] bg-black/50 z-[999999] overflow-y-hidden
        grid place-items-center backdrop-blur-[2px]"
    >
      <form
        className="bg-black w-[400px] md:w-[600px] h-[500px] shadow-sm shadow-white/40
        p-4 rounded-md flex flex-col gap-5"
      >
        <div className="flex justify-between items-center">
          <h2>Upload a video</h2>
          <button onClick={onClose}>close</button>
        </div>
        <div className="flex flex-col justify-start w-full">
          <label className="w-max">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="my first react video"
            className="text-black p-2"
          />
        </div>
        <div className="flex flex-col justify-start w-full">
          <label className="w-max">Description:</label>
          <textarea
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe your video"
            rows={5}
            className="resize-none text-black pl-2"
          />
        </div>
        <div className="flex flex-col justify-start w-full">
          <label className="w-max">Tags:</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="coding,react,javascript"
            className="text-black p-2"
          />
        </div>
        <div className="flex flex-col justify-start w-full">
          <input
            type="file"
            ref={videoRef}
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-max cursor-pointer"
          />
        </div>
        <button
          onClick={(e) => handleUpload(e)}
          className="w-max mx-auto px-5 py-1 bg-white/40 text-lg font-medium rounded-md"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadVideoModal;
