import { cardDetails } from './CardDetails';

export default async function CardGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cardDetails.map((card) => (
        <article
          key={card.title}
          className="p-4 flex flex-col justify-between space-y-8 shadow-[0_5px_10px_8px_rgba(0,0,0,0.1)] rounded-xl bg-[#16181A]"
        >
          <div className="flex space-x-4 items-center">
            {card.svg}
            <h1 className="text-[#ecedee]">{card.title}</h1>
          </div>
          <p className="text-[#ecedee]">{card.description}</p>
          <a
            href={card.url}
            target="_blank"
            className="text-[#0072F5] font-light"
          >
            {card.footer}
          </a>
        </article>
      ))}
    </section>
  );
}
