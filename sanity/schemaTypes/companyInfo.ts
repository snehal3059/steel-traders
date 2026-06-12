import { defineField, defineType } from "sanity"

export const companyInfoType = defineType({
  name: "companyInfo",
  title: "Company Information",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "About Us Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      description: "Include country code, e.g., 919876543210",
    }),
    defineField({
      name: "workingHours",
      title: "Working Hours",
      type: "string",
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter/X", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
      ],
    }),
  ],
})