import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
}

function ProductCard({ title, description, href }: ProductCardProps) {
  return (
    <Link href={href}>
      <div className="h-full bg-white rounded-lg shadow-sm border border-pink-pale hover:border-pink-dusty hover:shadow-md transition-all duration-300 p-6 md:p-8 cursor-pointer">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-6 flex items-center text-pink-dusty group-hover:text-pink-dusty">
          <span className="text-sm md:text-base font-medium">자세히 보기</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function ProductCards() {
  const products = [
    {
      title: "(스)드메",
      description: "드레스·메이크업 조합별 실제 비용 비교",
      href: "/estimate/sdme",
    },
    {
      title: "DVD",
      description: "촬영 구성·옵션에 따른 가격 차이 비교",
      href: "/estimate/dvd",
    },
    {
      title: "홀",
      description: "대관료·식대 포함 실부담 비용 비교",
      href: "/estimate/hall",
    },
  ];

  return (
    <section className="w-full bg-ivory-light py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 md:mb-12 text-center">
          조회상품
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.href}
              title={product.title}
              description={product.description}
              href={product.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
