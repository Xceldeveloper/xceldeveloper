import AOS from "aos";
import "aos/dist/aos.css";
export default ({ app }) => {
  app.AOS = new AOS.init({  Offset: 400, Duration: 5000 }); // or any other options you need
};