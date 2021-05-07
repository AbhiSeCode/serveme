import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import sweet from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getData, searchItem } from "../actions/menuActions";
import AlterMenu from "./AlterMenu";
import { BsCircleFill } from "react-icons/bs";

const EmployeeMenu = () => {
  const dispatch = useDispatch();
  const { data, items } = useSelector((state) => state.menu);
  const [editItem, setEditItem] = useState();
  const [modalState, setModalState] = useState(false);
  const [search, setSearch] = useState("");

  const selectingItem = (item) => {
    setEditItem(item);
    setModalState(true);
  };

  useEffect(() => {
    if (!modalState) {
        setEditItem('')
      getMenu();
    }
  }, [modalState]);

  const getMenu = () => {
    axios
      .get(`/menu/`)
      .then((res) => {
        dispatch(getData(res.data.sort((a, b) => (a.name > b.name ? 1 : -1))));
      })
      .catch((err) => {
        sweet.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong.",
        });
      });
  };

  useEffect(() => {
    dispatch(searchItem(search));
  }, [search]);

  useEffect(getMenu, []);

  if (data.length === 0 && items.length === 0) {
    return <LoadingModal />;
  } else {
    return (
      <>
        <button onClick={() => setModalState(true)} className="page-btn">
          Add Item
        </button>
        <div className="page-content">
          {modalState && (
            <AlterMenu item={editItem} modalState={setModalState} />
          )}
          <div className="menu-search">
            <input
              type="text"
              placeholder="Search Me "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className=" menu">
            {items.map((item) => (
              <div key={item._id} className="menu__item">
                <div
                  className={
                    item.category === "veg"
                      ? "menu_item-cat veg"
                      : "menu_item-cat"
                  }
                >
                  <BsCircleFill />
                </div>
                <div className="menu_item-image">
                  <img src={`/img/menu/${item.img}`} alt="Food" />
                </div>
                <label className="menu__item-label">{item.name}</label>
                <label className="menu__item-label">{item.price}₹</label>
                <button
                  onClick={() => selectingItem(item)}
                  className=" button__auth"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export { EmployeeMenu as default };
