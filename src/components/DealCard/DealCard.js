import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const DealCard = () => {
  const { lastDeals } = useSelector((state) => state.home);
  return (
    <>
      <div className="flex-1 bg-green-tbl rounded-tr-2.5x rounded-br-2.5x ">
        <div className="flex h-10 bg-green-h-tbl rounded-tr-2.5x items-center text-sm justify-between px-2 ">
          <div>تعداد</div>
          <div>حجم</div>
          <div>قیمت</div>
        </div>
        {lastDeals &&
          lastDeals.map((item) => {
            return (
              <div
                key={uuidv4()}
                className="flex justify-between px-2 text-sm h-10 border-t border-green-h-tbl items-center"
              >
                <div>{item.numberOfSupply}</div>
                <div>{item.supplyVolume}</div>
                <div>{item.supplyPrice}</div>
              </div>
            );
          })}
      </div>
      <div className="flex-1 bg-red-tbl red-h-tbl rounded-tl-2.5x rounded-bl-2.5x text-black">
        <div className="flex h-10 bg-red-h-tbl rounded-tl-2.5x items-center text-sm justify-between px-2">
          <div>تعداد</div>
          <div>حجم</div>
          <div>قیمت</div>
        </div>
        {lastDeals &&
          lastDeals?.map((item) => {
            return (
              <div
                key={uuidv4()}
                className="flex justify-between px-2 text-sm h-10 border-t border-red-h-tbl items-center"
              >
                <div>{item.numberOfDemand}</div>
                <div>{item.demandVolume}</div>
                <div>{item.demandPrice}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DealCard;
