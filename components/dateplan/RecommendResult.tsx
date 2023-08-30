import React from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useSession } from "next-auth/react";
import axios from "axios";

interface RecommendResultProps {
  results: any[]; // 결과 배열
}
const API_URL = process.env.NEXT_PUBLIC_URL;

const RecommendResult: React.FC<RecommendResultProps> = ({ results }) => {
  const { data: session } = useSession();
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-600 my-8">
        코스 추천 결과가 없습니다
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

    const payload = {
      nickname: nickName, //
      results: results, //
    };

    try {
      const response = await axios.post(API_URL + "/wishlist", payload, {
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
    <div className="text-center">
      <div className="grid gap-6">
        {results.map((result, courseIndex) => (
          <div key={courseIndex} className="bg-white rounded-lg shadow-md p-4">
            {result.restaurant_prediction &&
            Array.isArray(result.restaurant_prediction) ? (
              result.restaurant_prediction.map(
                (restaurant: any, restaurantIndex: number) => (
                  <div key={restaurantIndex} className="mb-4">
                    <h2 className="text-lg font-semibold">
                      {restaurant.사업장명 || "-"}
                    </h2>
                    <p className="text-gray-500">
                      {restaurant.소재지전체주소 || "-"}
                    </p>
                    <p className="text-gray-500">
                      {restaurant.업태구분명 || "-"}
                    </p>
                    <div className="flex">
                      <p className="mr-4">맛{restaurant.맛 || "-"}</p>
                      <p className="mr-4">서비스{restaurant.서비스 || "-"}</p>
                      <p className="mr-4">분위기{restaurant.분위기 || "-"}</p>
                      <p>친절도{restaurant.친절도 || "-"}</p>
                    </div>
                    {restaurantIndex <
                      result.restaurant_prediction.length - 1 && (
                      <hr className="my-2 border-gray-300" /> // 구분선 추가
                    )}
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500">No results available</p>
            )}
            {/* 리스트의 마지막 요소일 때만 아이콘을 표시 */}
            {results.length - 1 === courseIndex && (
              <div className="mt-4">
                <BookmarkAddIcon onClick={handleBookmarkClick} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendResult;
