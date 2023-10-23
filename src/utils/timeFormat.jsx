//custom time format function to format the date published of videos
export const timeFormat = (publishedAt) => {
  const dataContainer = new Date(publishedAt)
  const currentDate = new Date()
  const timeDifference = currentDate - dataContainer //difference in milliseconds
  const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000 //for conversion of milliseconds to day
  const MILLISECONDS_IN_A_WEEK = 7 * MILLISECONDS_IN_A_DAY //for conversion of milliseconds to week
  const MILLISECONDS_IN_A_MONTH = 30 * MILLISECONDS_IN_A_DAY //for conversion of milliseconds to month
  const MILLISECONDS_IN_A_YEAR = 365 * MILLISECONDS_IN_A_DAY //for conversion of milliseconds to year

  if (timeDifference < MILLISECONDS_IN_A_DAY) {
    return "Today" //if the video is publish within the day
  } else if (timeDifference < MILLISECONDS_IN_A_WEEK) {
    const daysAgo = Math.floor(timeDifference / MILLISECONDS_IN_A_DAY)
    //if the video is publish within a week
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`
  } else if (timeDifference < MILLISECONDS_IN_A_MONTH) {
    const weeksAgo = Math.floor(timeDifference / MILLISECONDS_IN_A_WEEK)
    //if the video is publish within a month
    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`
  } else if (timeDifference < MILLISECONDS_IN_A_YEAR) {
    const monthsAgo = Math.floor(timeDifference / MILLISECONDS_IN_A_MONTH)
    //if the video is publish within a year
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`
  } else {
    const yearsAgo = Math.floor(timeDifference / MILLISECONDS_IN_A_YEAR)
    //if the video is publish more than a year ago
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`
  }
}
