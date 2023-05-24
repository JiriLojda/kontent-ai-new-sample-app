import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type Navigation } from './navigation';
import { type Page } from './page';

/**
 * Generated by '@kontent-ai/model-generator@5.10.0'
 *
 * Web spotlight root
 * Id: 228de48c-ffb2-4b5e-862f-47e2c60e0c01
 * Codename: web_spotlight_root
 */
export type WebSpotlightRoot = IContentItem<{
  /**
   * Content (modular_content)
   * Required: false
   * Id: 94e31e00-81b8-4ab4-b17b-7d165ed3020e
   * Codename: content
   */
  content: Elements.LinkedItemsElement<IContentItem>;

  /**
   * Subpages (subpages)
   * Required: false
   * Id: 61be1529-49fc-43b6-ba33-962a360e4c9f
   * Codename: subpages
   */
  subpages: Elements.LinkedItemsElement<Page | Navigation>;

  /**
   * Title (text)
   * Required: false
   * Id: 9a340e66-9416-455e-8763-848a330a4b2e
   * Codename: title
   */
  title: Elements.TextElement;
}>;
