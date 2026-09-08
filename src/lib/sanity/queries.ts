import { groq } from "next-sanity";

const POST_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  _updatedAt,
  readTime,
  "category": category->{name, "slug": slug.current},
  "author": author->{name, role}
`;

export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${POST_CARD_FIELDS}
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_CARD_FIELDS},
    tags,
    body
  }
`;

export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && slug.current != $slug && category->slug.current == $category]
    | order(publishedAt desc)[0...3] {
    ${POST_CARD_FIELDS}
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`;

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description
  }
`;

const PROJECT_CARD_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  category,
  client,
  tags,
  featured,
  publishedAt
`;

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(publishedAt desc) {
    ${PROJECT_CARD_FIELDS}
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_CARD_FIELDS},
    challenge,
    solution,
    results,
    testimonial,
    screenshots
  }
`;

export const NEXT_PROJECT_QUERY = groq`
  *[_type == "project" && slug.current != $slug] | order(publishedAt desc)[0] {
    title,
    "slug": slug.current
  }
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`;
