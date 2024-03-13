import { useNavigate } from "react-router-dom";
function RecipePreviewBox_userPage(props) {
  let navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/view-recipe/${props.id}`);
  };

  return (
    <div>
        <div
          className="border border-b rounded-md m-3 shadow-md hover:shadow-lg bg-slate-50 transition-transform duration-300 transform hover:scale-105 flex flex-col justify-between"
          style={{width: '275px', height: '275px', overflow: 'hidden', zIndex: 1000}}
          onClick={onClickHandler}
        >
          <img
            className="w-full object-cover"
            style={{height: '205px'}} // Adjust the height to allocate space for text
            src={props.image !== "null" ? props.image :  "/allfoodimg.jpg"}
            alt={props.title}
          />
          <div className="text-center  text-md md:text-lg p-1 overflow-hidden"
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}
          >
            {props.title}
          </div>
          <div className="text-center text-sm md:text-md p-1" style={{minHeight: '8px'}}>
            
          </div>
        </div>
    </div>
      );
    }

export default RecipePreviewBox_userPage;
