import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import CommentsIcon from "../../../assets/images/CommentIcon.svg";
import { StarIcon as StarFillIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  setCurrentSymbolComment,
  setCandleSelected,
  setFavoriteSymbol,
  setShowModalAddComments,
} from "../../../redux/home/home-action";

const SymbolsTable = () => {
  const dispatch = useDispatch();
  const { symbols, favorite, search } = useSelector((state) => state.home);

  const addToFavorite = (item) => {
    const fav = [...favorite];
    const index = fav.findIndex((o) => o.insCode === item.insCode);
    if (index != -1) {
      fav.splice(index, 1);
    } else {
      fav.push(item);
    }
    dispatch(setFavoriteSymbol(fav));
  };

  const showModalAddComment = (item) => {
    dispatch(setCurrentSymbolComment(item));
    dispatch(setShowModalAddComments(true));
  };

  const [symbolName, setSymbolName] = useState();

  return (
    <div>
      <Table>
        <thead className="">
          <tr className="text-sm ">
            <th className="rounded-tr-2.5x py-3 text-center">لیست نماد</th>
            <th className="py-3 text-center">تعداد</th>
            <th className="py-3 text-center">آخرین قیمت</th>
            <th className="py-3 text-center">قیمت پایانی</th>
            <th className="py-3 text-center">ارزش فعلی</th>
            <th className="rounded-tl-2.5x  py-3 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="tbody text-sm">
          {symbols.map((item) => {
            var regex = new RegExp(["w*" + search + "w*"]);
            if (search == "" || regex.test(item.symbol))
              return (
                <tr key={item.insCode}>
                  <td
                    onClick={(e) => {
                      dispatch(setCandleSelected(item.insCode));
                      setSymbolName(e.target.innerHTML);
                    }}
                    className="text-center"
                  >
                    {item.symbol}
                  </td>
                  <td className="text-center">{item.tradesCount}</td>
                  <td className="text-center">{item.finalTradePrice}</td>
                  <td className="text-center">{item.closePrice}</td>
                  <td className="text-center">{item.tradesVolume}</td>
                  <td className="text-center flex justify-center">
                    {favorite?.find((o) => o.insCode === item.insCode) ? (
                      <StarFillIcon
                        onClick={addToFavorite.bind(this, item)}
                        className="w-5"
                      />
                    ) : (
                      <StarIcon
                        onClick={addToFavorite.bind(this, item)}
                        className="w-5"
                      />
                    )}
                    <img
                      onClick={showModalAddComment.bind(this, item)}
                      className="w-4 mr-2"
                      src={CommentsIcon}
                    />
                  </td>
                </tr>
              );
            else return null;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default SymbolsTable;
