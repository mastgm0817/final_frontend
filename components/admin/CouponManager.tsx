"use client"
import React, { useState } from 'react';

const CouponManager: React.FC = () => {
  // 예시 데이터
  const exampleCouponData = {
    type: '할인',
    category: '음식',
    code: 'ABC123',
    owner: 'John Doe',
    createdDate: '2023-08-25',
    modifiedDate: '2023-08-25',
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Coupon Manager</h1>
      {/* Input Form */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">쿠폰 종류</label>
          <input
            type="text"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
            defaultValue={exampleCouponData.type}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">타입</label>
          <input
            type="text"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
            defaultValue={exampleCouponData.category}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">쿠폰번호</label>
          <input
            type="text"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
            defaultValue={exampleCouponData.code}
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">소유자</label>
          <input
            type="text"
            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-opacity-50"
            defaultValue={exampleCouponData.owner}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">생성/만료일</label>
          <div className="mt-1 p-2 w-full rounded-md border border-gray-300">
            <div>생성일: {exampleCouponData.createdDate}</div>
            <div>만료일: {exampleCouponData.modifiedDate}</div>
          </div>
        </div>
      </div>
      {/* Data Display */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-medium mb-2">쿠폰 정보</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 text-gray-600">쿠폰 종류</div>
          <div className="col-span-1 text-gray-600">타입</div>
          <div className="col-span-1 text-gray-600">쿠폰번호</div>
          <div className="col-span-1 text-gray-600">소유자</div>
          <div className="col-span-1 text-gray-600">생성/만료일</div>
          <div className="col-span-1">{exampleCouponData.type}</div>
          <div className="col-span-1">{exampleCouponData.category}</div>
          <div className="col-span-1">{exampleCouponData.code}</div>
          <div className="col-span-1">{exampleCouponData.owner}</div>
          <div className="col-span-1">
            <div>생성일: {exampleCouponData.createdDate}</div>
            <div>수정일: {exampleCouponData.modifiedDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponManager;
