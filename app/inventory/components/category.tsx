import React from "react";

interface CategoryTabsProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export default function CategoryTabs({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryTabsProps) {
    return (
        <div className="px-6 mb-10 sticky top-[120px] bg-white z-10">
            <div className="bg-[#800000] rounded-t-lg px-6 flex items-end h-[50px]">
                <span className="text-white/70 font-bold text-xs mr-4 mb-2 tracking-wide">
                    KATEGORI:
                </span>

                <div className="flex items-end h-full -mb-[1px]">
                    {categories.map((category, index) => {
                        const isActive = selectedCategory === category.toLowerCase();

                        return (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category.toLowerCase())}
                                style={{
                                    clipPath: "polygon(0% 100%, 100% 100%, 90% 0%, 0% 0%)",
                                }}
                                className={`
                  px-5 py-2 font-bold text-xs tracking-wide leading-tight pb-3
                  ${index !== 0 ? "-ml-4" : ""}
                  ${isActive
                                        ? "bg-white text-[#800000] z-20 min-h-[40px] h-auto"
                                        : "bg-[#600000] text-gray-300 hover:bg-[#700000] hover:text-white z-0 min-h-[35px] h-auto"
                                    }
                `}
                            >
                                {category.toUpperCase()}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
