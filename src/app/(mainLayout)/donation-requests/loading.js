import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" color="success" />
        <span className="text-xs text-muted">Loading...</span>
      </div>
    </div>
  );
}