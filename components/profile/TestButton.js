// TestButton.js
import axios from "axios";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";

const API_URL = process.env.NEXT_PUBLIC_URL;

const TestButton = () => {
  const { data: session } = useSession();

  const handleTestButtonClick = async () => {
    try {
      const authToken = session.user.id;
      const nickName = session.user.name;

      const response = await axios.post(
        API_URL + "/click",
        { nickName: nickName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        if (response.data.message === "무제한 이용권") {
          alert("무제한 이용자");
        } else {
          alert("남은 클릭 횟수: " + response.data.remainingClicks); // 서버로부터 받은 remainingClicks 값을 출력
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("테스트 버튼 클릭 에러:", error.response.data);
      } else {
        console.error("API 호출 자체가 실패했습니다.");
      }
    }
  };

  return <Button onClick={handleTestButtonClick}>테스트버튼</Button>;
};

export default TestButton;
