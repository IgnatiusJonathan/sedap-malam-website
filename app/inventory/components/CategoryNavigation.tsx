import React from "react";

interface CategoryNavigationProps {
    onNext: () => void;
    onPrev: () => void;
}

export default function CategoryNavigation({ onNext, onPrev }: CategoryNavigationProps) {
    return (
        <div className="flex justify-center items-center gap-6 mt-10">
            <button
                onClick={onPrev}
                className="px-5 py-2 bg-[#800000] text-white rounded-full font-bold
                   hover:bg-[#700000] transition-all duration-200"
            >
                &lt;
            </button>

            <button
                onClick={onNext}
                className="px-5 py-2 bg-[#800000] text-white rounded-full font-bold
                   hover:bg-[#700000] transition-all duration-200"
            >
                &gt;
            </button>
        </div>
    );
}
