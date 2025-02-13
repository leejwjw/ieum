import HeaderComponent from "../../components/common/HeaderComponent";
import FooterComponent from "../../components/common/FooterComponent";
import BannerComponent from "../../components/common/BannerComponent";
import InterestComponent from "../../components/common/InterestComponent";
import MainUserComponent from "../../components/common/MainUserComponent";

const Main = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <BannerComponent />
        <InterestComponent />
      </main>
      <FooterComponent />
    </>
  );
};

export default Main;
