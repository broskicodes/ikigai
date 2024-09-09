export function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce animation-delay-200" />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce animation-delay-400" />
      </div>
    </div>
  );
}
