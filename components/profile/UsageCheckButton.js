// TestButton.js
import axios from "axios";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";

const API_URL = process.env.NEXT_PUBLIC_URL;

export const handleUsageCheckButtonClick = async (session) => {
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
        return true;
      } else {
        if (response.data.remainingClicks > 0) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  } catch (error) {
    if (error.response) {
      console.error("테스트 버튼 클릭 에러:", error.response.data);
    } else {
      console.error("API 호출 자체가 실패했습니다.");
    }
  }
};

const UsageCheckButton = () => {
  const { data: session } = useSession();

  return (
    <Button onClick={() => handleUsageCheckButtonClick(session)}>
      테스트버튼
    </Button>
  );
};

export default UsageCheckButton;
