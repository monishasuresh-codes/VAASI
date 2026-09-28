import './Authorcard.css'

function Authorcard({authorimage,authorname,books}){
    return(
        <div className="author-card">
            <img src={authorimage} alt={authorname}/>
            <h3>{authorname}</h3>
            <p>{books}</p>
        </div>
    )
}
export default Authorcard;