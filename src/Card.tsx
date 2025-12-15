import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getCounts } from "./utils/getCounts";
import { PulseLoader } from "react-spinners";
import { updateDataByTitle } from "./firebase";
import { queryClient } from "./utils/queryClient";

export interface CardProps {
  title: string;
  image: string;
  counter?: number;
}

const QUERY_KEY = "counts";

export default function Card(props: CardProps) {
  const { title, image } = props;

  const buttonStyles = {
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.2s",
    height: "32px",
    width: "32px",
    borderRadius: "8px",
  };

  const removeButtonColor = "#e2e8f0";
  const addButtonColor = "#1e293b";

  const { data, isFetching, error, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getCounts,
  });

  const item = data?.find((item) => item.title == title);
  const counter = item?.count ?? 0;
  const timestamp = item?.lastTimestamp ?? new Date();
  const daysSince = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24));

  const updateData = (value: number) => {
    updateDataByTitle(title, value).then(() => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      refetch();
    });
  };

  if (isError) console.log(error);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <img src={image} alt="Osmow's" style={{ height: "100%", width: "70px", borderRadius: "8px" }} />
        <div>
          <h2>{title}</h2>
          {isError && <p>Error occurred while loading data.</p>}
          {data && !isFetching && (
            <p>
              Count: {counter} • Days since: {daysSince}
            </p>
          )}
          {isFetching && (
            <div style={{ marginTop: "10px" }}>
              <PulseLoader color={"rgba(54, 196, 215, 1)"} speedMultiplier={0.75} />
            </div>
          )}
        </div>
      </div>

      {data && !isFetching && (
        <div style={{ display: "flex", gap: "8px", flexDirection: "column", alignItems: "center" }}>
          <button
            style={{ ...buttonStyles, backgroundColor: addButtonColor }}
            onClick={() => {
              updateData(1);
            }}
          >
            <FontAwesomeIcon icon={faPlus} color="white" />
          </button>
          <button
            style={{ ...buttonStyles, backgroundColor: removeButtonColor }}
            disabled={counter <= 0}
            onClick={() => {
              updateData(-1);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
      )}
    </div>
  );
}
