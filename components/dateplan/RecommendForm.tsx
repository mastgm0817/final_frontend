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
      style={{
        width: "15vh",
        backgroundColor: "#ffd4c9",
        border: "1px solid #e393b9",
        borderRadius: "15px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #e393b9",
          padding: "6px",
          fontSize: "15px",
        }}
      >
        <select name="food" value={formData.food} onChange={handleChange}>
          <option value="" disabled>
            음식 종류 선택
          </option>{" "}
          {/* 초기 선택 값 */}
          <option value="한식">한식</option>
          <option value="양식">양식</option>
          <option value="일식">일식</option>
          <option value="중식">중식</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div style={{ borderBottom: "1px solid #e393b9", padding: "6px" }}>
        <label>맛</label>
        {renderStars("taste", formData.taste)}
      </div>
      <div style={{ borderBottom: "1px solid #e393b9", padding: "6px" }}>
        <label>서비스</label>
        {renderStars("service", formData.service)}
      </div>
      <div style={{ borderBottom: "1px solid #e393b9", padding: "6px" }}>
        <label>분위기</label>
        {renderStars("ambiance", formData.ambiance)}
      </div>
      <div style={{ borderBottom: "1px solid #e393b9", padding: "6px" }}>
        <label>매장상태</label>
        {renderStars("storeCondition", formData.storeCondition)}
      </div>
      <div style={{ borderBottom: "1px solid #e393b9", padding: "6px" }}>
        <label>친절함</label>
        {renderStars("kindness", formData.kindness)}
      </div>
      <div style={{ borderBottom: "1px solid #e393b9", padding: "6px" }}>
        <label>양</label>
        {renderStars("quantity", formData.quantity)}
      </div>
      <div style={{ padding: "6px" }}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RecommendForm;
