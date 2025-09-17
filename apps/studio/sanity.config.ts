import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'
import {media} from 'sanity-plugin-media'
import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {assist} from '@sanity/assist'
// import {languageFilter} from '@sanity/language-filter'

export default defineConfig({
  name: 'default',
  title: 'Day One Content Operations',

  projectId: 'sinxko79',
  dataset: 'production',

  plugins: [
    structureTool({defaultDocumentNode, structure}),
    visionTool(),
    media({
      creditLine: {
        enabled: true,
        // boolean - enables an optional "Credit Line" field in the plugin.
        // Used to store credits e.g. photographer, licence information
        excludeSources: ['unsplash'],
        // string | string[] - when used with 3rd party asset sources, you may
        // wish to prevent users overwriting the creditLine based on the `source.name`
      },
      maximumUploadSize: 10000000,
      // number - maximum file size (in bytes) that can be uploaded through the plugin interface
    }),
    documentInternationalization({
      // fetch locales from Content Lake or load from your locale file
      supportedLanguages: (client) => client.fetch(`*[_type == "locale"]{"id": tag, "title":name}`),
      // define schema types using document level localization
      schemaTypes: ['event'],
    }),
    internationalizedArray({
      // Use client to fetch locales or import from local locale file
      languages: (client) => client.fetch(`*[_type == "locale"]{"id": tag, "title":name}`),
      // Define field types to localize as-needed
      fieldTypes: ['string', 'simpleBlockContent'],
    }),
    // languageFilter({
    //   supportedLanguages: (client) => client.fetch(`*[_type == "locale"]{"id": tag, "title":name}`),
    //   // Select Norwegian (Bokmål) by default
    //   // defaultLanguages: ['en-US'],
    //   // Only show language filter for document type `page` (schemaType.name)
    //   documentTypes: ['artist', 'event'],
    //   // filterField: (enclosingType, member, selectedLanguageIds) =>
    //   //   !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name),
    // }),
    assist({
      translate: {
        styleguide: 'Maintain the tone',
        document: {
          languageField: 'language',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

    if (isAdmin) {
      return prev
    }

    return prev.filter((tool) => tool.name !== 'vision')
  },
})
