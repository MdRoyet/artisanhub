export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "4px solid #e2e8f0",
            borderTopColor: "#D97706",
            borderRadius: "9999px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p
          style={{
            marginTop: 16,
            fontSize: 14,
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          Loading...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  );
}
