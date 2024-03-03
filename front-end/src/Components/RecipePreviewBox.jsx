function RecipePreviewBox(props) {
  const onClickHandler = () => {
    // window.location.href = `/recipe/${props.id}`;
    console.log("redirect to the props has id: ", props.id);
  };
  return (
    <div
      className="border border-b rounded-md m-3 shadow-md hover:shadow-lg bg-slate-50 transition-transform duration-300 transform hover:scale-105"
      onClick={onClickHandler}
    >
      <img
        className="h-3/4 w-fill w-full object-cover "
        src={props.image}
        alt={props.title}
      />
      <div className="text-center line-clamp-2 text-md md:text-lg">
        {props.title}
      </div>
    </div>
  );
}

export default RecipePreviewBox;
