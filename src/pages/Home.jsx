import React, { useEffect, useState } from "react";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination.jsx";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortPropety: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortPropety.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortPropety.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://64ed91b91f872182714164d4.mockapi.io/app/photos/alif-test-junior?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const onClickCategory = (index) => {
    setCategoryId(index);
  };

  const pizzas = items.map((item) => <PizzaBlock {...item} key={item.id} />);
  const sceleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="p-[40px]">
      <div className="container">
        <div className="flex items-center justify-between">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
        </div>
        <h2 className="flex items-center text-[32px] font-bold pb-[25px]">
          Все пиццы
        </h2>
        <div className="flex flex-wrap gap-[20px]">
          {isLoading ? sceleton : pizzas}
        </div>
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
