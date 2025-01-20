import Hero from "../components/Hero/Hero";
import { useNavigate } from "react-router-dom";
import CardSlider from "../components/Category/CardSlider";

export default function HomePage() {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate("/CategoryPage", { state: { selectedCategory: category } });
  };

  return (
    <>
      <Hero />
      <div className="flex items-center justify-center sm:pt-10">
        <div className="text-center">
          <h1 className="text-primary font-bold text-4xl sm:text-5xl pb-3">
            Kategori
          </h1>
          <p className="">Lorem ipsum dolor sit amet</p>
        </div>
      </div>
      <CardSlider onCategorySelect={handleCategorySelect} />
    </>
  );
}
