import Item from "./Item";

const ItemList = ({ items }) => {
return (
    <div className="card-container">
    {items.map((prod) => (
    <Item key={prod.id} product={prod} />
))}
    </div>
);
};

export default ItemList;
