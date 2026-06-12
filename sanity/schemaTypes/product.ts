import { defineField, defineType } from "sanity"

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Property", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pdfUrl",
      title: "Catalog PDF URL",
      type: "url",
      description: "Link to downloadable PDF spec sheet",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),
  ],
})