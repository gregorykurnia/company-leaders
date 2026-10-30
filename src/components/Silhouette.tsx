/** Head-and-shoulders placeholder, drawn inside a `relative overflow-hidden` frame. */
export function Silhouette({ color }: { color: string }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute left-[32%] top-[24%] aspect-square w-[36%] rounded-full"
        style={{ background: color }}
      />
      <span
        aria-hidden
        className="absolute -bottom-[8%] left-[10%] h-1/2 w-4/5 rounded-t-[50%]"
        style={{ background: color }}
      />
    </>
  );
}
