import { defineArrayMember, defineField, defineType } from "sanity";
import { SeoPreview } from "../components/SeoPreview";

const richText = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading 3", value: "h3" },
    ],
  }),
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "For example: Corporate website, E-commerce, Analytics.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoPreview",
      title: "SEO preview",
      description:
        "How this project will look in a Google search result. Not a stored value, reads live from the fields above.",
      type: "string",
      components: { input: () => <SeoPreview basePath="/work/" /> },
    }),
    defineField({ name: "challenge", title: "The challenge", type: "array", of: richText }),
    defineField({ name: "solution", title: "The solution", type: "array", of: richText }),
    defineField({ name: "results", title: "Results", type: "array", of: richText }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
        defineField({ name: "author", title: "Author", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
      ],
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on the homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
