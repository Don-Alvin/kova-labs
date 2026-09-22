import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Canonical shape used by Sanity's built-in Portable Text table editor.
 * `headerRows` is required for the editor's header-row toggle to persist.
 */
export const table = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    defineField({ name: "headerRows", type: "number" }),
    defineField({
      name: "rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              type: "array",
              of: [
                defineArrayMember({
                  name: "cell",
                  type: "object",
                  fields: [
                    defineField({
                      name: "value",
                      type: "array",
                      of: [defineArrayMember({ type: "block" })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
