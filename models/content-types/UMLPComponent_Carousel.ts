import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
<<<<<<<< HEAD:models/content-types/Block_Carousel.ts
import { type Block_CallToAction } from './Block_CallToAction';
import { type Block_HeroUnit } from './Block_HeroUnit';
========
import { type UMLPComponent_CallToAction } from './UMLPComponent_CallToAction';
import { type UMLPComponent_HeroUnit } from './UMLPComponent_HeroUnit';
>>>>>>>> fd2a16b93248bbdfd6c91e460c40d25f31157f28:models/content-types/UMLPComponent_Carousel.ts

/**
 * Generated by '@kontent-ai/model-generator@5.10.0'
 *
<<<<<<<< HEAD:models/content-types/Block_Carousel.ts
 * 🧱 Carousel
 * Id: f1e220f9-76af-4c78-8137-e2bfa026e320
 * Codename: carousel
 */
export type Block_Carousel = IContentItem<{
========
 * UMLP component – Carousel
 * Id: f1e220f9-76af-4c78-8137-e2bfa026e320
 * Codename: carousel
 */
export type UMLPComponent_Carousel = IContentItem<{
>>>>>>>> fd2a16b93248bbdfd6c91e460c40d25f31157f28:models/content-types/UMLPComponent_Carousel.ts
  /**
   * Elements (modular_content)
   * Required: true
   * Id: fb6b765a-1d09-4d98-81db-66bc3a63c487
   * Codename: elements
   */
<<<<<<<< HEAD:models/content-types/Block_Carousel.ts
  elements: Elements.LinkedItemsElement<Block_HeroUnit | Block_CallToAction>;
========
  heroUnits: Elements.LinkedItemsElement<
    UMLPComponent_HeroUnit | UMLPComponent_CallToAction
  >;
>>>>>>>> fd2a16b93248bbdfd6c91e460c40d25f31157f28:models/content-types/UMLPComponent_Carousel.ts
}>;
