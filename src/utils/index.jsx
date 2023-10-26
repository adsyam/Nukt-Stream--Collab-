//this file serves as a storage of all the fixed datas that will be used in our project
// ========= IMPORT ICONS ============
import {
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiOutlineHistory,
  AiOutlineSetting,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMoviePlay, BiDownload, BiHelpCircle } from "react-icons/bi";
import {
  MdOutlineVideoLibrary,
  MdPlaylistPlay,
  MdReportGmailerrorred,
} from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";

// ========= IMPORT LOGO ============
export const logo =
  "https://cdn3d.iconscout.com/3d/free/thumb/free-video-play-5658931-4715737.png";
export const bg_url =
  "https://wallpapers.com/images/hd/dark-gradient-6bly12umg2d4psr2.jpg";

// ========= CATEGORIES INSIDE THE FEED ============
export const feedCategories = [
  { name: "trailers" },
  { name: "short movie" },
  { name: "funny" },
  { name: "music" },
  { name: "react js" },
];

// ========= CATEGORIES IN THE HEADER ============
export const headerCategories = [
  { name: "New" },
  { name: "Trending" },
  { name: "HTML & CSS" },
  { name: "JavaScript" },
  { name: "ReactJS" },
  { name: "Music" },
  { name: "Education" },
  { name: "Podcast" },
  { name: "Gaming" },
  { name: "Sport" },
  { name: "Live" },
  { name: "Gym" },
  { name: "Fashion" },
  { name: "Beauty" },
  { name: "Comedy" },
  { name: "Crypto" },
];

// ========= SIDEBAR MENUS WITH ICONS ============
export const sidebarMenus1 = [
  { name: "home", icon: <AiOutlineHome />, url: "/home" },
  { name: "videos", icon: <AiOutlineVideoCamera />, url: "/search" },
  { name: "movies", icon: <BiMoviePlay />, url: "/search" },
  { name: "TV", icon: <BiMoviePlay />, url: "/search" },
  {
    name: "genre",
    icon: <BiMoviePlay />,
    lists: [
      { category: "trending", url: "/search" },
      { category: "music", url: "/search" },
      { category: "gaming", url: "/search" },
      { category: "sports", url: "/search" },
      { category: "entertainment", url: "/search" },
    ],
  },
  { name: "latest", icon: <AiOutlineVideoCamera />, url: "/search" },
  { name: "popular", icon: <BiMoviePlay />, url: "/search" },
  { name: "ongoing", icon: <BiMoviePlay />, url: "/search" },
  {
    name: "subscriptions",
    icon: <AiOutlineStar />,
    url: "/feed/subscriptions",
  },
  { name: "library", icon: <MdOutlineVideoLibrary />, url: "/" },
  { name: "history", icon: <AiOutlineHistory />, url: "/feed/history" },
  { name: "downloads", icon: <BiDownload />, url: "/" },
  { name: "playlist", icon: <MdPlaylistPlay />, url: "/" },
  { name: "settings", icon: <AiOutlineSetting />, url: "/" },
  { name: "report", icon: <MdReportGmailerrorred />, url: "/" },
  { name: "help", icon: <BiHelpCircle />, url: "/" },
  { name: "send feedback", icon: <VscFeedback />, url: "/" },
];

// ========= SEARCH PAGE CATEGORY ============
export const searchFilters = [
  { name: "movies" },
  { name: "tv series" },
  { name: "videos" },
];

// ========= PRICE PLAN ============
export const planPrices = [
  {
    id: "0",
    name: "basic",
    price: "free",
    benefits: [
      "limited access to content library",
      "standard video quality",
      "ad-supported viewing",
      "1 device at a time",
    ],
    checkoutUrl: "https://buy.stripe.com/test_aEU9DK5Us7o59UY5ko",
  },
  {
    id: "1",
    name: "standard",
    price: "499.50",
    benefits: [
      "expand content library",
      "HD video quality",
      "ad-free experience",
      "2 devices at a time",
      "Co-sharing",
    ],
    checkoutUrl: "https://buy.stripe.com/test_5kA3fm2IgdMt8QUeUX",
  },
  {
    id: "2",
    name: "premium",
    price: "749.80",
    benefits: [
      "full access to content library",
      "Ultra HD video quality",
      "ad-free experience",
      "4 device at a time",
      "Co-sharing",
      "erlier access to all content",
    ],
    checkoutUrl: "https://buy.stripe.com/test_4gweY4beMaAh9UY4gl",
  },
];

// ========= FAQs details ============
export const FAQsDetails = [
  {
    question: "what is Nukt?",
    answer:
      "Nukt is an online platform that enables users to access and enjoy a wide variety of digital content, including but not limited to movies, TV shows, music, live broadcasts, podcasts, and more.",
  },
  {
    question: "where can i watch?",
    answer:
      "Stream Anytime, Anywhere! Sign in to your Nukt account for instant access on the web or your favorite devices, from smart TVs to smartphones. Plus, download shows on iOS, Android, or Windows 10 to enjoy offline, even on the go. Nukt: Entertainment on your terms, wherever you are.",
  },
  {
    question: "what can i watch on Nukt?",
    answer:
      "Nukt boasts a vast library of feature films, TV shows, anime, video contents, and more. Enjoy unlimited viewing, your way, whenever you want.",
  },
  {
    question: "is Nukt good for kids?",
    answer:
      "Enjoy Nukt Kids with your membership, granting parents control while kids explore family-friendly TV shows, movies, and video content in a secure space. Kids' profiles feature PIN-protected parental controls to manage content maturity ratings and block specific titles, ensuring a safe viewing experience.",
  },
  {
    question: "how do i cancel?",
    answer:
      "Nukt is all about flexibility. With no binding contracts or obligations, you can effortlessly cancel your account online in just a few clicks, and there are no pesky cancellation fees. Start or stop your account whenever it suits you.",
  },
];

// ========= Profile Navigations ============
export const ProfileNavs = [
  { name: "home", url: "home" },
  { name: "contents", url: "contents" },
  { name: "playlist", url: "playlist" },
  { name: "downloads", url: "downloads" },
  { name: "about", url: "about" },
];

// ========= User Sidebar Menu ============
export const UserSidebarMenu = [
  { name: "my profile", url: "/home" },
  { name: "switch account", url: "/home" },
  { name: "sign out", url: "/home" },
  { name: "my plan benefits", url: "/home" },
  { name: "membership pricing", url: "/home" },
  { name: "my data history", url: "/home" },
  { name: "appearance", url: "/home" },
  { name: "language", url: "/home" },
  { name: "restricted mode", url: "/home" },
  { name: "location", url: "/home" },
  { name: "settings", url: "/home" },
  { name: "help", url: "/home" },
  { name: "send feedback", url: "/home" },
];

// ========= Footer links ============
export const FooterLinks1 = [
  { name: "about us" },
  { name: "contact us" },
  { name: "terms of service" },
];

export const FooterLinks2 = [
  { name: "pricing" },
  { name: "help center" },
  { name: "privacy policy" },
];

// ========= IMAGES ============
export const Images = [
  {
    title: "Jurasic World",
    url: "https://www.bollywoodhungama.com/wp-content/uploads/2018/06/Jurassic-World-Fallen-Kingdom-English.jpg",
  },
  {
    title: "The Pope's Exorcist",
    url: "https://ntvb.tmsimg.com/assets/p22981719_v_h8_ad.jpg?w=1280&h=720",
  },
  {
    title: "John Wick: Chapter 4",
    url: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/09/john-wick-4.jpg",
  },
];

export const demoThumbnailUrl = "https://i.ibb.co/G2L2Gwp/API-Course.png";
export const demoChannelUrl = "/channel/UCmXmlB4-HJytD7wek0Uo97A";
export const demoVideoUrl = "/video/pZyGYUMZAeg";
export const demoChannelTitle = "DemoChannelTV";
export const demoVideoTitle = "demo video title";
export const demoProfilePicture = "https://i.pravatar.cc/300";
