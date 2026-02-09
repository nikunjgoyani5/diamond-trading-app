import { useNavigate } from "react-router-dom";

export const useNavigateWithScroll = () => {
  const navigate = useNavigate();

  return (to: string | number) => {
    // Force scroll reset BEFORE navigation
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);

    if (typeof to === "number") {
      navigate(to);
    } else {
      navigate(to);
    }
  };
};
