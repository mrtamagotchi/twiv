import React, { useEffect, useState } from "react";
import { useTwiv } from "react/useTwiv";
import { MovieItem } from "../mockdata/movies";
import actionSvg from "../assets/action.svg";
import thrillerSvg from "../assets/thriller.svg";
import dramaSvg from "../assets/drama.svg";
import comedySvg from "../assets/comedy.svg";

function getIconFromGenre(genre: MovieItem["genre"]) {
  switch (genre) {
    case "action":
      return actionSvg;
    case "thriller":
      return thrillerSvg;
    case "drama":
      return dramaSvg;
    case "comedy":
      return comedySvg;
  }
}

interface MovieCardProps extends MovieItem {
  onChangeSelection: (runtime: number) => void;
}

export function MovieCard({
  genre,
  title,
  year,
  seen,
  runtime,
  onChangeSelection,
}: MovieCardProps) {
  const [isSelected, setIsSelected] = useState(seen);

  function handleChange(state: boolean) {
    let time = runtime;

    if (!state) {
      time = time * -1;
    }

    onChangeSelection(time);
    setIsSelected(state);
  }

  const selectedState = isSelected ? "selected" : undefined;
  const twiv = useTwiv([genre, selectedState]);

  return (
    <li
      className={twiv({
        BASE: `
          border
          border-solid
          rounded-lg
          flex
          relative
          overflow-hidden
          px-4
          cursor-pointer
          select-none
          transition-all
          duration-300
          shadow-lg
          shadow-slate-900
        `,
        comedy: "border-yellow-500 bg-yellow-200 hover:bg-yellow-100",
        thriller: "border-cyan-500 bg-cyan-200 hover:bg-cyan-100",
        drama: "border-orange-500 bg-orange-200 hover:bg-orange-100",
        action: "border-violet-500 bg-violet-200 hover:bg-violet-100",
        selected:
          "border-emerald-500 bg-emerald-300 hover:bg-emerald-200 drop-shadow-sm",
      })}
      onClick={() => handleChange(!isSelected)}
    >
      <input type="checkbox" checked={isSelected} readOnly />

      <div className="p-4 relative z-1">
        <p
          className={twiv({
            BASE: "text-xl font-bold -mb-1 pr-8",
            comedy: "text-yellow-950",
            thriller: "text-cyan-950",
            drama: "text-orange-950",
            action: "text-violet-950",
            selected: "text-emerald-950",
          })}
        >
          {title}
        </p>

        <div
          className={twiv({
            BASE: "text-sm italic",
            comedy: "text-yellow-800",
            thriller: "text-cyan-800",
            drama: "text-orange-800",
            action: "text-violet-800",
            selected: "text-emerald-800",
          })}
        >
          <p className="capitalize">
            {genre}, {year}
          </p>
          <p>{runtime} min</p>
        </div>
      </div>

      <img
        src={getIconFromGenre(genre)}
        alt={genre}
        className={twiv({
          BASE: `
            size-24
            absolute
            top-1/2
            right-0
            transition-transform
            translate-x-5
            -translate-y-1/2
            opacity-75
          `,
          thriller: "rotate-12",
          drama: "rotate-12",
          selected: "scale-110",
        })}
      />
    </li>
  );
}
