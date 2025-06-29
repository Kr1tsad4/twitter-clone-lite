

export default function NavButton ({icon, context}) {



  return (
    <div className="text-white font-[500] text-[20px] flex  p-[10px] mr-[10px] w-fit hover:bg-gray-900 rounded-[70px] gap-[20px]">
      <span className="p-[4px]">{icon}</span>
      {context ? <span className="pr-[10px]">{context}</span> : <></>}
    </div>
  )
}