import { Slideshow } from "../Slideshow/Slideshow";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/reservation" && <Slideshow />}
    </>
  );
}
