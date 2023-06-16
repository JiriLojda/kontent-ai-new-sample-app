import { GetStaticProps } from "next/types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Content } from "../../components/shared/Content";
import { AppPage } from "../../components/shared/ui/appPage";
import { getItemByCodename, getProductsForListing, getSiteMenu } from "../../lib/kontentClient";
import { PerCollectionCodenames } from "../../lib/routing";
import { ValidCollectionCodename } from "../../lib/types/perCollection";
import { siteCodename } from "../../lib/utils/env";
import { Block_Navigation, WSL_Page, Product } from "../../models";
import { useRouter } from "next/router";
import { taxonomies } from "../../models/project"
import { ParsedUrlQueryInput } from "querystring";
import { ProductsPageSize } from "../../lib/constants/paging";
import { ProductItem } from "../../components/listingPage/ProductItem";

type Props = Readonly<{
  page: WSL_Page;
  products: ReadonlyArray<Product> | undefined;
  siteCodename: ValidCollectionCodename;
  totalCount: number;
  siteMenu?: Block_Navigation;
}>;

type ProductListingProps = Readonly<{
  products: ReadonlyArray<Product> | undefined,
}>

const ProductListing: FC<ProductListingProps> = (props) => {
  return (
    <ul className="w-full min-h-full mt-4 m-0 md:mt-0 p-0 sm:pr-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 list-none items-center md:justify-start gap-2">
      {props.products?.map(p => (
        <ProductItem
          key={p.system.id}
          imageUrl={p.elements.productImage.value[0].url}
          title={p.elements.title.value}
          detailUrl={`products/${p.elements.slug.value}`}
          price={p.elements.price.value}
          itemId={p.system.id}
        />
      ))}
    </ul>
  )
}

const FilterOptions = Object.fromEntries(Object.entries(taxonomies.product_category.terms).map(([codename, obj]) => [codename, obj.name]));

export const Products: FC<Props> = props => {
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(props.totalCount);
  const [products, setProducts] = useState<ReadonlyArray<Product> | undefined>(props.products);
  const { page, category } = router.query

  const pageNumber = useMemo(() => !page || isNaN(+page) ? 1 : +page, [page])

  const isLastPage = pageNumber * ProductsPageSize >= totalCount;

  const categories = useMemo(() => {
    if (!category) {
      return [];
    }
    if (typeof category === 'string') {
      return [category];
    }

    return category;
  }, [category])

  const getProducts = useCallback(async () => {
    const response = await fetch(`/api/${router.asPath}`);
    const newData = await response.json();

    setProducts(newData.products);
    setTotalCount(newData.totalCount);
  }, [router.asPath])

  useEffect(() => {
    getProducts();
  }, [page, category, getProducts])

  const onPreviousClick = () => {
    if (pageNumber === 2) {
      const { page, ...obj } = router.query;
      changeUrlQueryString(obj);
    } else {
      changeUrlQueryString({ ...router.query, page: pageNumber - 1 });
    }
  }

  const onNextClick = () => {
    changeUrlQueryString({ ...router.query, page: pageNumber + 1 });
  }

  const changeUrlQueryString = (query: ParsedUrlQueryInput) => {
    router.replace({ query: query }, undefined, { scroll: false });
  }

  const renderFilterOption = (optionCodename: string, labelText: string, onClick: (checked: boolean) => void) => {
    return (
      <div key={optionCodename} className="flex flex-row gap-1 items-center min-w-fit">
        <input
          id={optionCodename}
          type="checkbox"
          checked={categories.includes(optionCodename)}
          onChange={(event) => onClick(event.target.checked)}
          className="min-w-4 min-h-4 bg-gray-100 border-gray-300 rounded"
        />
        <label htmlFor={optionCodename} className="min-w-fit ml-2 text-sm font-medium text-gray-600">{labelText}</label>
      </div>
    );
  };

  return (
    <AppPage siteCodename={props.siteCodename} siteMenu={props.siteMenu}>
      {props.page.elements.content.linkedItems.map(piece => (
        <Content key={piece.system.id} item={piece as any} />
      ))}

      <div className="flex flex-col md:flex-row mt-4">
        <ul className="m-0 min-h-full flex flex-col gap-2 bg-blue-200 p-4">
          <h4 className="m-0">Category</h4>
          {Object.entries(FilterOptions).map(([codename, name]) =>
            renderFilterOption(codename, name, (checked) => {
              changeUrlQueryString({ category: checked ? categories.concat(codename) : categories.filter(c => c !== codename) });
            }))}
        </ul>

        <ProductListing products={products} />
      </div>

      <div className="mt-4 flex flex-row justify-center md:justify-end">
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg enabled:hover:bg-gray-100 disabled:bg-gray-200 enabled:hover:text-gray-700"
        onClick={onPreviousClick}
        disabled={pageNumber <= 1}
      >Previous</button>
      <button
        className="inline-flex items-center ml-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg enabled:hover:bg-gray-100 disabled:bg-gray-200 enabled:hover:text-gray-700"
        onClick={onNextClick}
        disabled={isLastPage}
      >Next</button>
      </div>

    </AppPage>
  )
};

export const getStaticProps: GetStaticProps<Props> = async context => {
  const pageCodename: PerCollectionCodenames = {
    ficto_healthtech: null,
    ficto_healthtech_imaging: null,
    ficto_healthtech_surgical: "products"
  };

  const page = await getItemByCodename<WSL_Page>(pageCodename, !!context.preview);
  const products = await getProductsForListing(!!context.preview);
  const siteMenu = await getSiteMenu(!!context.preview);

  if (page === null) {
    return {
      notFound: true
    };
  };

  return {
    props: { page, siteCodename, products: products.items, totalCount: products.pagination.totalCount ?? 0, siteMenu},
  };
}

export default Products;
