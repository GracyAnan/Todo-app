import { useLocation, useNavigate } from "react-router-dom";

function TodoDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const todoId = params.get("id");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #dfe9f3, #ffffff)"
      }}
    >
      <div
        style={{
          width: "450px",
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "25px"
          }}
        >
          Todo Details
        </h1>

        <div
          style={{
            background: "#eef2ff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px"
          }}
        >
          <p style={{ fontSize: "18px" }}>
            <strong>Todo ID:</strong> {todoId}
          </p>

          <p style={{ fontSize: "18px" }}>
            <strong>Status:</strong> Pending
          </p>

          <p style={{ fontSize: "18px" }}>
            <strong>Priority:</strong> Medium
          </p>

          <p style={{ fontSize: "18px" }}>
            <strong>Description:</strong> Complete this task
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Back to Todo List
        </button>
      </div>
    </div>
  );
}

export default TodoDetails;