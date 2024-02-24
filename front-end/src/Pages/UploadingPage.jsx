import { useState } from "react";

//function addStep(){
    //will include addPhoto() and addText()
//}
function addPhoto(){
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    function handleClick(){
        setSelectedPhoto(null);
    }
    function handleChange(event){
        console.log(event.target.files[0]);
        setSelectedImage(event.target.files[0]);
    }
    return (
        <>
            <div>
                <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
                 />
                 <br />
                <button onClick={handleClick} >Remove</button>
            </div>
            <br />
            <br />
            <input
                type="file"
                name="myImage"
                onChange={handleChange}
            />
        </>
    );
}