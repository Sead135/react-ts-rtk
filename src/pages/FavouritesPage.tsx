import React from "react";
import { useAppSelector } from "../hooks/redux";

const FavouritePage = () => {
  const { favourites } = useAppSelector((state) => state.github);

  return (
    <div className="container mx-auto mt-6 px-8">
      {favourites.length === 0 ? (
        <p className="text-center">Список понравившихся репозиториев пуст</p>
      ) : (
        <ul className="list-none">
          {favourites.map((fav, i) => (
            <li className="mb-8" key={fav.id}>
              <a
                href={fav.html_url}
                target="_blank"
                rel="noreferrer"
                className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all"
              >
                {i + 1}) {fav.full_name}, forks: {fav.forks}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritePage;
