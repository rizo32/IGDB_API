import AbstractView from './AbstractView.js';

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        async function getData(url){
            const response = await fetch(url)
            return response.text();
        }
        const data = ejs.render(text, { data: 'your data' });

        let listPosts = '<ul>'
        for(let i in data){
            listPosts += `<li><a href='/post-view/${data[i]['id']}' data-link>${data[i]['title']}</a></li>`
        }
        listPosts += '</ul>';

        return `
        <h1>Posts</h1>
        ${listPosts}
        `;
    }
}