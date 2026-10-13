
import { LoaderCircle } from "lucide-react";
import "./Loading.css";

function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <LoaderCircle className="loading-spinner" size={42} />

      <p>{message}</p>
    </div>
  );
}

export default Loading;
