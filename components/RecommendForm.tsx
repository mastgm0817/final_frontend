// components/RecommendForm.tsx
import React, { useState, useEffect } from 'react';

interface Position {
  latitude: number | null;
  longitude: number | null;
}
interface RecommendFormProps {
  position: Position;
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
  quantity:number;
}


const RecommendForm: React.FC<RecommendFormProps> = ({ position, onSubmit }) => {
  const [formData, setFormData] = useState<RecommendFormData>({
    user_latitude: '',
    user_longitude: '',
    food: '',
    storeCondition: 0,
    service: 0,
    ambiance: 0,
    taste: 0,
    kindness: 0,
    quantity:0
  });


  useEffect(() => {
    if (position.latitude && position.longitude) {
      setFormData({
        ...formData,
        user_latitude: position.latitude.toString(),
        user_longitude: position.longitude.toString(),
      });
    }
  }, [position]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'food' ? value : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Latitude:</label>
        <input type="number" name="latitude" value={formData.user_latitude} readOnly />
      </div>
      <div>
        <label>Longitude:</label>
        <input type="number" name="longitude" value={formData.user_longitude} readOnly />
      </div>
      <div>
        <label>Food:</label>
        <input type="text" name="food" value={formData.food} onChange={handleChange} />
      </div>
      <div>
        <label>Taste:</label>
        <input type="number" name="taste" value={formData.taste} onChange={handleChange} step={0.1} min={0} max={5} />
      </div>
      <div>
        <label>Service:</label>
        <input type="number" name="service" value={formData.service} onChange={handleChange} step={0.1} min={0} max={5} />
      </div>
      <div>
        <label>Ambiance:</label>
        <input type="number" name="ambiance" value={formData.ambiance} onChange={handleChange} step={0.1} min={0} max={5} />
      </div>
      <div>
        <label>StoreCondition:</label>
        <input type="number" name="storeCondition" value={formData.storeCondition} onChange={handleChange} step={0.1} min={0} max={5} />
      </div>
      <div>
        <label>Kindness:</label>
        <input type="number" name="kindness" value={formData.kindness} onChange={handleChange} step={0.1} min={0} max={5} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} step={0.1} min={0} max={5} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecommendForm;
