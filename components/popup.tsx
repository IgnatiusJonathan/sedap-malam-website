"use client";

import { useRouter } from "next/navigation";

export default function PopUp({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>Better to be a member</h2>

        <p>Log-in sebagai member agar anda dapat mendapatkan poin!</p>

        <button onClick={() => router.push("/login")}>
          Login
        </button>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}