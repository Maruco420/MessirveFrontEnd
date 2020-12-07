import React from 'react';
import {
  Menu, Rate,
} from 'antd'
import { connect } from 'unistore/react';
import PriceRange from './PriceRange';

const SearchFilters = ({ categorias, subCategorias, marcas, setFoundProductos }) => {
  const filterBySubcategoria = (elo, props) => {
    let subcat;
    if (elo === "add") subcat = props.item.props.children[1];
    if (elo === "rest") subcat = "";
    fetch(`http://localhost:8000/api/productos?subcategoria=${subcat}`)
      .then((res) => res.json())
      .then((data) => setFoundProductos(data));
  };


  return(
    <div id="search-filters" style={{ position: 'fixed' }}>
    <Menu multiple mode="inline" selectable={false}>
        <Menu.ItemGroup key="rango-precios" title="Precio">
            {/*<Menu.Item key="price-range">*/
              <PriceRange checkable />
        /*</Menu.Item>*/}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple mode="inline">
        <Menu.ItemGroup key="categoria-menu" title="Categorias">
            {categorias && categorias.map((categoria) => (
              <Menu.Item key={categoria.id}>{categoria.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple onSelect={(props) => filterBySubcategoria ("add", props)} onDeselect={(props) => filterBySubcategoria("rest", props)} mode="inline">
        <Menu.ItemGroup key="subcategoria-menu" title="SubCategorias">
            {subCategorias && subCategorias.map((subCategoria) => (
                <Menu.Item key={subCategoria.id}>{subCategoria.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    <Menu multiple mode="inline">
        <Menu.ItemGroup key="marcas-menu" title="Marcas">
            {marcas && marcas.map((marca) => (
                <Menu.Item key={marca.id}>{marca.nombre}</Menu.Item>
            ))}
        </Menu.ItemGroup>
    </Menu>
    {/*<Menu mode="inline" selectable={false}>
       <Menu.ItemGroup key="rating" title="Calificación">
            <Menu.Item key="rating-component">
                <Rate allowHalf defaultValue={0} />
            </Menu.Item>
        </Menu.ItemGroup>
    </Menu>*/}
    </div>
  );
};

export default connect(['categorias', 'subCategorias', 'marcas'])(SearchFilters);
