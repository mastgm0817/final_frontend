import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface RecommendFormProps {
  onSubmit: (formData: RecommendFormData) => void;
}
interface RecommendFormData {
  user_latitude: string;
  user_longitude: string;
  food: string;
  storeCondition: number;
  service: number;
  ambiance: number;
  taste: number;
  kindness: number;
  quantity: number;
}

const RecommendForm: React.FC<RecommendFormProps> = ({ onSubmit }) => {
  const position = useSelector((state: RootState) => state.position);

  const [formData, setFormData] = useState<RecommendFormData>({
    user_latitude: position.latitude?.toString() || "",
    user_longitude: position.longitude?.toString() || "",
    food: "",
    storeCondition: 0,
    service: 0,
    ambiance: 0,
    taste: 0,
    kindness: 0,
    quantity: 0,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user_latitude: position.latitude?.toString() || "",
      user_longitude: position.longitude?.toString() || "",
    }));
  }, [position]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "food" ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStars = (name: string, value: number) => (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          style={{ color: star <= value ? "gold" : "gray" }}
          onClick={() => setFormData((prev) => ({ ...prev, [name]: star }))}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-2 border-pink-400 rounded-md p-4"
      style={{
        width: "42vh",
        border: "3px solid #e393b9",
        borderRadius: "30px",
        textAlign: "center",
        marginTop: "12rem",
        marginLeft: "13rem",
      }}
    >
      <p className="text-center text-lg mb-4">
        선호하는 음식점 유형을 선택해주세요 !
      </p>
      <div className="mb-4">
        <label className="block">음식 종류</label>
        <select
          name="food"
          value={formData.food}
          onChange={handleChange}
          className="w-full border rounded-md p-1"
        >
          <option value="" disabled>
            음식 종류 선택
          </option>{" "}
          <option value="한식">한식</option>
          <option value="양식">양식</option>
          <option value="일식">일식</option>
          <option value="아시아음식">아시아</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block">맛</label>
        {renderStars("taste", formData.taste)}
      </div>
      <div className="mb-4">
        <label className="block">서비스</label>
        {renderStars("service", formData.service)}
      </div>
      <div className="mb-4">
        <label className="block">분위기</label>
        {renderStars("ambiance", formData.ambiance)}
      </div>
      <div className="mb-4">
        <label className="block">매장상태</label>
        {renderStars("storeCondition", formData.storeCondition)}
      </div>
      <div className="mb-4">
        <label className="block">친절함</label>
        {renderStars("kindness", formData.kindness)}
      </div>
      <div className="mb-4">
        <label className="block">양</label>
        {renderStars("quantity", formData.quantity)}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="px-2 py-2 bg-pink-500 text-white rounded-md"
        >
          코스 추천 받기
        </button>
      </div>
    </form>
  );
};

export default RecommendForm;
