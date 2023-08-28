// components/LineChartComponent.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';

interface Datum {
  dimension_value: string;
  metric_value: number;
}

interface LineChartProps {
  data: Datum[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
    const sortedData = data.sort((a, b) => a.dimension_value.localeCompare(b.dimension_value));
    const chartData = {
      labels: sortedData.map(d => d.dimension_value),
      datasets: [
        {
          label: 'Metric Value',
          data: sortedData.map(d => d.metric_value),
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChartComponent;
