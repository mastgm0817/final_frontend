import React, { useState } from "react";
import { handleUsageCheckButtonClick } from "../profile/UsageCheckButton";
import { useSession } from "next-auth/react";

interface RandomRecommendFormProps {
  onSubmit: (
    formData: RandomRecommendFormData,
    selected_region: string
  ) => void;
}

interface RandomRecommendFormData {
  selected_region: string;
}

const RandomRecommendForm: React.FC<RandomRecommendFormProps> = ({
  onSubmit,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const { data: session } = useSession();

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const handleRandomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const canProceed = await handleUsageCheckButtonClick(session);

    if (!canProceed) {
      alert("서비스를 이용할 수 없습니다.");
      return;
    }

    const formData: RandomRecommendFormData = {
      selected_region: selectedRegion,
    };

    onSubmit(formData, selectedRegion);
  };

  return (
    <form
      onSubmit={handleRandomSubmit}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          선택 지역
        </label>
        <select
          name="selected_region"
          value={selectedRegion}
          onChange={handleRegionChange}
          className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="" disabled>
            지역구 선택
          </option>
          <option value="송파구">송파구</option>
          <option value="용산구">용산구</option>
          <option value="동대문구">동대문구</option>
          <option value="강남구">강남구</option>
          <option value="마포구">마포구</option>
          <option value="금천구">금천구</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300"
      >
        랜덤 코스 추천
      </button>
    </form>
  );
};

export default RandomRecommendForm;
