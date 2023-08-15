import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type Article } from '../content-types/article';
import { type Product } from '../content-types/product';
import { type WSL_Page } from '../content-types/WSL_Page';
import { type WSL_WebSpotlightRoot } from '../content-types/WSL_WebSpotlightRoot';

/**
 * Generated by '@kontent-ai/model-generator@5.10.0'
 *
 * Reference
 * Id: 48ffbeba-062f-4d41-9bfc-5cee5c3e47d0
 * Codename: reference
 */
export type Reference = IContentItem<{
  /**
   * Caption (text)
   * Required: false
   * Id: 54de4828-32f7-452f-86ba-70638bbcffcd
   * Codename: reference__caption
   */
  referenceCaption: Elements.TextElement;

  /**
   * External URI (text)
   * Required: false
   * Id: 89c29a87-0cf8-4e1f-b93f-0a5beed41b39
   * Codename: reference__external_url
   *
   * Higher priority then content item link
   */
  referenceExternalUrl: Elements.TextElement;

  /**
   * Content item link (modular_content)
   * Required: false
   * Id: a8fd4d08-1693-47fb-a271-4bd3e46b983e
   * Codename: reference__internal_link
   *
   * Link to the content item supported be presentational channel (using URL slug)
   */
  referenceInternalLink: Elements.LinkedItemsElement<
    WSL_Page | WSL_WebSpotlightRoot | Product | Article
  >;

  /**
   * Label (text)
   * Required: false
   * Id: fd7551bf-8d5f-4da1-9ac6-693645f8d750
   * Codename: reference__label
   */
  referenceLabel: Elements.TextElement;
}>;
