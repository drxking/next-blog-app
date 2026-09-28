import {defineField, defineType} from 'sanity'
import {CloudinaryImageInput} from './cloudinary-image-input'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: rule => rule.required().max(110)}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: rule => rule.required()}),
    defineField({name: 'excerpt', title: 'Short introduction', type: 'text', rows: 3, validation: rule => rule.max(190)}),
    defineField({name: 'publishedAt', type: 'datetime', validation: rule => rule.required()}),
    defineField({name: 'category', type: 'string', options: {list: ['Essays', 'Field notes', 'Culture', 'Journal', 'Objects']}}),
    defineField({name: 'cloudinaryUrl', title: 'Cloudinary image', type: 'url', components: {input: CloudinaryImageInput}}),
    defineField({name: 'body', type: 'array', of: [{type: 'block'}]})
  ],
  preview: {select: {title: 'title', subtitle: 'category'}}
})
