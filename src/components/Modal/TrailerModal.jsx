import { AnimatePresence, motion } from "framer-motion"
import YouTube from "react-youtube"

export default function TrailerModal({ key, trailerKey, isOpen, onClose }) {
  const closeModal = () => {
    onClose()
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, backdropFilter: "blur(2px)" },
  }

  const size = {
    height: "100%",
    width: "100%",
  }

  return (
    <AnimatePresence key={key}>
      {isOpen && (
        <motion.div
          className="fixed z-20 top-0 right-0 left-0 bottom-0 flex flex-col-reverse gap-2 items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
        >
          <span
            role="button"
            onClick={closeModal}
            className="text-md border-2 border-[#7300FF] px-2 rounded-md bg-gray-600/30 overflow-hidden"
          >
            EXIT
          </span>
          <YouTube
            videoId={trailerKey}
            opts={size}
            className="border-2 border-[#7300FF90] rounded-md overflow-hidden h-[56.25%] w-[70vw]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
