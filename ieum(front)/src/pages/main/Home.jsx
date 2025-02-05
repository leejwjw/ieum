import KakaoLoginComponent from "../../components/user/KakaoLoginComponent";

const Home = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 sm:py-48 lg:py-16">
        <div className="grid place-items-center">
          <img src="/login_top.png" alt="" />
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="카카오 로그인 버튼" />
          </div>
          <p className="mt-10 text-lg font-medium text-pretty text-gray-500 mr-8 ml-8 sm:text-xl/8">
            당신의 이야기가 연결될 수 있도록 <br /> 언어의 경계를 넘는 대화를
            지원합니다.
          </p>
        </div>
        <div className="mt-12 flex items-center justify-center gap-x-6">
          <KakaoLoginComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
