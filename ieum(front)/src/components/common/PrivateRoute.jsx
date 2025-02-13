// PrivateRoute.js
import { Navigate } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const userInfo = getCookie("user");

  if (!userInfo) {
    alert("로그인 후 이용 하실 수 있습니다.");
    return <Navigate to="/home" replace />;
  }
  return children;
};

// PropTypes로 props 검증 추가
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // children은 React 노드여야 하며 필수로 설정
};

export default PrivateRoute;
