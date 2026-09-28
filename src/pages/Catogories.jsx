import Categorycard from "../components/Categorycard"
import fiction from '../assets/categories/fiction.jpg'
import fantasy from '../assets/categories/fantasy.jpg'
import romance from '../assets/categories/romance.jpg'
import mystery from '../assets/categories/mystry.jpg'
import scienceFiction from '../assets/categories/sciencefiction.jpg'
import history from '../assets/categories/history.jpg'
import selfGrowth from '../assets/categories/selfgrowth.jpg'
import technology from '../assets/categories/technology.jpg'
import { useNavigate } from "react-router-dom"

function Categories() {
    const categories = [
        {
            id: 1,
            image: fiction,
            title: "Fiction",
            description: "Explore imaginative and captivating stories."
        },
        {
            id: 2,
            image: fantasy,
            title: "Fantasy",
            description: "Enter magical worlds filled with adventure."
        },
        {
            id: 3,
            image: romance,
            title: "Romance",
            description: "Discover stories about love and relationships."
        },
        {
            id: 4,
            image: mystery,
            title: "Mystery",
            description: "Uncover secrets and solve fascinating mysteries."
        },
        {
            id: 5,
            image: scienceFiction,
            title: "Sci-Fiction",
            description: "Explore futuristic worlds and extraordinary ideas."
        },
        {
            id: 6,
            image: history,
            title: "History",
            description: "Travel through time and discover the past."
        },
        {
            id: 7,
            image: selfGrowth,
            title: "Self-Grow",
            description: "Learn, grow and become the best version of yourself"
        },
        {
            id: 8,
            image: technology,
            title: "Technology",
            description: "Discover books about technology and innovation."
        }
    ];
    const navigate = useNavigate();
    return (
        <div>
            <section className="category-section">
                <h1>Explore By category</h1>
                <p>Find stories that match your mood.</p>
                <div className="category-container">
                    {categories.map(category => (
                        <Categorycard
                            key={category.id}
                            image={category.image}
                            title={category.title}
                            description={category.description}
                            onExplore={() => navigate(`/explore?genre=${category.title}`)} />

                    ))}
                </div>
            </section>

        </div>
    )
}
export default Categories;