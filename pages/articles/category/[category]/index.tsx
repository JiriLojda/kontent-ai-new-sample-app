import { FC } from "react";
import { Article, Block_Navigation, WSL_Page } from "../../../../models";
import { AppPage } from "../../../../components/shared/ui/appPage";
import { ValidCollectionCodename } from "../../../../lib/types/perCollection";
import { GetStaticProps } from "next";
import { getArticlesCountByCategory, getArticlesForListing, getItemByCodename, getItemsTotalCount, getSiteMenu } from "../../../../lib/kontentClient";
import { PerCollectionCodenames } from "../../../../lib/routing";
import { Content } from "../../../../components/shared/Content";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ArticlePageSize } from "../../../../lib/constants/paging";
import { ArticleItem } from "../../../../components/listingPage/ArticleItem";
import { mainColorBgClass } from "../../../../lib/constants/colors";
import { useSiteCodename } from "../../../../components/shared/siteCodenameContext";
import { siteCodename } from "../../../../lib/utils/env";
import { taxonomies } from "../../../../models";
import { ArticleListingUrlQuery, ArticleTypeWithAll, categoryFilterSource, isArticleType } from "../../../../lib/utils/articlesListing";

type Props = Readonly<{
  siteCodename: ValidCollectionCodename;
  articles: ReadonlyArray<Article>;
  siteMenu?: Block_Navigation,
  page: WSL_Page,
  itemCount: number;
}>;

type LinkButtonProps = {
  text: string;
  href: string;
  disabled?: boolean;
  roundRight?: boolean;
  roundLeft?: boolean;
  highlight?: boolean;
}

type FilterOptionProps = Readonly<{
  options: { [key: string]: string };
  router: NextRouter;
}>;

const LinkButton: FC<LinkButtonProps> = props => {
  const siteCodename = useSiteCodename();

  return (
    <Link
      scroll={false}
      href={props.disabled ? '/articles' : props.href}
      className="h-full"
    >
      <button
        disabled={props.disabled}
        className={`${props.roundRight && 'rounded-r-lg'} ${props.roundLeft && 'rounded-l-lg'} disabled:cursor-not-allowed ${props.highlight ? mainColorBgClass[siteCodename] : 'bg-white'} px-3 py-2 leading-tight text-gray-500 border disabled:bg-gray-200 border-gray-300 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 `}>
        {props.text}
      </button>
    </Link>
  )
}

const getFilterOptions = () =>
  Object.fromEntries(Object.entries(taxonomies.article_type.terms).map(([codename, obj]) => [codename, obj.name]));

const FilterOptions: FC<FilterOptionProps> = ({ options, router }) => {
  const { category } = router.query;
  const handleButtonClick = (category: string) => {
    router.replace(`/articles/category/${category}`, undefined, { scroll: false, shallow: false });
  };

  const clearFilters = () => {
    router.replace(`/articles/category/all`, undefined, { scroll: false, shallow: false });
  };

  return (
    <>
      <div className={"invisible md:visible flex flex-row pt-10"}>
        {Object.entries(options).map(([key, value]) => (
          <div key={key} className="mr-4" onClick={() => handleButtonClick(key)}>
            <input id={key} defaultChecked={category === key} type="radio" name="article-type" className="hidden peer" />
            <label htmlFor={key} className="inline-flex items-center justify-between w-full px-6 py-1 bg-white border border-gray-200 rounded-3xl cursor-pointer peer-checked:border-blue-300 peer-checked:bg-blue-300 hover:bg-gray-100">{value}</label>
          </div>
        ))}
        <button onClick={clearFilters} className={`px-6 py-1 ${category === "all" ? "invisible" : ""} bg-blue-600 text-white font-bold rounded-3xl cursor-pointer`}>Clear</button>
      </div>
    </>
  );
};


const ArticlesPage: FC<Props> = props => {
  const router = useRouter();
  const page = typeof router.query.page === 'string' ? +router.query.page : undefined;
  const category = typeof router.query.category === 'string' ? router.query.category : "all";
  const filterOptions = getFilterOptions();
  const getFilteredArticles = () => {
    if (category === 'all') {
      return props.articles;
    } else {
      return props.articles.filter(
        article => article.elements.articleType.value[0].codename === category
      );
    }
  };

  let filteredArticles = getFilteredArticles();
  const pageCount = Math.ceil(props.itemCount / ArticlePageSize);

  return <AppPage siteCodename={props.siteCodename} siteMenu={props.siteMenu}>
    {props.page.elements.content.linkedItems.map(piece => (
      <Content key={piece.system.id} item={piece as any} />
    ))}
    <div className="px-4 sm:px-0">
      <h2 className="m-0 mt-16">Latest Articles</h2>
      <FilterOptions options={filterOptions} router={router} />
      <div className="flex flex-col flex-grow">
        {filteredArticles.length > 0 ?
          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 place-items-center list-none gap-5 pt-4 pl-0 justify-center">
            {filteredArticles.map(a => (
              a.elements.articleType.value[0].codename &&
              <ArticleItem
                key={a.system.id}
                title={a.elements.title.value}
                itemId={a.system.id}
                description={a.elements.abstract.value}
                imageUrl={a.elements.heroImage.value[0]?.url}
                publisingDate={a.elements.publishingDate.value}
                detailUrl={`/articles/${a.elements.slug.value}`}
              />
            ))}
          </ul>
          :
          <div className="w-full flex items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 place-items-center gap-5 pt-4 pl-0 justify-center">No articles match this criteria.</div>
        }

        {pageCount > 1 && <nav>
          <ul className="mr-14 sm:mr-0 flex flex-row flex-wrap list-none justify-center">
            <li>
              <LinkButton
                text="Previous"
                href={!page || page === 2 ? `/articles/category/${category}` : `/articles/category/${category}/page/${page - 1}`}
                disabled={!page}
                roundLeft
              />

            </li>
            {Array.from({ length: pageCount }).map((_, i) => (<li key={i}>
              <LinkButton
                text={`${i + 1}`}
                href={i === 0 ? `/articles/category/${category}` : `/articles/category/${category}/page/${i + 1}`}
                highlight={(page ?? 1) === i + 1}
              />
            </li>))}
            <li>
              <LinkButton
                text="Next"
                href={`/articles/category/${category}/page/${page ? page + 1 : 2}`}
                disabled={(page ?? 1) === pageCount}
                roundRight
              />
            </li>
          </ul>
        </nav>}
      </div>
    </div>
  </AppPage>
}

export const getStaticPaths = async () => {

  const getAllPagesForCategory = async (category: ArticleTypeWithAll) => {
    const totalCount = category === 'all' ? await getItemsTotalCount(false, 'article') : await getArticlesCountByCategory(false, category);
    const pagesNumber = Math.ceil((totalCount ?? 0) / ArticlePageSize);
    const pages = Array.from({ length: pagesNumber }).map((_, index) => index + 1);
    return pages.map(pageNumber => ({
      params: { page: pageNumber.toString(), category },
    }));
  };

  const paths = await Promise.all(categoryFilterSource.map(category => getAllPagesForCategory(category)))
    .then(categoryPaths => categoryPaths.flat());

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, ArticleListingUrlQuery> = async context => {
  const pageCodename: PerCollectionCodenames = {
    ficto_healthtech: "articles",
    ficto_healthtech_imaging: null,
    ficto_healthtech_surgical: "articles_surgical"
  };
  const pageURLParameter = context.params?.page;
  const selectedCategory = context.params?.category;
  if (!isArticleType(selectedCategory)) {
    return {
      notFound: true
    };
  }

  const pageNumber = !pageURLParameter || isNaN(+pageURLParameter) ? 1 : +pageURLParameter;
  const articles = await getArticlesForListing(!!context.preview, pageNumber, selectedCategory ?? 'all');
  const siteMenu = await getSiteMenu(!!context.preview);
  const page = await getItemByCodename<WSL_Page>(pageCodename, !!context.preview);
  const itemCount = await getArticlesCountByCategory(false, selectedCategory)
  if (page === null) {
    return { notFound: true };
  };

  return {
    props: {
      articles: articles.items,
      siteCodename,
      siteMenu,
      page,
      itemCount
    },
    revalidate: 10,
  };
};

export default ArticlesPage;
