import React from 'react'

const Topproduct = () => {
  return (
    <>
      <div className="mt-8 w-full  rounded-2xl bg-white p-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top Products</h2>
          <button className="text-sm text-gray-500">View all ▼</button>
        </div>
        <div className="max-h-[400px] overflow-y-scroll">
          <div className="flex items-center justify-between border-b py-3">
            <div className="flex items-center gap-3">
              <img
                src="/mans.png"
                alt="Product"
                className="h-10 w-10 rounded"
              />
              <div>
                <p className="text-sm font-medium">Patimax Fragrance Long...</p>
                <p className="text-xs text-gray-500">100 Items</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Coupon Code</p>
              <p className="text-sm font-medium">$flat</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-red-500">-15%</p>
              <p className="text-sm font-medium">$27.00</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-b py-3">
            <div className="flex items-center gap-3">
              <img
                src="/mans.png"
                alt="Product"
                className="h-10 w-10 rounded"
              />
              <div>
                <p className="text-sm font-medium">
                  Nulo MedalSeries Adult Cat...
                </p>
                <p className="text-xs text-gray-500">100 Items</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Coupon Code</p>
              <p className="text-sm font-medium">$flat</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-red-500">-15%</p>
              <p className="text-sm font-medium">$27.00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topproduct