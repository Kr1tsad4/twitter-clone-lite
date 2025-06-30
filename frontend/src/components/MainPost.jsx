function MainPost({ user }) {
  const name = user?.name || "Guest";
  return (
    <div className="min-h-screen border-r-1 border-white w-[600px] ">
      <h1 className="text-red-500">Main</h1>
      <h1 className="text-red-500 p-5">User : {name}</h1>
    </div>
  );
}

export default MainPost;
