import './Categorycard.css'
function Categorycard({image,title,description,onExplore}){
    return(
        <div>
            <div className="category-card">
                <img src={image} alt={title}></img>
                <h3>{title}</h3>
                <p>{description}</p>
                <button onClick={onExplore}>Explore</button>
            </div>
        </div>
    )
}
export default Categorycard;