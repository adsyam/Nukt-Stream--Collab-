export const durationFormatter = ({ duration }) => {
  //use a regular expression to extract hours, minutes, and seconds
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  if (match) {
    //extract hours, minutes, and seconds, and convert them to integers
    const hours = match[1] ? parseInt(match[1]) : 0
    const minutes = match[2] ? parseInt(match[2]) : 0
    const seconds = match[3] ? parseInt(match[3]) : 0

    //format hours, minutes, and seconds as two-digit integers
    const formattedHours = hours.toString().padStart(2, "0")
    const formattedMinutes = minutes.toString().padStart(2, "0")
    const formattedSeconds = seconds.toString().padStart(2, "0")

    //combine them into a formatted string
    const formattedDuration = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    return formattedDuration
  }
}
