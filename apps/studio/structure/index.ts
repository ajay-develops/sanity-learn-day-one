import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S, context) => {
  const {currentUser} = context
  const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

  return S.list()
    .id('root')
    .title('Content')
    .items([
      S.divider().title('Events'),
      S.listItem()
        .title('Upcoming')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Upcoming Events').filter('date >= now()')),
      S.listItem()
        .title('Past')
        .schemaType('event')
        .child(S.documentList().title('Past Events').filter('date < now()')),
      S.divider().title('Artists & Venues'),
      S.documentTypeListItem('artist').title('Artists'),
      S.documentTypeListItem('venue').title('Venues'),
      isAdmin ? S.divider().title('Locales') : S.divider(),
      ...S.documentTypeListItems().filter((listItem) => {
        if (['locale'].includes(listItem.getId()!)) {
          return isAdmin
        }
        return false
      }),
    ])
}
