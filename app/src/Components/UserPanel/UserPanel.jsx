import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export const UserPanel = () => {
  const { userData, logout } = useContext(UserContext);

  return (
    <div style={{
      position: "absolute",
      top: "10px",
      right: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}>
      {userData && (
        <>
          <p style={{ margin: "0", color: "white" }}></p>
          <button 
            onClick={logout} 
            style={{
              padding: "8px 16px",
              background: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px"
            }}
          >
            Log ud
          </button>
        </>
      )}
    </div>
  );
};
