/**
 * Generated by '@kontent-ai/model-generator@5.10.0'
 *
 * Project name: New sample migrations (TMP) (Kontent)
 * Environment: App test
 * Project Id: 89962bec-344a-01fd-58aa-40c92b21f579
 */
export const taxonomies = {
  /**
   * Article type
   */
  article_type: {
    codename: 'article_type',
    id: '02c148a3-4536-587d-aabd-8ac2ae6557c7',
    externalId: 'articleType-7fbd6882-2a33-40a3-9aec-ad1547655cc8',
    name: 'Article type',
    terms: {
      case_study: {
        codename: 'case_study',
        id: 'f16a7522-5633-51ed-869a-7262327b8453',
        externalId: 'caseStudy-84cfc929-3fc6-4eb2-95e1-7d043b5bfd1c',
        name: 'Case study',
        terms: {},
      },
      clinical_trial: {
        codename: 'clinical_trial',
        id: '3d7edad5-3c2e-5376-9b3c-81e346fb4f5b',
        externalId: 'clinicalTrial-a63c6b90-5853-425b-aef8-06ffb7e4e970',
        name: 'Clinical trial',
        terms: {},
      },
      industry_news: {
        codename: 'industry_news',
        id: 'ba02e54f-dcfb-5f03-8a7b-1a7441d28cb7',
        externalId: 'industryNews-4abee914-15e7-4a63-88dd-1387fb33400a',
        name: 'Industry news',
        terms: {},
      },
      research: {
        codename: 'research',
        id: '26f96c2a-c196-578d-844e-79f1f3e97e34',
        externalId: 'research-d55709dc-6a01-4edd-a52e-57465ae29e8f',
        name: 'Research',
        terms: {},
      },
    },
  },

  /**
   * Product category
   */
  product_category: {
    codename: 'product_category',
    id: '54634713-6a9f-5b20-a724-693b2372499e',
    externalId: 'productCategory-0c888f24-363c-4c63-986c-829cdfeabe17',
    name: 'Product category',
    terms: {
      clothing: {
        codename: 'clothing',
        id: '1f3b72f2-fe22-5918-a165-fa2717f33310',
        externalId: 'clothing-be3a2380-1cfa-4232-9931-2ac349a3842b',
        name: 'Clothing',
        terms: {
          sanitary_clothing: {
            codename: 'sanitary_clothing',
            id: '507fd2a5-40b2-5258-a950-000ea72840e8',
            externalId: 'sanitaryClothing-a039ff46-745c-4dda-96af-8f503fa755dc',
            name: 'Sanitary clothing',
            terms: {},
          },
        },
      },
      other: {
        codename: 'other',
        id: 'e6d938ae-5cb9-5924-930d-7d2199e3302b',
        externalId: 'other-6bfe0e2d-034a-403c-9fdc-d4ea3e04566f',
        name: 'Other',
        terms: {},
      },
      tools: {
        codename: 'tools',
        id: 'b3398fc8-702a-5a05-bcda-fe5663351325',
        externalId: 'tools-fcc5e0fc-eb97-426f-b56b-ee770cf50ab2',
        name: 'Tools',
        terms: {
          equipment: {
            codename: 'equipment',
            id: 'aa85503e-28b9-5eeb-bb26-53b08c831b0a',
            externalId: 'equipment-ef1ebcb0-b88f-42e8-94f0-2ddb007d550d',
            name: 'Equipment',
            terms: {},
          },
          precision_instruments: {
            codename: 'precision_instruments',
            id: '789ca75e-da12-53d1-bb3d-d304da5292e8',
            externalId:
              'precisionInstruments-80085799-e17c-428f-9fbc-cb0fb578eeb3',
            name: 'Precision instruments',
            terms: {},
          },
        },
      },
    },
  },
} as const;
