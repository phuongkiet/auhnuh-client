import {MovieDTO} from "../../app/models/movie.model.ts";

type PopularAnimeProps = {
    anime: MovieDTO[] | undefined;
};

const PopularAnime: React.FC<PopularAnimeProps> = ({ anime }) => {
    const scrollContainer = (direction: "left" | "right") => {
        const container = document.querySelector(".scrollable-container");
        if (container) {
            container.scrollBy({ left: direction === "right" ? 220 : -220, behavior: "smooth" });
        }
    };

    return (
        <section className="py-6 px-12">
            <h2 className="text-2xl font-bold mb-6">Popular on AuhNuh</h2>
            <div className="relative">
                <div className="scrollable-container flex space-x-6 overflow-x-hidden scroll-smooth pb-4">
                    {anime?.map((item, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer overflow-hidden rounded-md transition-transform duration-300 hover:scale-105 hover:z-10 min-w-[200px]"
                        >
                            <img src={item.thumbnail} alt={item.title} className="w-[200px] h-[200px] object-cover" />
                            <div
                                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <h3 className="font-semibold">{item.title}</h3>
                                <div className="flex items-center mt-2 space-x-2">
                                    <button
                                        className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-300"
                                    >
                                        <span className="material-symbols-outlined text-sm">play_arrow</span>
                                    </button>
                                    <button
                                        className="bg-zinc-800/80 rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-300"
                                    >
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 shadow-lg"
                    onClick={() => scrollContainer("right")}
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
                <button
                    className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 shadow-lg"
                    onClick={() => scrollContainer("left")}
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
            </div>
        </section>
    );
};

export default PopularAnime;
