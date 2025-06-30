export default function TrendItem ({topic, post_number}) {
  return (
    <div className="text-white flex flex-row items-center  p-[10px] hover:bg-gray-900 gap-[20px] cursor-default">
      <div>
        <div className="text-gray-400 font-[400] text-[12px]">กำลังได้รับความนิยม</div>
        <div className="text-white font-[700] text-[16px]">#{topic}</div>
        <div className="text-gray-400 font-[400] text-[12px]">{post_number} โพสต์</div>
      </div>
    </div>
  )
}