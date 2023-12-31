import React from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useSession } from "next-auth/react";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_URL;

interface RandomRecommendResultProps {
  results: any;
}

interface RandomRecommendItem {
  사업장명: string;
  소재지전체주소: string;
  업태구분명: string;
  맛: number;
  서비스: number;
  분위기: number;
  친절도: number;
}

const RandomRecommendResult: React.FC<RandomRecommendResultProps> = ({
  results,
}) => {
  const { data: session } = useSession();
  if (!results || !results.random || !Array.isArray(results.random)) {
    return (
      <div className="text-center text-gray-600 my-8">
        코스 추천 결과가 없습니다.
      </div>
    );
  }
  const handleBookmarkClick = async () => {
    if (!session || !session.user) {
      alert("Please login first.");
      return;
    }
    const nickName = session.user.name;
    const authToken = session.user.id;

    const filteredResults = results.random.map((item: RandomRecommendItem) => {
      const {
        사업장명,
        소재지전체주소,
        업태구분명,
        맛,
        서비스,
        분위기,
        친절도,
      } = item;
      return {
        사업장명,
        소재지전체주소,
        업태구분명,
        맛,
        서비스,
        분위기,
        친절도,
      };
    });

    // payload 생성
    const payload = {
      nickname: nickName,
      results: filteredResults,
    };

    try {
      const response = await axios.post(API_URL + "/randomWishlist", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        alert("Successfully saved");
      }
    } catch (error) {
      alert("An error occurred: ");
    }
  };

  return (
    <div className="random-result-container">
      <div className="text-center">
        {results.random.map((result: RandomRecommendItem, index: number) => (
          <div key={index} className="mt-4">
            <h2 className="text-xl font-semibold">{result.사업장명}</h2>
            <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden mt-2">
              <tbody>
                <tr>
                  <td>{result.소재지전체주소}</td>
                </tr>
                <tr>
                  <td>{result.업태구분명}</td>
                </tr>
                <tr>
                  <td>
                    맛: {result.맛}, 서비스: {result.서비스}, 분위기:{" "}
                    {result.분위기}, 친절도: {result.친절도}
                  </td>
                </tr>
              </tbody>
            </table>
            {index < results.random.length - 1 && (
              <hr className="my-4 border-gray-300" />
            )}
          </div>
        ))}
        <div className="mt-4">
          <BookmarkAddIcon onClick={handleBookmarkClick} />
        </div>
      </div>
    </div>
  );
};
export default RandomRecommendResult;
