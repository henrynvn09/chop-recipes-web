function RecipePreviewBox(props) {
  return (
    <div className="w-48 h-52 border border-b rounded-md m-3 shadow-md hover:shadow-lg bg-slate-50 transition-transform duration-300 transform hover:scale-105">
      <img
        className="h-3/4 w-fill w-full object-cover "
        src={props.image}
        alt={props.title}
      />
      <div className="text-xl text-center line-clamp-2">{props.title}</div>
    </div>
  );
}

export default RecipePreviewBox;
