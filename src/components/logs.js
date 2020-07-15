import React from "react";
import "./styles/logs.css";

const Logs = ({ logs }) => {
  return (
    <div className="log-box">
      <h3>Logs:</h3>
      <div className="log-text">
        {logs.length > 0 ? (
          <ul>
            {logs.map((log) =>
              log.towards ? (
                <li>
                  {log.user}: {log.action} - {log.ship} - {log.towards}{" "}
                  {log.blocks && "- "}
                  {log.blocks}
                </li>
              ) : (
                <li>
                  {log.type} {log.ship}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No hay logs aún</p>
        )}
      </div>
    </div>
  );
};

export default Logs;
