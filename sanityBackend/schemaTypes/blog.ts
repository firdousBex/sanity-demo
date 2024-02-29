export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: "Title of Blog Article"
        }, {
            name: 'slug',
            type: 'slug',
            title: 'Blog Article Slug', 
            options: {
                source: 'title',
            }
        }, {
            name: "titleImage",
            type: 'image',
            title: 'Title Image of the Blog',
        }, {
            name: 'smallDescription',
            type: 'text',
            title: 'Small Description about Blog Article',

        }, {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
                {
                    type: 'block',
                }
            ]
        }
    ]
}