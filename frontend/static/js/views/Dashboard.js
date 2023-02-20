import AbstractView from '../views_old/AbstractView.js';

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
        <h1>Bienvenu SPA</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, quam! Perspiciatis nihil voluptatum dicta a ducimus! A cumque libero esse sint corporis et doloribus nostrum, deserunt minima. Magni, aut sunt!</p>
        <p>
            <a href="/posts" data-link>Voir les publications</a>
        </p>
        `;
    }
}