import { AnimatePresence, motion } from "framer-motion"
import YouTube from "react-youtube"

export default function TrailerModal({ key, trailerKey, isOpen, onClose }) {
  const closeModal = () => {
    onClose()
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const youtubeOpts = {
    height: "390",
    width: "640",
  }
  return (
    <AnimatePresence key={key}>
      {isOpen && (
        <motion.div
          className="fixed z-20 top-0 right-0 left-0 bottom-0 h-screen flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
        >
          <span role="button" onClick={closeModal} className="text-md border border-white px-2 rounded-md">
            Exit Trailer
          </span>
          <YouTube videoId={trailerKey} opts={youtubeOpts} className="border-2 rounded-md overflow-hidden" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
