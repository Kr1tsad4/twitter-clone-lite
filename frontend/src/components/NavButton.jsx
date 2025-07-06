export default function NavButton({ icon, context, hideContext }) {
  return (
    <div className="text-white font-[500] text-[20px] flex  p-[10px] mr-[10px] w-fit hover:bg-[rgb(10,10,10)] rounded-[70px] gap-[20px] cursor-default">
      <span className="p-[4px]">{icon}</span>
      {context && !hideContext ? (
        <span className="pr-[10px]">{context}</span>
      ) : (
        <></>
      )}
    </div>
  );
}
