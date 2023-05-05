import { FC, useState } from "react";
import { CardStack } from "../../models"
import { CardComponent } from "./Card";

type Props = Readonly<{
  item: CardStack;
}>;

export const CardStackComponent: FC<Props> = props => {
  const [cardIndex, setCardIndex] = useState(0);

  const currentCard = props.item.elements.stack.linkedItems[cardIndex];

  if (!currentCard) {
    return null;
  }

  return (
    <div className="p-7">
      <h2>{props.item.elements.title.value}</h2>
      {props.item.elements.message.value}
      <section className="py-11">
        <Headers
          headers={props.item.elements.stack.linkedItems.map(item => item.elements.title.value)}
          onHeaderSelected={setCardIndex}
          selectedHeaderIndex={cardIndex}
        />
        <div className="pt-3">
          <CardComponent item={currentCard} />
        </div>
      </section>
    </div>
  );
};

type HeadersProps = Readonly<{
  headers: ReadonlyArray<string>;
  selectedHeaderIndex: number;
  onHeaderSelected: (headerIndex: number) => void;
}>;

const Headers: FC<HeadersProps> = props => (
  <menu className="flex gap-6 border-b-2 border-b-gray-100">
    {props.headers.map((header, i) => (
      <li
        key={i}
        className={`overflow-hidden h-full m-0 shrink text-ellipsis flex justify-center items-center cursor-pointer border-b-green-600 ${props.selectedHeaderIndex === i ? "border-b-2" : ""}`}
        onClick={() => props.onHeaderSelected(i)}
      >
        {header}
      </li>
    ))}
  </menu>
)

const wrapIndex = ({ index, length }: Readonly<{ index: number; length: number }>) => index < 0 ? length + index : index % length;
