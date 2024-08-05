function Loader() {
  return (
    // the way we add blur is by adding a parent div for loader and make it blur and give it some opacity
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
