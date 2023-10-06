import { useEffect, useState } from "react";

import { apiClient } from "./common/utils/apiUtils";

const App = () => {
  const [connection, setConnection] = useState<boolean>(false);
  useEffect(() => {
    const ping = async () => {
      try {
        const response = await apiClient.get("/ping");
        response.data === "Pong" && setConnection(true);
      } catch (error) {
        console.error(error);
      }
    };
    ping();
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Meal Planner</h1>
      {connection && <span className="text-sm font-thin text-green-400">Connected to api</span>}
    </div>
  );
};

export default App;
