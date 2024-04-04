import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { MovieCard } from "./components/common/MovieCard";
import { MOVIES } from "./components/mockdata/movies";
import { Text } from "./components/typography/Text";
import { Title } from "./components/typography/Title";
import { useTwiv } from "react/useTwiv";
import popcornImage from "./components/assets/popcorn.svg";

const totalWatchedMinutes = MOVIES.reduce((total, movie) => {
  if (movie.seen) {
    return total + movie.runtime;
  } else {
    return total;
  }
}, 0);

function App() {
  const [totalWatched, setTotalWatched] =
    React.useState<number>(totalWatchedMinutes);

  const watchedFlag = useMemo(() => {
    if (totalWatched < 299) {
      return "none";
    } else if (totalWatched > 300 && totalWatched < 999) {
      return "few";
    } else if (totalWatched > 1000 && totalWatched < 3999) {
      return "some";
    } else if (totalWatched > 4000) {
      return "many";
    }
  }, [totalWatched]);

  // useTwiv can be namespaced as well
  // in this case we derive the states from the watchedFlag
  const twivFromWatched = useTwiv([watchedFlag]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="pb-16">
        <Text>Welcome back,</Text>
        <Title size="large" className="pb-10">
          Moviefan McFanson
        </Title>

        <div
          className={twivFromWatched({
            BASE: `
              border
              border-solid
              p-2
              rounded-lg
              flex
              flex-col
              gap-5
              items-stretch
              overflow-hidden

              md:flex-row
            `,
            none: "bg-rose-300 border-rose-500 text-rose-950",
            few: "bg-violet-300 border-violet-500 text-violet-950",
            some: "bg-cyan-300 border-cyan-500 text-cyan-950",
            many: "bg-emerald-300 border-emerald-500 text-emerald-950",
          })}
        >
          <div className="flex flex-col items-center gap-5 p-4 relative md:flex-row">
            <img
              src={popcornImage}
              className="size-48  md:-translate-x-16 md:translate-y-0 -rotate-12 md:absolute"
            />

            <div className="max-w-md flex-col items-center text-center ml-0 md:ml-32 md:text-left">
              <Title size="x-large" variant="inherited">
                {totalWatched} minutes
              </Title>

              <Text size="large">
                is the amount of time you've spent watching movies from this
                ChatGPT-generated list.
              </Text>
            </div>
          </div>

          <div
            className={twivFromWatched({
              BASE: `
                rounded
                p-11
                mx-auto
                text-center
                flex
                items-center
                justify-center
                w-full

                md:mr-0
                md:max-w-xs
              `,
              none: "bg-rose-200",
              few: "bg-violet-200",
              some: "bg-cyan-200",
              many: "bg-emerald-200",
            })}
          >
            <Text size="small" className="max-w-4xs">
              {/* Here's a weird way to use Twiv, but it works since Twiv just returns a string */}
              {twivFromWatched({
                none: "You should really watch some! They are (probably) good.",
                few: "Not a big fan of  movies? The ones below are (probably) good!",
                some: "Not bad! But could be better.",
                many: "Is there any movie you haven't seen yet?",
              })}
            </Text>
          </div>
        </div>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {MOVIES.map((movie) => (
          <MovieCard
            key={movie.title}
            genre={movie.genre}
            title={movie.title}
            year={movie.year}
            runtime={movie.runtime}
            seen={movie.seen}
            onChangeSelection={(runtime) =>
              setTotalWatched(totalWatched + runtime)
            }
          />
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
