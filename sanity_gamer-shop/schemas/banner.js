export default {
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "product",
      title: "Product",
      type: "string",
    },
    {
      name: "desc",
      title: "Desc",
      type: "string",
    },

    {
      name: "largeText",
      title: "LargeText",
      type: "string",
    },
    {
      name: "discount",
      title: "Discount",
      type: "number",
    },

    {
      name: "fullPrice",
      title: "FullPrice",
      type: "number",
    },
  ],
};
