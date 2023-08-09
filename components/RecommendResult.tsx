// components/RecommendResult.tsx
import React from 'react';
interface RecommendResultProps {
  results: any[]; // 결과 배열
}

const RecommendResult: React.FC<RecommendResultProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div>No results available.</div>;
  }

  return (
    <div>
      <h1>Recommendation Results</h1>
      <div className='flex w-full h-500px' style={{width:"100%"}}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black' }}>Restaurant Name</th>
              <th style={{ border: '1px solid black' }}>Address</th>
              <th style={{ border: '1px solid black' }}>Cuisine</th>
              <th style={{ border: '1px solid black' }}>Taste</th>
              <th style={{ border: '1px solid black' }}>Service</th>
              <th style={{ border: '1px solid black' }}>Ambiance</th>
              <th style={{ border: '1px solid black' }}>Kindness</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.사업장명}>
                <td style={{ border: '1px solid black' }}>{result.사업장명}</td>
                <td style={{ border: '1px solid black' }}>{result.소재지전체주소}</td>
                <td style={{ border: '1px solid black' }}>{result.업태구분명}</td>
                <td style={{ border: '1px solid black' }}>{result.맛}</td>
                <td style={{ border: '1px solid black' }}>{result.서비스}</td>
                <td style={{ border: '1px solid black' }}>{result.분위기}</td>
                <td style={{ border: '1px solid black' }}>{result.친절도}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    </div>
  );
};

export default RecommendResult;
