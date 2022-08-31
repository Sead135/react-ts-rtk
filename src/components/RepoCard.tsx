import React, { MouseEvent, useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../models/models";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.some(f => f.html_url === repo.html_url));

  const addToFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo);
    setIsFav(true)
  };

  const removeFromFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false)
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="font-bold text-lg">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="font-thin text-sm">{repo?.description}</p>

        {!isFav && (
          <button
            className="py-2 px-4 bg-yellow-400 mr-4 rounded hover:shadow-md transition-all"
            onClick={addToFavourite}
          >
            Добавить
          </button>
        )}

        {isFav && (
          <button
            className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
            onClick={removeFromFavourite}
          >
            Удалить
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
